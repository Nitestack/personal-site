"use client";

import { useTranslations } from "next-intl";
import { type FC } from "react";

import ErrorUI from "@components/error";

import type { ErrorComponentProps } from "@components/error";

const Error: FC<ErrorComponentProps> = (props) => {
  const t = useTranslations("Error.Messages");
  return <ErrorUI message={t("blogOverview")} {...props} />;
};

export default Error;
