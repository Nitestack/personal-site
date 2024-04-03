import { TransitionLink } from "@hooks";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FC } from "react";

import { BlogList } from "@app/[locale]/blog/page";
import Section from "@components/sections/section";
import { Button } from "@components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";

const BlogSection: FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations("Blog");
  return (
    <Section
      className="space-y-4 md:space-y-6 lg:space-y-8"
      heading="Blog"
      sectionID="blog"
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
      <div className="flex items-center justify-center">
        <Button variant="outline" asChild>
          <TransitionLink
            fallback={<Loader2 className="size-6 animate-spin" />}
            href="/blog"
          >
            {t("exploreMore")}
          </TransitionLink>
        </Button>
      </div>
    </Section>
  );
};

export default BlogSection;
