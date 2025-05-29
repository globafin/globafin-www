import { GLOBAFIN_MICROFINANCE_EMAIL } from "@/lib/constants";
import fs from "fs";
import path from "path";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: GLOBAFIN_MICROFINANCE_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Base email sending function
async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  const mailOptions = {
    from:
      options.from || `Globafin MicroFinance Limited <${GLOBAFIN_MICROFINANCE_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

// Helper function to send multiple emails
async function sendMultipleEmails(
  emailConfigs: Array<{
    to: string;
    subject: string;
    html: string;
    from?: string;
  }>
) {
  try {
    await Promise.all(emailConfigs.map((config) => sendEmail(config)));
    return { success: true };
  } catch (error) {
    console.error("Error sending multiple emails:", error);
    throw error;
  }
}

// Helper function to read and process email template
function processTemplate(templatePath: string, data: Record<string, string>) {
  const template = fs.readFileSync(path.join(process.cwd(), templatePath), "utf-8");
  return template.replace(/\${data\.(\w+)}/g, (_, key) => data[key] || "");
}

// Helper function to validate required fields
function validateData(data: Record<string, unknown>, requiredFields: string[]) {
  const missingFields = requiredFields.filter((field) => !data[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  const { type } = data;

  try {
    const emailConfigs: Array<{
      to: string;
      subject: string;
      html: string;
      from?: string;
    }> = [];

    switch (type) {
      case "contact":
        // Validate contact form data
        validateData(data, ["name", "email", "subject", "message"]);

        // Admin notification for contact form
        emailConfigs.push({
          to: GLOBAFIN_MICROFINANCE_EMAIL,
          subject: `New Contact Form Submission from ${data.name}`,
          html: processTemplate("public/admin-contact.html", {
            ...data,
            date: new Date().toLocaleDateString(),
          }),
        });

        // Thank you email to sender
        emailConfigs.push({
          to: data.email,
          subject: "Thank you for contacting Globafin MicroFinance Limited!",
          html: processTemplate("public/thank.html", data),
        });
        break;

      case "account":
        validateData(data, ["name", "email", "phone", "address", "dob"]);

        // Admin notification for new account
        emailConfigs.push({
          to: GLOBAFIN_MICROFINANCE_EMAIL,
          subject: "New Account Creation Alert",
          html: processTemplate("public/create-account-admin.html", {
            ...data,
            date: new Date().toLocaleDateString(),
          }),
        });

        // Welcome email to new account holder
        emailConfigs.push({
          to: data.email,
          subject: "Welcome to Globafin MicroFinance Limited!",
          html: processTemplate("public/create-account-recipient.html", data),
        });
        break;

      default:
        throw new Error(`Unknown email type: ${type}`);
    }

    await sendMultipleEmails(emailConfigs);
    return Response.json({ data, message: "Emails sent successfully!" });
  } catch (error) {
    console.error(error);
    return Response.json({
      error: 500,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while sending the emails.",
    });
  }
}
