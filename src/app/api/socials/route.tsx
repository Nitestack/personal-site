import { NextResponse } from "next/server";

import { SITE_CONFIG } from "@/constants";

import type { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const { origin } = request.nextUrl;
  return NextResponse.json({
    socials: SITE_CONFIG.socials.map((social) => ({
      name: social.name,
      url: `${origin}${social.url}`,
      iconUrl: `https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/${social.name.toLowerCase()}.svg`,
    })),
  });
}
