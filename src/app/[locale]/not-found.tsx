import { Link } from "@navigation";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { type FC } from "react";

import { Button } from "@components/ui/button";

const LocaleNotFoundPage: FC = () => {
  const t = useTranslations("NotFound");
  return (
    <div className="flex items-center justify-center flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-8 my-6">
      <div className="relative aspect-square w-full max-w-md">
        <NextImage
          fill
          className="object-contain"
          src="/images/404.png"
          alt="Not Found"
        />
      </div>
      <h1 className="text-3xl text-center text-balance font-bold">
        {t("message")}
      </h1>
      <Button asChild variant="destructive">
        <Link href="/">{t("returnToHome")}</Link>
      </Button>
    </div>
  );
};

export default LocaleNotFoundPage;
