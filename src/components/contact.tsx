"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import WidthConstraint from "./ui/width-constraint";

const Contact = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <section className="py-16 lg:py-32 bg-white p-2">
      <div className=" bg-[url('/assets/hero.jpg')] min-h-[500px] p-20 rounded-xl">
        <WidthConstraint className="flex justify-end items-center">
          <Card className="w-max p-4 py-12 rounded-b-none">
            <CardContent>
              <form className="w-full max-w-sm bg-white space-y-5 ">
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-gray-900">Contact us today!</h2>
                  <p className="text-gray-600 text-sm">
                    Quick answers to questions you may have. Can't find what you're
                    looking for? Get in touch with us.
                  </p>
                </div>
                <div className="space-y-4">
                  <Input type="text" placeholder="Please enter your name*" required />
                  <Input type="email" placeholder="Your email*" required />
                  <Input type="text" placeholder="Please enter your subject" />
                  <Textarea
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
      </div>
    </section>
  );
};

export default Contact;
