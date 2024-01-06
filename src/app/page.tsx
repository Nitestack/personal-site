import { redirect } from "next/navigation";

import { LOCALIZATION_CONFIG } from "@constants";

// This page only renders when the app is built statically (output: 'export')
const RootPage = () => {
  redirect(`/${LOCALIZATION_CONFIG.defaultLocale}`);
};

export default RootPage;
