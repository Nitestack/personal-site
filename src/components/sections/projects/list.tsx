"use client";

import { type FC } from "react";

import { AnimatePresence } from "@components/motion";
import Project from "@components/sections/projects/project";
import { useProjectStatusContext } from "@components/sections/projects/status-context";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";

import type { TranslatedProject } from "@components/sections/projects/project";

const ProjectList: FC<{
  projects: TranslatedProject[];
  readMoreLabel: string;
  locale: string;
}> = ({ projects, readMoreLabel, locale }) => {
  const { isValid } = useProjectStatusContext();
  return (
    <div className="mx-auto px-7 lg:max-w-5xl">
      <Carousel className="w-full max-w-full" opts={{ loop: true }}>
        <CarouselContent>
          <AnimatePresence>
            {projects
              .filter((project) => isValid(project.status))
              .map((project) => (
                <CarouselItem key={project.name} className="md:basis-1/2">
                  <Project
                    readMoreLabel={readMoreLabel}
                    locale={locale}
                    key={project.name}
                    {...project}
                  />
                </CarouselItem>
              ))}
          </AnimatePresence>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProjectList;
