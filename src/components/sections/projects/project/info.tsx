import { classNames } from "@utils";
import { type FC } from "react";

import { type TranslatedProject } from "@components/sections/projects/project";
import { Button } from "@components/ui/button";

const ProjectInfo: FC<
  Pick<TranslatedProject, "visibility" | "visibilityLabel" | "startDate"> & {
    locale: string;
  }
> = ({ visibility, visibilityLabel, startDate, locale }) => {
  const [month, year] = startDate.split("-");
  const date = new Date(Number(year), Number(month) - 1);

  return (
    <div className="flex items-center justify-center gap-1 pointer-events-none">
      <Button
        size="sm"
        className={classNames(
          "px-1.5 py-0.5 h-fit rounded",
          visibility === "private" ? "bg-red-500" : "bg-blue-500"
        )}
      >
        {visibilityLabel}
      </Button>
      <Button
        size="sm"
        className="bg-muted text-muted-foreground px-1.5 py-0.5 h-fit rounded"
      >
        {date.toLocaleDateString(locale ?? undefined, {
          month: "long",
          year: "numeric",
        })}
      </Button>
    </div>
  );
};

export default ProjectInfo;
