import { BlogList } from "@app/[locale]/blog/page";

import { MotionDiv } from "@components/motion";
import Section from "@components/sections/section";
import { Button } from "@components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";

import { Link } from "@navigation";

import { useTranslations } from "next-intl";
import { type FC } from "react";

const BlogSection: FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations("Blog");
  return (
    <Section heading="Blog" sectionID="blog">
      <MotionDiv
        className="flex items-center flex-col gap-4 md:gap-6 lg:gap-8 justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <p className="text-center text-balance">{t("description")}</p>
        <div className="px-7 lg:max-w-5xl mx-auto">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              <BlogList showcase locale={locale} />
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <Button variant="outline" asChild>
          <Link href="/blog">{t("exploreMore")}</Link>
        </Button>
      </MotionDiv>
    </Section>
  );
};

export default BlogSection;
