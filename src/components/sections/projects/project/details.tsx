import { type ProjectSingleLink } from "@constants";
import { Link } from "@navigation";
import { getGitHubRepositoryUrl } from "@utils";
import { GithubIcon, LinkIcon, ZapIcon } from "lucide-react";
import NextImage from "next/image";
import { type FC } from "react";

import { type TranslatedProject } from "@components/sections/projects/project";
import ProjectTags from "@components/sections/projects/project/tags";
import { Button } from "@components/ui/button";

const ProjectDetailsLink: FC<ProjectSingleLink & { fullWidth?: boolean }> = ({
  name,
  url,
  type,
  fullWidth,
}) => {
  return (
    <Button
      asChild
      variant="outline"
      className={fullWidth ? "w-full" : undefined}
    >
      <Link
        className="flex items-center gap-2 md:text-lg"
        href={url}
        target="_blank"
      >
        {type === "github" ? (
          <GithubIcon className="h-4 w-4 text-primary lg:h-5 lg:w-5" />
        ) : type === "live" ? (
          <ZapIcon className="h-4 w-4 text-primary lg:h-5 lg:w-5" />
        ) : (
          <LinkIcon className="h-4 w-4 text-primary lg:h-5 lg:w-5" />
        )}
        <span>{name}</span>
      </Link>
    </Button>
  );
};

const ProjectDetails: FC<TranslatedProject> = (project) => {
  const links: NonNullable<TranslatedProject["links"]> = project.links
    ? [...project.links]
    : [];

  if (project.repoLink) {
    links.unshift({
      name: "GitHub",
      url: getGitHubRepositoryUrl(project.repoLink),
      type: "github",
    });
  }

  if (project.liveLink) {
    links.unshift({
      name: "Live",
      url: project.liveLink,
      type: "live",
    });
  }

  return (
    <div className="flex flex-col gap-3 overflow-x-hidden">
      <div className="relative aspect-video w-full rounded-md border border-border">
        <div className="relative aspect-video w-full">
          <NextImage
            fill
            className="object-contain"
            src={project.imageUrl}
            alt={project.name}
          />
        </div>
      </div>
      {links.length && (
        <div className="flex w-full flex-wrap items-center gap-2">
          {links.map((link, i) => {
            if ("links" in link)
              return (
                <div
                  key={link.name + i.toString()}
                  className="flex w-full flex-col flex-wrap items-start justify-between gap-2 md:flex-row md:items-center"
                >
                  <p className="rounded bg-accent px-1 py-0.5">{link.name}:</p>
                  <div className="flex items-center gap-1">
                    {link.links.map((l) => (
                      <ProjectDetailsLink
                        key={`${link.name}-${l.name}`}
                        {...l}
                      />
                    ))}
                  </div>
                </div>
              );
            else
              return <ProjectDetailsLink key={link.name} {...link} fullWidth />;
          })}
        </div>
      )}
      <ProjectTags name={project.name} tags={project.tags} />
    </div>
  );
};

export default ProjectDetails;
