import { MotionA } from "@components/motion";
import { getProjectStatusIcon } from "@components/sections/projects";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

import { Link } from "@navigation";

import NextImage from "next/image";
import { type FC } from "react";

import { getGitHubRepositoryUrl } from "@utils";

import { type Project } from "@constants";

export type TranslatedProject = Omit<Project, "description"> & {
  description: string;
};

const Project: FC<TranslatedProject> = (project) => {
  return (
    <Link
      href={
        project.repoLink
          ? getGitHubRepositoryUrl(project.repoLink)
          : {
              hash: "#",
            }
      }
      className="group"
      passHref
      legacyBehavior
    >
      <MotionA
        target={project.repoLink ? "_blank" : "_self"}
        initial={{ opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
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
              {project.description}
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
      </MotionA>
    </Link>
  );
};

export default Project;
