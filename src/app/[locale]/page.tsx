import AboutSection from "@/components/sections/about";
import BlogSection from "@/components/sections/blog";
import ContactSection from "@/components/sections/contact";
import ExperienceSection from "@/components/sections/experience";
import HeroSection from "@/components/sections/hero";
import ProjectsSection from "@/components/sections/projects";

import { setRequestLocale } from "next-intl/server";
import { type FC } from "react";

const HomePage: FC<{ params: Promise<{ locale: string }> }> = async ({
  params,
}) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <div className="space-y-20 leading-loose">
      <HeroSection />
      <AboutSection />
      <ExperienceSection locale={locale} />
      <ProjectsSection locale={locale} />
      <BlogSection locale={locale} />
      <ContactSection />
    </div>
  );
};

export default HomePage;
