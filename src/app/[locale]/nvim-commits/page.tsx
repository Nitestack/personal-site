/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain  */

import { metadata } from "@metadata";
import { getLocaleDateString } from "@utils";
import { intlFormatDistance } from "date-fns";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";

import { getOGImage } from "@app/[locale]/blog/notion";
import Calender from "@app/[locale]/nvim-commits/calender";
import {
  CommitMessage,
  getNeovimRepositoryCommits,
  getRepoName,
} from "@app/[locale]/nvim-commits/github";
import Layout from "@components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Skeleton } from "@components/ui/skeleton";

import type { ListCommits } from "@app/[locale]/nvim-commits/github";
import type { FC } from "react";

export const generateMetadata = metadata((t, { params: { locale } }) => {
  const title = t("NeovimConfig.title");
  const description = t("NeovimConfig.description");

  const imageUrl = getOGImage(undefined, {
    title,
    description,
    locale,
  });

  return {
    title,
    description,
    openGraph: {
      images: imageUrl,
    },
    twitter: {
      images: imageUrl,
    },
    alternates: {
      canonical: "/nvim-commits",
    },
  };
});

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
        <Suspense
          fallback={Array(4)
            .fill(0)
            .map((_, index) => (
              <CommitsSkeleton key={index} />
            ))}
        >
          <CommitsAccordion locale={locale} since={since} until={until} />
        </Suspense>
      </section>
    </Layout>
  );
};

const CommitsSkeleton: FC = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="ml-2 my-4 h-5 w-36" />
      <div className="space-y-2">
        <div className="flex flex-col gap-3 rounded-lg border border-border p-2">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-4 w-11/12" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-3/12" />
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-lg border border-border p-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-8/12" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-5/12" />
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-lg border border-border p-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-10/12" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-2/12" />
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-lg border border-border p-2">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-4 w-9/12" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-4/12" />
          </div>
        </div>
      </div>
    </div>
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
          <div
            key={commitInfo.sha}
            className="flex flex-col gap-1 rounded-lg border border-border p-2 hover:bg-accent"
          >
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
