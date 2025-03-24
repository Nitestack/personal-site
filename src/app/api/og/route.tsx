import { SITE_CONFIG } from "@constants";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

import { routing } from "@/i18n/routing";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const workSansExtraBold = fetch(
    new URL("../../fonts/WorkSans-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const { searchParams, origin } = request.nextUrl;

  const hasTitle = searchParams.has("title");
  const hasDescription = searchParams.has("description");
  const hasLocale = searchParams.has("locale");
  const title = hasTitle ? searchParams.get("title")! : SITE_CONFIG.name;
  const locale =
    hasLocale &&
    routing.locales.includes(searchParams.get("locale")!.toLowerCase())
      ? searchParams.get("locale")!
      : routing.defaultLocale;

  try {
    const t = await getTranslations({ locale, namespace: "All" });
    const description = hasDescription
      ? searchParams.get("description")
      : t("description");

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: `url(${origin}/images/og-bg.jpg)`,
            backgroundSize: "100% 100%",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            fontFamily: "Work Sans",
            padding: "80px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                fontSize: title.length <= 15 ? 128 : 64,
                letterSpacing: "-0.025em",
                lineHeight: 1,
                color: "white",
                marginTop: 40,
                marginBottom: 40,
                whiteSpace: "pre-wrap",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 200,
                letterSpacing: "-0.025em",
                lineHeight: 1,
                color: "white",
                marginTop: 8,
                whiteSpace: "pre-wrap",
              }}
            >
              {description}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width="50"
              height="50"
              src={`${origin}/images/logo.png`}
              alt="Logo"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  lineHeight: 1,
                  color: "white",
                  marginBottom: 8,
                  whiteSpace: "pre-wrap",
                }}
              >
                Nhan Pham
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 200,
                  letterSpacing: "-0.025em",
                  lineHeight: 1,
                  color: "white",
                  whiteSpace: "pre-wrap",
                }}
              >
                Frontend Developer
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Work Sans",
            data: await workSansExtraBold,
            style: "normal",
          },
        ],
      }
    );
  } catch (err) {
    console.log(`${(err as Error).message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
