## Pages Plugins

# Cloudflare Access

This Plugin is a middleware to validate Cloudflare Access JWT assertions. It also includes an API to lookup additional information about a given user's JWT.

## Installation

```sh
npm install --save @cfpreview/pages-plugins-cloudflare-access
```

## Usage

```typescript
// ./functions/_middleware.ts

import cloudflareAccessPlugin from "@cfpreview/pages-plugins-cloudflare-access";

export const onRequest: PagesFunction = cloudflareAccessPlugin({
  domain: "https://test.cloudflareaccess.com",
  aud: "4714c1358e65fe4b408ad6d432a5f878f08194bdb4752441fd56faefa9b2b6f2",
});
```

The Plugin takes an object with two properties: the `domain` of your Cloudflare Access account, and the policy `aud` (audience) to validate against. Any requests which fail validation will be returned a 403.

### Accessing the JWT payload

If you need to use the JWT payload in your application (e.g. you need the user's email address), this Plugin will make this available for you at `data.cloudflareAccess.JWT.payload`.

For example:

```typescript
// ./functions/greet.ts

import type { PluginData } from "@cfpreview/pages-plugins-cloudflare-access";

export const onRequest: PagesFunction<unknown, any, PluginData> = async ({
  data,
}) => {
  return new Response(
    `Hello, ${data.cloudflareAccess.JWT.payload.email || "service user"}!`
  );
};
```

The [entire JWT payload](https://developers.cloudflare.com/cloudflare-one/identity/users/validating-json/#payload) will be made available on `data.cloudflareAccess.JWT.payload`. Be aware that the fields available differ between identity authorizations (e.g. a user in a browser) and non-identity authorizations (e.g. a service token).

### Look up identity

In order to get more information about a given user's identity, you can use the provided `getIdentity` API function:

```typescript
// ./functions/greet.ts

import { getIdentity } from "@cfpreview/pages-plugins-cloudflare-access/api";

export const onRequest: PagesFunction<unknown, any, PluginData> = async ({
  data,
}) => {
  const identity = await getIdentity({
    jwt: "eyJhbGciOiJIUzI1NiIsImtpZCI6IjkzMzhhYmUxYmFmMmZlNDkyZjY0NmE3MzZmMjVhZmJmN2IwMjVlMzVjNjI3YmU0ZjYwYzQxNGQ0YzczMDY5YjgiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiOTdlMmFhZTEyMDEyMWY5MDJkZjhiYzk5ZmMzNDU5MTNhYjE4NmQxNzRmMzA3OWVhNzI5MjM2NzY2YjJlN2M0YSJdLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiZXhwIjoxNTE5NDE4MjE0LCJpYXQiOjE1MTkzMzE4MTUsImlzcyI6Imh0dHBzOi8vdGVzdC5jbG91ZGZsYXJlYWNjZXNzLmNvbSIsIm5vbmNlIjoiMWQ4MDgzZjcwOGE0Nzk4MjI5NmYyZDk4OTZkNzBmMjA3YTI3OTM4ZjAyNjU0MGMzOTJiOTAzZTVmZGY0ZDZlOSIsInN1YiI6ImNhNjM5YmI5LTI2YWItNDJlNS1iOWJmLTNhZWEyN2IzMzFmZCJ9.05vGt-_0Mw6WEFJF3jpaqkNb88PUMplsjzlEUvCEfnQ",
    domain: "https://test.cloudflareaccess.com",
  });

  return new Response(`Hello, ${identity.name || "service user"}!`);
};
```

The `getIdentity` function takes an object with two properties: a `jwt` string, and a `domain` string. It returns a `Promise` of [the object returned by the `/cdn-cgi/accesss/get-identity` endpoint](https://developers.cloudflare.com/cloudflare-one/identity/users/validating-json/#groups-within-a-jwt). This is particularly useful if you want to use a user's group membership for something like application permissions.

For convience, this same information can be fetched for the current request's JWT with the `data.cloudflareAccess.JWT.getIdentity` function, (assuming you have already validated the request with the Plugin as above):

```typescript
// ./functions/greet.ts

import type { PluginData } from "@cfpreview/pages-plugins-cloudflare-access";

export const onRequest: PagesFunction<unknown, any, PluginData> = async ({
  data,
}) => {
  const identity = await data.cloudflareAccess.JWT.getIdentity();

  return new Response(`Hello, ${identity.name || "service user"}!`);
};
```

### Login and logout URLs

If you want to force a login or logout, you can use these utility functions to generate URLs and redirect a user:

```typescript
// ./functions/login.ts

import { generateLoginURL } from "@cfpreview/pages-plugins-cloudflare-access";

export const onRequest = () => {
  const loginURL = generateLoginURL({
    redirectURL: "https://example.com/greet",
    aud: "4714c1358e65fe4b408ad6d432a5f878f08194bdb4752441fd56faefa9b2b6f2",
  });

  return new Response(null, {
    status: 302,
    headers: { Location: loginURL },
  });
};
```

```typescript
// ./functions/logout.ts

import { generateLogoutURL } from "@cfpreview/pages-plugins-cloudflare-access";

export const onRequest = () =>
  new Response(null, {
    status: 302,
    headers: { Location: generateLogoutURL() },
  });
```
