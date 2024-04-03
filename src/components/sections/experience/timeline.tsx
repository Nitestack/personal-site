import { type MonthIndex } from "@constants";
import { Link } from "@navigation";
import { classNames } from "@utils";
import { useTranslations } from "next-intl";
import { type FC, type ReactNode } from "react";

import { MotionDiv } from "@components/motion";

export interface ExperienceTimelineItem {
  date: `${MonthIndex}-${number}`;
  endDate?: `${MonthIndex}-${number}`;
  duration?: Parameters<InstanceType<typeof Intl.RelativeTimeFormat>["format"]>;
  title: string;
  description: ReactNode;
  latest?: boolean;
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
                "absolute w-3 h-3 rounded-full mt-1 -start-1.5 border",
                event.latest
                  ? "bg-primary border-primary"
                  : "bg-muted border-muted"
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
              className="space-y-2"
              initial={{ opacity: 0, x: "-100%" }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-sm font-normal leading-none flex flex-wrap items-center gap-2">
                <p className="text-muted-foreground py-1">
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
                {event.latest && (
                  <span className="bg-primary w-fit text-primary-foreground font-medium px-2 py-1 rounded">
                    {t("latest")}
                  </span>
                )}
              </div>
              <h3 className="flex items-center flex-wrap gap-2 text-2xl font-semibold">
                <span className="flex items-center gap-2 flex-wrap">
                  {event.title}
                  {event.company && (
                    <span className="rounded bg-muted px-2 py-0.5 leading-8">
                      {event.companyLink ? (
                        <Link
                          className="hover:underline text-primary"
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
