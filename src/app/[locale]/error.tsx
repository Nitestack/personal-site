"use client";

import { Button } from "@components/ui/button";

import { useTranslations } from "next-intl";
import { type FC, useEffect } from "react";

const LocaleError: FC<{ error: Error; reset: () => void }> = ({
  error,
  reset,
}) => {
  const t = useTranslations("Error");
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>{t("message")}</h1>
      <Button onClick={reset}>{t("retry")}</Button>
    </div>
  );
};

export default LocaleError;
