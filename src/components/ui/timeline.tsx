import { MotionDiv } from "@components/motion";

import { Link } from "@navigation";

import { useTranslations } from "next-intl";
import { type FC, type ReactNode } from "react";

import { classNames } from "@utils";

type MonthIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface ExperienceTimelineItem {
  date: `${MonthIndex}-${number}`;
  endDate?: `${MonthIndex}-${number}`;
  duration?: Parameters<InstanceType<typeof Intl.RelativeTimeFormat>["format"]>;
  title: ReactNode;
  description: ReactNode;
  latest?: boolean;
  company?: string;
  companyLink?: string;
}

const ExperienceTimeline: FC<{
  locale?: string;
  items: ExperienceTimelineItem[];
}> = ({ items, locale }) => {
  const formatter = new Intl.RelativeTimeFormat(locale ?? undefined, {
    style: "long",
  });
  const t = useTranslations("Experience");
  return (
    <ol className="relative border-s">
      {items.map((event) => {
        const dateString = event.date.split("-");
        const monthIndex = Number(dateString[0]);
        const year = Number(dateString[1]);

        const endDate = event.endDate?.split("-");
        return (
          <li className="mb-10 ms-4">
            <MotionDiv
              className={classNames(
                "absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border",
                event.latest
                  ? "bg-primary border-primary"
                  : "bg-muted border-muted",
              )}
              initial={event.latest ? { opacity: 0 } : undefined}
              animate={
                event.latest
                  ? {
                      opacity: [0.1, 1],
                    }
                  : undefined
              }
              transition={{
                repeat: Infinity,
                duration: 0.75,
                repeatType: "reverse",
              }}
            />
            <MotionDiv
              initial={{ opacity: 0, x: "-100%" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
                {new Date(year, monthIndex - 1).toLocaleDateString(
                  locale ?? undefined,
                  {
                    month: "long",
                    year: "numeric",
                  },
                )}
                {endDate && (
                  <>
                    {" - "}
                    {new Date(
                      Number(endDate[1]),
                      Number(endDate[0]) - 1,
                    ).toLocaleDateString(locale ?? undefined, {
                      month: "long",
                      year: "numeric",
                    })}
                  </>
                )}
                {event.duration?.length && (
                  <>
                    {" ("}
                    {formatter.format(...event.duration).replace("in ", "")}
                    {")"}
                  </>
                )}
              </time>
              <h3 className="flex items-center mb-1 text-2xl font-semibold">
                {event.title}
                {event.company && (
                  <>
                    {" "}
                    @{" "}
                    <span className="ml-2 rounded bg-muted px-2 py-0.5 leading-8">
                      {event.companyLink ? (
                        <Link href={event.companyLink} target="_blank">
                          {event.company}
                        </Link>
                      ) : (
                        event.company
                      )}
                    </span>
                  </>
                )}
                {event.latest && (
                  <span className="bg-primary text-primary-foreground text-base font-medium me-2 px-3 py-0.5 rounded ms-3">
                    {t("latest")}
                  </span>
                )}
              </h3>
              <p className="text-base font-normal text-muted-foreground">
                {event.description}
              </p>
            </MotionDiv>
          </li>
        );
      })}
    </ol>
  );
};

export default ExperienceTimeline;
