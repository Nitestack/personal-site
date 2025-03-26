import { classNames } from "@utils";
import { type FC } from "react";

import { type TranslatedProject } from "@components/sections/projects/project";

const ProjectTags: FC<
  Pick<TranslatedProject, "tags" | "name"> & { onCard?: boolean }
> = ({ name, tags, onCard }) => {
  return (
    <div
      className={classNames(
        "flex-wrap items-end justify-center gap-2",
        onCard ? "hidden md:flex" : "flex"
      )}
    >
      {tags.map((tag) => (
        <span
          key={`${name}-${tag}`}
          className="bg-primary text-primary-foreground flex items-center rounded border px-1.5 py-0.5 text-xs/4 md:px-2.5 md:py-1.5"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default ProjectTags;
