import { SITE_CONFIG, status } from "@constants";
import { useTranslations } from "next-intl";
import { type FC } from "react";

import LegendProjectStatus from "@components/sections/projects/legend-status";
import ProjectList from "@components/sections/projects/list";
import { ProjectStatusContextProvider } from "@components/sections/projects/status-context";
import Section from "@components/sections/section";

import type { ProjectStatus } from "@constants";

export function getProjectStatusIcon(status: ProjectStatus) {
  return status == "active"
    ? "🟢"
    : status == "completed"
      ? "✅"
      : status == "developing"
        ? "🛠️"
        : "📥";
}

const ProjectsSection: FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations();
  return (
    <Section
      className="text-center space-y-4 md:space-y-6 lg:space-y-8"
      heading={t("Routes.projects")}
      sectionID="projects"
    >
      <ProjectStatusContextProvider>
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-1 px-3 py-4 overflow-x-hidden rounded-lg border border-border">
            {status.map((status) => (
              <LegendProjectStatus
                key={status}
                status={status}
                label={t(`Projects.Status.${status}`)}
              />
            ))}
          </div>
        </div>
        <ProjectList
          locale={locale}
          readMoreLabel={t("Projects.readMore")}
          projects={SITE_CONFIG.projects.map((project) => ({
            ...project,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            description: t(`Projects.Descriptions.${project.description}`),
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            visibilityLabel: t(`Projects.Visibility.${project.visibility}`),
          }))}
        />
      </ProjectStatusContextProvider>
    </Section>
  );
};

export default ProjectsSection;
