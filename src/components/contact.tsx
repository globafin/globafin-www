"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import WidthConstraint from "./ui/width-constraint";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [accepted, setAccepted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Form Submission:", {
      ...formData,
      acceptedTerms: accepted,
      timestamp: new Date().toISOString(),
    });
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setAccepted(false);
  };

  return (
    <section
      id="contact"
      className="py-16 lg:py-32 md:px-5 max-w-[1350px] mx-auto overflow-clip"
    >
      <WidthConstraint className="flex justify-center px-2 md:px-5 lg:justify-end items-center bg-[url('/assets/contact.png')] bg-no-repeat bg-cover min-h-[600px] py-20  md:rounded-xl">
        <Card className="w-max p-4 py-12 rounded-b-none">
          <CardContent className="px-2 md:px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white space-y-5">
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-900">Contact us today!</h2>
                <p className="text-gray-600 text-sm">
                  Quick answers to questions you may have. Can&apos;t find what
                  you&apos;re looking for? Get in touch with us.
                </p>
              </div>
              <div className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Please enter your name*"
                  required
                />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email*"
                  required
                />
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Please enter your subject"
                />
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please enter your message"
                  required
                  className="resize-none h-[8lh]"
                />
              </div>
              <div className="flex items-center text-xs text-gray-700">
                <Checkbox
                  id="accept"
                  checked={accepted}
                  onCheckedChange={(checked) =>
                    setAccepted(checked === "indeterminate" ? false : checked)
                  }
                  className="mr-2"
                  required
                />
                <label htmlFor="accept">
                  I Accept <span className="font-bold">Terms Of Service</span> and{" "}
                  <span className="font-bold">Privacy Policy</span>.
                </label>
              </div>
              <Button type="submit" disabled={!accepted}>
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </WidthConstraint>
    </section>
  );
};

export default Contact;
