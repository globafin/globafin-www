"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WidthConstraint from "@/components/ui/width-constraint";
import { db } from "@/lib/config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";

interface AccountFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
}

const CreateAccountPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<AccountFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkExistingAccount = async (email: string, phone: string) => {
    const accountsRef = collection(db, "account-creation");
    const emailQuery = query(accountsRef, where("email", "==", email));
    const phoneQuery = query(accountsRef, where("phone", "==", phone));

    const [emailSnapshot, phoneSnapshot] = await Promise.all([
      getDocs(emailQuery),
      getDocs(phoneQuery),
    ]);

    if (!emailSnapshot.empty) {
      throw new Error("An account with this email already exists");
    }
    if (!phoneSnapshot.empty) {
      throw new Error("An account with this phone number already exists");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check for existing account
      await checkExistingAccount(formData.email, formData.phone);

      // Store in Firebase
      await addDoc(collection(db, "account-creation"), {
        ...formData,
        status: "pending",
        timestamp: new Date().toISOString(),
      });

      // Send emails
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "account",
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          dob: formData.dateOfBirth,
          address: formData.address,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send confirmation email");
      }

      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        address: "",
      });

      toast.success(
        "Account creation request submitted successfully! We'll review your application and get back to you soon."
      );
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create account. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-[80px] scroll-mt-20 relative">
      <div className="bg-primary min-h-[250px] px-5 text-center flex flex-col gap-4 justify-center items-center">
        <h1 className="text-white text-4xl lg:text-5xl font-bold">Create Your Account</h1>
        <p className="text-white text-sm md:text-lg lg:text-xl text-center">
          Fill in your details to create an account with Globafin
        </p>
      </div>
      <WidthConstraint>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-[600px] mx-auto py-10 md:py-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dateOfBirth" className="text-sm font-medium">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Address <span className="text-red-500">*</span>*
            </label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </WidthConstraint>
    </section>
  );
};

export default CreateAccountPage;
