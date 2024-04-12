import "server-only";

import { env } from "@env";
import { type Endpoints } from "@octokit/types";
import Link from "next/link";
import { Octokit } from "octokit";
import { cache } from "react";

import type { FC } from "react";

export type ListCommits =
  Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];

const octokit = new Octokit({ auth: env.GITHUB_PERSONAL_ACCESS_TOKEN });

interface NeovimGithubRepositoryInfo {
  name: string;
  owner?: string;
  repos?: string[];
}

const repositories: (string | NeovimGithubRepositoryInfo)[] = [
  "LazyVim",
  {
    name: "NvChad",
    repos: ["NvChad", "ui"],
  },
  "LunarVim",
  {
    name: "AstroNvim",
    repos: ["AstroNvim", "astrocommunity", "astrocore", "astrolsp", "astroui"],
  },
];

interface QueryParams {
  since?: string;
  until?: string;
}

const getCommits = cache(
  (owner: string, repo?: string, options?: QueryParams) => {
    return octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner,
      repo: repo ?? owner,
      since: options?.since ? `${options.since}T00:00:00Z` : undefined,
      until: options?.until ? `${options.until}T00:00:00Z` : undefined,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  }
);

function isSingleRepo(repoInfo: string | NeovimGithubRepositoryInfo) {
  return typeof repoInfo === "string" || (repoInfo.repos?.length ?? 0) < 2;
}

export const getNeovimRepositoryCommits = cache(
  async (options?: QueryParams): Promise<ListCommits> => {
    const repos = repositories.filter(isSingleRepo).map((repoInfo) =>
      typeof repoInfo === "string"
        ? {
            name: repoInfo,
            owner: repoInfo,
            repo: repoInfo,
          }
        : {
            name: repoInfo.name,
            owner: repoInfo.owner ?? repoInfo.name,
            repo: repoInfo.repos?.at(0) ?? repoInfo.owner ?? repoInfo.name,
          }
    );
    for (const repoInfo of repositories.filter(
      (repoInfo) => !isSingleRepo(repoInfo)
    ) as NeovimGithubRepositoryInfo[]) {
      repos.push(
        ...(repoInfo.repos ?? []).map((repo) => ({
          name: repoInfo.name,
          owner: repoInfo.owner ?? repoInfo.name,
          repo,
        }))
      );
    }

    return ([] as ListCommits)
      .concat(
        ...(
          await Promise.all(
            repos.map(
              async (repoInfo) =>
                await getCommits(repoInfo.owner, repoInfo.repo, options)
            )
          )
        )
          .filter((result) => result.status === 200)
          .map((result) => result.data)
      )
      .toSorted(
        (a, b) =>
          new Date(
            b.commit.author?.date ?? b.commit.committer?.date ?? ""
          ).getTime() -
          new Date(
            a.commit.author?.date ?? a.commit.committer?.date ?? ""
          ).getTime()
      );
  }
);

type URLOption =
  | {
      htmlUrl: string;
    }
  | {
      apiUrl: string;
    };

function isHtmlUrl(options: URLOption): options is { htmlUrl: string } {
  return !!(options as { htmlUrl: string }).htmlUrl;
}

export function getRepoName(options: URLOption) {
  let startIndex = 2;
  let endIndex = 4;
  let url = "";
  if (isHtmlUrl(options)) {
    startIndex = 1;
    endIndex = 3;
    url = options.htmlUrl;
  } else {
    url = options.apiUrl;
  }
  const pathname = new URL(url).pathname;
  return pathname.split("/").slice(startIndex, endIndex).join("/");
}

export const CommitMessage: FC<{
  commitMessage: string;
  commitUrl: string;
}> = ({ commitMessage, commitUrl }) => {
  return (
    <Link className="truncate hover:underline" target="_blank" href={commitUrl}>
      {commitMessage}
    </Link>
  );
};
