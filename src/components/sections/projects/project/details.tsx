import { type TranslatedProject } from "@components/sections/projects/project";
import ProjectTags from "@components/sections/projects/project/tags";
import { Button } from "@components/ui/button";

import { Link } from "@navigation";

import { GithubIcon, LinkIcon, ZapIcon } from "lucide-react";
import NextImage from "next/image";
import { type FC } from "react";

import { getGitHubRepositoryUrl } from "@utils";

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
          {links.map((link) => (
            <Button asChild variant="outline" key={link.url} className="w-full">
              <Link
                className="flex items-center gap-2 md:text-lg"
                href={link.url}
                target="_blank"
              >
                {link.type === "github" ? (
                  <GithubIcon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                ) : link.type === "live" ? (
                  <ZapIcon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                ) : (
                  <LinkIcon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                )}
                <span>{link.name}</span>
              </Link>
            </Button>
          ))}
        </div>
      )}
      <ProjectTags name={project.name} tags={project.tags} />
    </div>
  );
};

export default ProjectDetails;
