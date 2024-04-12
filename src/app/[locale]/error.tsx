"use client";

import { useTranslations } from "next-intl";

import Error from "@components/error";

import type { ErrorComponentProps } from "@components/error";
import type { FC } from "react";

const LocaleError: FC<ErrorComponentProps> = (props) => {
  const t = useTranslations("Error.Messages");
  return <Error message={t("default")} {...props} />;
};

export default LocaleError;
