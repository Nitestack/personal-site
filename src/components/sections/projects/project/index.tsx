import { MotionDiv } from "@components/motion";
import ProjectDetails from "@components/sections/projects/project/details";
import ProjectInfo from "@components/sections/projects/project/info";
import ProjectTags from "@components/sections/projects/project/tags";
import ProjectTitle from "@components/sections/projects/project/title";
import { Button } from "@components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@components/ui/drawer";

import NextImage from "next/image";
import { type FC } from "react";

import { type Project } from "@constants";

export type TranslatedProject = Omit<Project, "description"> & {
  description: string;
  visibilityLabel: string;
};

const Project: FC<
  TranslatedProject & { readMoreLabel: string; locale: string }
> = ({ readMoreLabel, locale, ...project }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="h-full"
    >
      <Card className="h-full flex flex-col gap-2 shadow-md overflow-x-hidden">
        <div className="hidden sm:block relative aspect-video w-full border-b border-border">
          <NextImage
            fill
            className="object-contain"
            src={project.imageUrl}
            alt={project.name}
          />
        </div>
        <CardHeader className="py-2 md:py-4 flex-1 space-y-2">
          <ProjectTitle status={project.status} className="mt-2 sm:mt-0">
            <CardTitle className="font-bold text-balance">
              {project.name}
            </CardTitle>
          </ProjectTitle>
          <ProjectInfo
            locale={locale}
            startDate={project.startDate}
            visibility={project.visibility}
            visibilityLabel={project.visibilityLabel}
          />
          <CardDescription className="md:text-base text-balance">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="space-y-4 flex flex-col items-center">
          <ProjectTags name={project.name} tags={project.tags} onCard />
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="hidden sm:inline-flex"
              >
                {readMoreLabel}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="space-y-1">
                  <ProjectTitle status={project.status}>
                    {project.name}
                  </ProjectTitle>
                  <ProjectInfo
                    locale={locale}
                    startDate={project.startDate}
                    visibility={project.visibility}
                    visibilityLabel={project.visibilityLabel}
                  />
                </DialogTitle>
                <DialogDescription className="text-balance text-center">
                  {project.description}
                </DialogDescription>
              </DialogHeader>
              <ProjectDetails {...project} />
            </DialogContent>
          </Dialog>
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="sm" variant="outline" className="sm:hidden">
                {readMoreLabel}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="space-y-1">
                  <ProjectTitle status={project.status}>
                    {project.name}
                  </ProjectTitle>
                  <ProjectInfo
                    locale={locale}
                    startDate={project.startDate}
                    visibility={project.visibility}
                    visibilityLabel={project.visibilityLabel}
                  />
                </DrawerTitle>
                <DrawerDescription className="text-balance">
                  {project.description}
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <ProjectDetails {...project} />
              </div>
            </DrawerContent>
          </Drawer>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
};

export default Project;
