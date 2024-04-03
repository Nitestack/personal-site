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
          <GithubIcon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
        ) : type === "live" ? (
          <ZapIcon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
        ) : (
          <LinkIcon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
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
      <div className="relative aspect-video w-full border border-border rounded-md">
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
        <div className="flex items-center gap-2 w-full flex-wrap">
          {links.map((link, i) => {
            if ("links" in link)
              return (
                <div
                  key={link.name + i.toString()}
                  className="flex-col md:flex-row flex items-start md:items-center justify-between gap-2 w-full flex-wrap"
                >
                  <p className="bg-accent px-1 py-0.5 rounded">{link.name}:</p>
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
