import { type MonthIndex } from "@constants";
import { classNames } from "@utils";
import { useTranslations } from "next-intl";
import { type FC, type ReactNode } from "react";

import { Link } from "@/i18n/routing";
import { MotionDiv } from "@components/motion";

export interface ExperienceTimelineItem {
  date: `${MonthIndex}-${number}`;
  endDate?: `${MonthIndex}-${number}`;
  duration?: Parameters<InstanceType<typeof Intl.RelativeTimeFormat>["format"]>;
  title: string;
  description: ReactNode;
  current?: boolean;
  company?: string;
  companyLink?: string;
  tags?: string[];
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
          <li key={event.title + event.date.toString()} className="mb-10 ms-4">
            <MotionDiv
              className={classNames(
                "absolute -start-1.5 mt-1 h-3 w-3 rounded-full border",
                event.current
                  ? "border-primary bg-primary"
                  : "border-muted bg-muted"
              )}
              initial={event.current ? { opacity: 0 } : undefined}
              animate={
                event.current
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
              className="space-y-2"
              initial={{ opacity: 0, x: "-100%" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center gap-2 text-sm font-normal leading-none">
                <p className="py-1 text-muted-foreground">
                  {new Date(year, monthIndex - 1).toLocaleDateString(
                    locale ?? undefined,
                    {
                      month: "long",
                      year: "numeric",
                    }
                  )}
                  {endDate && (
                    <>
                      {" - "}
                      {new Date(
                        Number(endDate[1]),
                        Number(endDate[0]) - 1
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
                </p>
                {event.current && (
                  <span className="w-fit rounded bg-primary px-2 py-1 font-medium text-primary-foreground">
                    {t("current")}
                  </span>
                )}
              </div>
              <h3 className="flex flex-wrap items-center gap-2 text-2xl font-semibold">
                <span className="flex flex-wrap items-center gap-2">
                  {event.title}
                  {event.company && (
                    <span className="rounded bg-muted px-2 py-0.5 leading-8">
                      {event.companyLink ? (
                        <Link
                          className="text-primary hover:underline"
                          href={event.companyLink}
                          target="_blank"
                        >
                          {event.company}
                        </Link>
                      ) : (
                        event.company
                      )}
                    </span>
                  )}
                </span>
              </h3>
              <p className="text-base font-normal text-muted-foreground">
                {event.description}
              </p>
              {event.tags?.length && (
                <div className="flex items-center gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={`${event.title}-${tag}`}
                      className="rounded bg-muted px-2 py-0.5 leading-8"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </MotionDiv>
          </li>
        );
      })}
    </ol>
  );
};

export default ExperienceTimeline;
