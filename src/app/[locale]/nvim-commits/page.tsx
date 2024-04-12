import { getLocaleDateString } from "@utils";
import { intlFormatDistance } from "date-fns";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";

import Calender from "@app/[locale]/nvim-commits/calender";
import Layout from "@components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import {
  CommitMessage,
  getNeovimRepositoryCommits,
  getRepoName,
} from "./github";

import type { FC } from "react";
import type { ListCommits } from "./github";

const NeovimCommitsPage: FC<{
  params: { locale: string };
  searchParams: { until: string; since: string };
}> = ({ params: { locale }, searchParams: { until, since } }) => {
  const t = useTranslations("NeovimConfig");
  return (
    <Layout title={t("title")} description={t("description")}>
      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-4">
          <Calender type="since" />
          <Calender type="until" />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <CommitsAccordion locale={locale} since={since} until={until} />
        </Suspense>
      </section>
    </Layout>
  );
};

const CommitsAccordion: FC<{
  locale: string;
  until?: string;
  since?: string;
}> = async ({ locale, until, since }) => {
  const commits = await getNeovimRepositoryCommits({
    until,
    since,
  });
  const t = await getTranslations("NeovimConfig");

  const groupedByDate = commits.reduce<Record<string, ListCommits>>(
    (acc, commitInfo) => {
      const date = getLocaleDateString(
        new Date(
          (
            commitInfo.commit.author?.date ?? commitInfo.commit.committer?.date!
          ).split("T")[0]!
        ),
        locale
      );
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date]!.push(commitInfo);
      return acc;
    },
    {}
  );

  return Object.keys(groupedByDate).map((date) => (
    <div key={date} className="space-y-2">
      <p className="px-2 text-xl font-semibold">{date}</p>
      <div className="space-y-2">
        {groupedByDate[date]!.map((commitInfo) => (
          <div className="flex flex-col gap-1 rounded-lg border-border/40 p-2 hover:bg-accent">
            <Link
              target="_blank"
              className="text-lg font-semibold text-blue-500 hover:underline"
              href={`https://github.com/${getRepoName({ apiUrl: commitInfo.url })}`}
            >
              {getRepoName({ apiUrl: commitInfo.url })}
            </Link>
            <CommitMessage
              commitUrl={commitInfo.html_url}
              commitMessage={commitInfo.commit.message}
            />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="h-6 w-6">
                {commitInfo.author?.avatar_url && (
                  <AvatarImage
                    src={commitInfo.author?.avatar_url}
                    alt={commitInfo.author?.name ?? "Github User"}
                  />
                )}
                <AvatarFallback>GH</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  target="_blank"
                  href={
                    commitInfo.author?.html_url ??
                    commitInfo.committer?.html_url!
                  }
                  className="hover:underline"
                >
                  {commitInfo.author?.login ?? commitInfo.committer?.login}
                </Link>{" "}
                {t("committed", {
                  relativeTime: intlFormatDistance(
                    commitInfo.commit.author?.date ??
                      commitInfo.commit.committer?.date!,
                    new Date(),
                    {
                      locale: locale,
                    }
                  ),
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ));
};

export default NeovimCommitsPage;
