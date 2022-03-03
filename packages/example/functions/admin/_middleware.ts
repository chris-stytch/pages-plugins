import cloudflareAccessPlugin from "@cfpreview/pages-plugins-cloudflare-access";
import type { PluginData as SentryPluginData } from "@cfpreview/pages-plugins-sentry";
import type { PluginData as CloudflareAccessPluginData } from "@cfpreview/pages-plugins-cloudflare-access";

export const onRequest = [
  cloudflareAccessPlugin({
    domain: "https://test.cloudflareaccess.com",
    aud: "97e2aae120121f902df8bc99fc345913ab186d174f3079ea729236766b2e7c4a",
  }),
  (async ({ data, next }) => {
    const identity = await data.cloudflareAccessJWT.getIdentity();

    data.sentry.setUser({
      id:
        data.cloudflareAccessJWT.payload.sub ||
        data.cloudflareAccessJWT.payload.common_name,
      username: identity?.name,
      ip_address: identity?.ip,
      email: data.cloudflareAccessJWT.payload.email,
    });

    return next();
  }) as PagesFunction<
    unknown,
    any,
    SentryPluginData & CloudflareAccessPluginData
  >,
];
