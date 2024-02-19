import { type TranslatedProject } from "@components/sections/projects/project";
import { Button } from "@components/ui/button";

import { type FC } from "react";

import { classNames } from "@utils";

const ProjectVisibility: FC<
  Pick<TranslatedProject, "visibility" | "visibilityLabel">
> = ({ visibility, visibilityLabel }) => {
  return (
    <div className="flex items-center justify-center">
      <Button
        size="sm"
        className={classNames(
          "px-1.5 py-0.5 h-fit rounded",
          visibility === "private" ? "bg-red-500" : "bg-blue-500",
        )}
      >
        {visibilityLabel}
      </Button>
    </div>
  );
};

export default ProjectVisibility;
