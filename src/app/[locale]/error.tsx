"use client";

import { useTranslations } from "next-intl";
import { type FC, useEffect } from "react";

const LocaleError: FC<{ error: Error; reset: () => void }> = ({ error }) => {
  const t = useTranslations("Error");
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>{t("message")}</p>
    </div>
  );
};

export default LocaleError;
