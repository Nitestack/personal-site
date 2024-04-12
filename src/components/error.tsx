"use client";

import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { useEffect } from "react";

import { Button } from "@components/ui/button";

import type { FC } from "react";

export interface ErrorComponentProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: FC<{ message: string } & ErrorComponentProps> = ({
  message,
  reset,
  error,
}) => {
  const t = useTranslations("Error");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="my-6 flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
      <div className="relative aspect-square w-full max-w-md">
        <NextImage
          fill
          className="object-contain"
          src="/images/error.png"
          alt="Error"
        />
      </div>
      <h1 className="text-balance text-center text-3xl font-bold">{message}</h1>
      <Button variant="destructive" onClick={reset}>
        {t("retry")}
      </Button>
    </div>
  );
};

export default Error;
