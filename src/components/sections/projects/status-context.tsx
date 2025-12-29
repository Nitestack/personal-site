"use client";

import { createContext, useCallback, useContext, useState } from "react";

import { status } from "@/constants";

import type { ProjectStatus } from "@/constants";
import type { FC, ReactNode } from "react";

interface ProjectStatusType {
  filteredProjectStatuses: ProjectStatus[];
  toggleProjectStatus: (status: ProjectStatus) => () => void;
  isValid: (status: ProjectStatus) => boolean;
}

const ProjectStatusContext = createContext<ProjectStatusType | null>(null);

export const ProjectStatusContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projectStatuses, setProjectStatuses] = useState<ProjectStatus[]>(
    status as unknown as ProjectStatus[],
  );

  const toggleProjectStatus = useCallback(
    (status: ProjectStatus) => {
      return () => {
        if (projectStatuses.includes(status)) {
          setProjectStatuses((currentProjectStatuses) =>
            currentProjectStatuses.filter((s) => s !== status),
          );
        } else {
          setProjectStatuses((currentProjectStatuses) => [
            ...currentProjectStatuses,
            status,
          ]);
        }
      };
    },
    [projectStatuses],
  );
  const isValid = useCallback(
    (status: ProjectStatus) => projectStatuses.includes(status),
    [projectStatuses],
  );

  return (
    <ProjectStatusContext.Provider
      value={{
        isValid,
        toggleProjectStatus,
        filteredProjectStatuses: projectStatuses,
      }}
    >
      {children}
    </ProjectStatusContext.Provider>
  );
};

export function useProjectStatusContext() {
  const context = useContext(ProjectStatusContext);

  if (context === null) {
    throw new Error(
      "useProjectStatusContext must be inside of <ProjectStatusContextProvider />",
    );
  }

  return context;
}
