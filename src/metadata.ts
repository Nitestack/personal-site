import { SITE_CONFIG } from "@/constants";
import { routing } from "@/i18n/routing";
import { type Metadata, type ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  type AbsoluteString,
  type AbsoluteTemplateString,
  type DefaultTemplateString,
} from "next/dist/lib/metadata/types/metadata-types";

interface RequiredMetadata {
  title: NonNullable<Metadata["title"]>;
  alternates: Omit<
    NonNullable<Metadata["alternates"]>,
    "canonical" | "languages"
  > & {
    canonical: `/${string}`;
  };
  openGraph?: Omit<
    NonNullable<Metadata["openGraph"]>,
    "title" | "locale" | "alternateLocale" | "description"
  >;
  twitter?: Omit<
    NonNullable<Metadata["twitter"]>,
    "title" | "site" | "siteId" | "description"
  >;
}

type WithLocaleParams<Params extends Record<string, string>> = Params & {
  locale: string;
};

interface WithLocaleProps<
  Params extends Record<string, string>,
  SearchParams extends Record<string, string | string[] | undefined>,
> {
  params: WithLocaleParams<Params>;
  searchParams: SearchParams;
}

type Promisify<T> = {
  [K in keyof T]: Promise<T[K]>;
};
type MaybePromise<T> = T | Promise<T>;

export const defaultMetadata = metadata((t, { params: { locale } }) => {
  return {
    applicationName: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.url),
    authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.name,
    description: t("All.description"),
    generator: "Next.js",
    keywords: ["portfolio", "blog"],
    title: {
      default: SITE_CONFIG.name,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    openGraph: {
      images: `/api/og?locale=${locale}`,
    },
    twitter: {
      images: `/api/og?locale=${locale}`,
    },
    robots: {},
    alternates: {
      canonical: "/",
    },
  };
});

export function metadata<
  Params extends Record<string, string> = Record<string, string>,
  SearchParams extends Record<string, string | string[] | undefined> = Record<
    string,
    string | string[] | undefined
  >,
>(
  generateMetadata: (
    t: Awaited<ReturnType<typeof getTranslations<never>>>,
    props: WithLocaleProps<Params, SearchParams>,
    parent: ResolvingMetadata
  ) => MaybePromise<
    | (Omit<Metadata, keyof RequiredMetadata | "metadataBase"> &
        RequiredMetadata)
    | undefined
  >
) {
  return async function (
    props: Promisify<WithLocaleProps<Params, SearchParams>>,
    parent: ResolvingMetadata
  ): Promise<Metadata | undefined> {
    const params = await props.params;
    const { locale } = params;
    const searchParams = await props.searchParams;
    const t = await getTranslations({ locale });
    const metadata = await generateMetadata(
      t,
      { params, searchParams },
      parent
    );
    if (!metadata) return;
    const resolvedTitle: string =
      typeof metadata.title === "string"
        ? metadata.title
        : ((metadata.title as DefaultTemplateString).default ??
          (metadata.title as AbsoluteTemplateString | AbsoluteString).absolute);
    metadata.description ??= t("All.description");
    const resolvedDescription = metadata.description;
    (metadata as Metadata).openGraph = {
      type: "website",
      siteName: SITE_CONFIG.name,
      url: metadata.alternates.canonical,
      ...(metadata.openGraph ?? {}),
      title: resolvedTitle,
      description: resolvedDescription,
      locale: locale,
      alternateLocale: routing.locales.filter(
        (currentLocale) => currentLocale.toLowerCase() !== locale.toLowerCase()
      ),
    };
    (metadata as Metadata).twitter = {
      card: "summary_large_image",
      ...(metadata.twitter ?? {}),
      title: resolvedTitle,
      description: resolvedDescription,
      site: "@nitestack",
      siteId: "1686490852212838400",
    };
    (metadata as Metadata).alternates = {
      ...metadata.alternates,
      languages: {},
    };
    for (const currentLocale of routing.locales) {
      ((metadata as Metadata).alternates!.languages as Record<string, string>)[
        currentLocale
      ] = `/${currentLocale}${metadata.alternates.canonical}`;
    }
    if (metadata.robots && typeof metadata.robots !== "string") {
      metadata.robots = {
        index: true,
        follow: true,
        ...metadata.robots,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
          ...(typeof metadata.robots.googleBot &&
          typeof metadata.robots.googleBot !== "string"
            ? metadata.robots.googleBot
            : {}),
        },
      };
    }
    return metadata;
  };
}
