"use client";

import { type ProjectStatus } from "@constants";
import { type FC } from "react";

import { MotionDiv } from "@components/motion";
import { getProjectStatusIcon } from "@components/sections/projects";
import { useProjectStatusContext } from "@components/sections/projects/status-context";
import { Checkbox } from "@components/ui/checkbox";

const LegendProjectStatus: FC<{
  status: ProjectStatus;
  label: string;
}> = ({ status, label }) => {
  const { isValid, toggleProjectStatus } = useProjectStatusContext();
  return (
    <MotionDiv
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: "100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Checkbox
        className="rounded-sm h-5 w-5"
        checked={isValid(status)}
        onCheckedChange={toggleProjectStatus(status)}
      />
      <div className="flex items-center gap-0.5">
        {getProjectStatusIcon(status)}
      </div>
      <p>{label}</p>
    </MotionDiv>
  );
};

export default LegendProjectStatus;
