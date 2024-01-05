import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { type FC } from "react";

const HomePage: FC<{ params: { locale: string } }> = ({
  params: { locale },
}) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Settings");

  return <div>{t("language")}</div>;
};

export default HomePage;
