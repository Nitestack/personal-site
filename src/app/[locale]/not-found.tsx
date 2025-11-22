import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { type FC } from "react";

const LocaleNotFoundPage: FC = () => {
  const t = useTranslations("NotFound");
  return (
    <div className="my-6 flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
      <div className="relative aspect-square w-full max-w-md">
        <NextImage
          fill
          className="object-contain"
          src="/images/404.png"
          alt="Not Found"
        />
      </div>
      <h1 className="text-center text-3xl font-bold text-balance">
        {t("message")}
      </h1>
      <Button asChild variant="destructive">
        <Link href="/">{t("returnToHome")}</Link>
      </Button>
    </div>
  );
};

export default LocaleNotFoundPage;
