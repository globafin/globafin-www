import WidthConstraint from "@/components/ui/width-constraint";
import { siteConfig } from "@/lib/config/metadata";
import { sanityClient } from "@/lib/config/sanity";
import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import { Metadata } from "next/types";
import { JSX } from "react";

export function generateMetadata(): Metadata {
  return {
    title: `${siteConfig.name} | Terms and Conditions`,
    description:
      "Our Terms and Conditions outlines how we handle your personal information, ensuring your privacy and security. Learn about the data we collect, how it's used, and your rights in maintaining control over your information. Trust is paramount, and we are dedicated to safeguarding your privacy.",
  };
}

export default async function Page(): Promise<JSX.Element | null> {
  const data = await sanityClient.fetch(
    groq`*[_type == "pageContent" && title == "Privacy Policy"]{title, content}`
  );

  if (!data) return null;

  const content = data[0];

  return (
    <section className="mt-[80px] scroll-mt-20 relative">
      <div className="bg-primary min-h-[250px] px-5 text-center flex flex-col gap-4 justify-center items-center">
        <h1 className="text-white text-4xl lg:text-5xl font-bold">Privacy Policy</h1>
      </div>
      <WidthConstraint className="pb-20 max-w-[1200px]">
        <article className="py-10 [&_li]:list-disc [&_ul]:list-inside text-xl font-medium [&_a]:text-darkBlue [&_h4]:pt-4 [&_h2]:border-y [&_h2]:mt-5   [&_h2]:text-2xl [&_h2]:lg:text-3xl [&_h2]:py-4  [&_h3]:text-[24px] [&_h3]:lg:text-2xl [&_h3]:border-b [&_h3]:border-border [&_h3]:text-white [&_p]:lg:text-md [&_li]:lg:text-md [&_p]:leading-[30px] [&_li]:leading-[30px] [&_h3]:pt-10 [&_h3]:pb-2 [&_h3]:mb-4 ">
          {content && content.content && <PortableText value={content.content} />}
        </article>
        <div className="text-end">
          <p className="font-[500] text-md">Last updated</p>
          <p>{new Date().toDateString()}</p>
        </div>
      </WidthConstraint>
    </section>
  );
}
