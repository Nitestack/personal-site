"use client";

import { Button } from "@components/ui/button";

import { useTranslations } from "next-intl";
import NextImage from "next/image";
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
    <div className="flex items-center justify-center flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-8 my-6">
      <div className="relative aspect-square w-full max-w-md">
        <NextImage
          fill
          className="object-contain"
          src="/images/error.png"
          alt="Error"
        />
      </div>
      <h1 className="text-3xl text-center text-balance font-bold">
        {t("message")}
      </h1>
      <Button variant="destructive" onClick={reset}>
        {t("retry")}
      </Button>
    </div>
  );
};

export default LocaleError;
