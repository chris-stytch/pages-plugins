## Pages Plugins

# Sentry

This Sentry Plugin captures and logs all exceptions which occur below it in the execution chain. It is therefore recommended that you install this Plugin at the root of your application in `functions/_middleware.ts` as the very first Plugin.

## Installation

```sh
npm install --save @cfpreview/pages-plugins-sentry
```

## Usage

```typescript
// ./functions/_middleware.ts

import sentryPlugin from "@cfpreview/pages-plugins-sentry";

export const onRequest: PagesFunction = sentryPlugin({
  dsn: "https://sentry.io/xyz",
});
```

The Plugin uses [Toucan](https://github.com/robertcepa/toucan-js) behind-the-scenes, so can take any of [these following options](https://github.com/robertcepa/toucan-js#other-options). `context`/`request`/`event` is already populated, so does not need to be manually included.

If your [DSN](https://docs.sentry.io/product/sentry-basics/dsn-explainer/) is held as an environment variable or in KV, you can access it like so:

```typescript
// ./functions/_middleware.ts

import sentryPlugin from "@cfpreview/pages-plugins-sentry";

export const onRequest: PagesFunction<{
  SENTRY_DSN: string;
}> = (context) => {
  return sentryPlugin({ dsn: context.env.SENTRY_DSN })(context);
};
```

```typescript
// ./functions/_middleware.ts

import sentryPlugin from "@cfpreview/pages-plugins-sentry";

export const onRequest: PagesFunction<{
  KV: KVNamespace;
}> = async (context) => {
  return sentryPlugin({ dsn: await context.KV.get("SENTRY_DSN") })(context);
};
```

### Additional Context

If you need to set additional context for Sentry (e.g. user information or additional logs), you may use the `data.sentry` instance in any Function below the Plugin in the execution chain.

For example, you can access `data.sentry` and set user information like so:

```typescript
// ./functions/admin/_middleware.ts

import type { PluginData } from "@cfpreview/pages-plugins-sentry";

export const onRequest: PagesFunction<unknown, any, PluginData> = async ({
  data,
  next,
}) => {
  // Authenticate the user from the request and extract user's email address
  const email = await getEmailFromRequest(request);

  data.sentry.setUser({ email });

  return next();
};
```

Again, the full list of features can be found in [Toucan's documentation](https://github.com/robertcepa/toucan-js#features).
