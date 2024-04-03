import { LOCALIZATION_CONFIG } from "@constants";
import { redirect } from "next/navigation";

// This page only renders when the app is built statically (output: 'export')
const RootPage = () => {
  redirect(`/${LOCALIZATION_CONFIG.defaultLocale}`);
};

export default RootPage;
