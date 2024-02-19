import { type TranslatedProject } from "@components/sections/projects/project";

import { type FC } from "react";

import { classNames } from "@utils";

const ProjectTags: FC<
  Pick<TranslatedProject, "tags" | "name"> & { onCard?: boolean }
> = ({ name, tags, onCard }) => {
  return (
    <div
      className={classNames(
        "items-end justify-center flex-wrap gap-2",
        onCard ? "hidden md:flex" : "flex",
      )}
    >
      {tags.map((tag) => (
        <span
          key={`${name}-${tag}`}
          className="rounded border text-xs/4 flex items-center px-1.5 py-0.5 md:px-2.5 md:py-1.5 bg-primary text-primary-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default ProjectTags;
