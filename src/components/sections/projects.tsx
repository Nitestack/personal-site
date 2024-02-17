import Section from "@components/sections/section";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";

import { Link } from "@navigation";

import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { type FC } from "react";

import { getGitHubRepositoryUrl } from "@utils";

import { SITE_CONFIG } from "@constants";

const ProjectsSection: FC = () => {
  const t = useTranslations();
  return (
    <Section
      className="text-center"
      heading={t("Routes.projects")}
      sectionID="projects"
    >
      <div className="px-7 lg:max-w-5xl mx-auto">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {SITE_CONFIG.projects.map((project) => (
              <CarouselItem key={project.name} className="md:basis-1/2">
                <Link
                  href={
                    project.repoLink
                      ? getGitHubRepositoryUrl(project.repoLink)
                      : {
                          hash: "#",
                        }
                  }
                  target={project.repoLink ? "_blank" : "_self"}
                  className="group"
                >
                  <Card className="h-full space-y-2 hover:bg-muted cursor-pointer shadow-md overflow-x-hidden">
                    <div className="relative aspect-video w-full group-hover:opacity-75 border-b border-border">
                      <NextImage
                        fill
                        className="object-fill"
                        src={project.imageUrl}
                        alt={project.name}
                      />
                    </div>
                    <CardHeader className="flex flex-col space-y-6 group-hover:bg-accent">
                      <div className="flex-1 space-y-4">
                        <CardTitle className="text-center text-balance font-bold">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="md:text-base text-ellipsis text-balance overflow-hidden line-clamp-3">
                          {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
                          {t(`Projects.Descriptions.${project.description}`)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center justify-center flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={`${project.name}-${tag}`}
                            className="rounded border text-xs/4 flex items-center px-2.5 py-1.5 bg-primary text-primary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Section>
  );
};

export default ProjectsSection;
