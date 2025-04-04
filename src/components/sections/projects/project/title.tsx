import { classNames } from "@utils";
import { type FC, type ReactNode } from "react";

import { getProjectStatusIcon } from "@components/sections/projects";
import { type TranslatedProject } from "@components/sections/projects/project";

const ProjectTitle: FC<
  Pick<TranslatedProject, "status"> & {
    children: ReactNode;
    className?: string;
  }
> = ({ status, children, className }) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center gap-2",
        className
      )}
    >
      {children}
      <span className="bg-muted rounded p-0.5 text-base">
        {getProjectStatusIcon(status)}
      </span>
    </div>
  );
};

export default ProjectTitle;
