import { redirect } from "next/navigation";

import { DEFAULT_LOCALE } from "@constants";

// This page only renders when the app is built statically (output: 'export')
const RootPage = () => {
  redirect(`/${DEFAULT_LOCALE}`);
};

export default RootPage;
