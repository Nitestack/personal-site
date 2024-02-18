import { MotionDiv } from "@components/motion";
import Section from "@components/sections/section";
import {
  Card,
  CardDescription,
  CardFooter,
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

import { type ProjectStatus, SITE_CONFIG, status } from "@constants";

function getProjectStatusIcon(status: ProjectStatus) {
  return status == "active"
    ? "🟢"
    : status == "completed"
      ? "✅"
      : status == "developing"
        ? "🛠️"
        : "📥";
}

const ProjectsSection: FC = () => {
  const t = useTranslations();
  return (
    <Section
      className="text-center space-y-4 md:space-y-6 lg:space-y-8"
      heading={t("Routes.projects")}
      sectionID="projects"
    >
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-1 p-4 overflow-x-hidden rounded-lg border border-border">
          {status.map((status) => (
            <MotionDiv
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: "100%" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-0.5">
                {getProjectStatusIcon(status)}
              </div>
              <p>{t(`Projects.Status.${status}`)}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
      <div className="px-7 lg:max-w-5xl mx-auto">
        <Carousel className="w-full max-w-full" opts={{ loop: true }}>
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
                  <Card className="h-full flex flex-col gap-2 hover:bg-muted cursor-pointer shadow-md overflow-x-hidden">
                    <div className="relative aspect-video w-full group-hover:opacity-75 border-b border-border">
                      <NextImage
                        fill
                        className="object-fill"
                        src={project.imageUrl}
                        alt={project.name}
                      />
                    </div>
                    <CardHeader className="py-2 md:py-4 flex-1 space-y-2 group-hover:bg-accent">
                      <div className="flex items-center justify-center gap-2">
                        <CardTitle className="font-bold text-balance break-all">
                          {project.name}{" "}
                        </CardTitle>
                        <span className="text-base p-0.5 bg-muted rounded">
                          {getProjectStatusIcon(project.status)}
                        </span>
                      </div>
                      <CardDescription className="md:text-base text-balance">
                        {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
                        {t(`Projects.Descriptions.${project.description}`)}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-end justify-center flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={`${project.name}-${tag}`}
                          className="rounded border text-xs/4 flex items-center px-1.5 py-0.5 md:px-2.5 md:py-1.5 bg-primary text-primary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </CardFooter>
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
