## Pages Plugins

# hCaptcha

This plugin validates hCaptcha tokens.

## Installation

```sh
npm install --save @cfpreview/pages-plugins-hcaptcha
```

## Usage

```typescript
// ./functions/register.ts

import hcaptchaPlugin from "@cfpreview/pages-plugins-hcaptcha";

export const onRequestPost = [
  hcaptchaPlugin({
    secret: "0x0000000000000000000000000000000000000000",
    response: async (request) => (await request.clone().formData()).get('h-captcha-response'),
    remoteip: request => request.headers.get('CF-Connecting-IP')
    sitekey: "10000000-ffff-ffff-ffff-000000000001",
    onError: async ({ data }) => {
      return new Response(`Could not confirm your humanity: ${data.hCaptcha['error-codes']}`, { status: 400 })
    }
  }),
  (async ({ request }) => {
    // Request has been validated as coming from a human

    const formData = await request.formData()

    // Store user credentials

    return new Response("Successfully registered!")
  }) as PagesFunction,
];
```

This plugin only exposes a single route, so wherever it is mounted is wherever it will be available. In the above example, because it is mounted in `./functions/register.ts` it will validate requests to `/register`.

The [`secret`](https://dashboard.hcaptcha.com/settings) and [`sitekey`](https://dashboard.hcaptcha.com/sites) can be found in your hCaptcha dashboard.

`response` and `remoteip` are both optional strings. `response` the hCaptcha token to verify (defaults to extracting `h-captcha-response` from a `multipart/form-data` request). `remoteip` should be requester's IP address (defaults to the `CF-Connecting-IP` header of the request).

`onError` is also optional, and should be a Function which takes the returns a Promise of a Response. By default, it'll return a human-readable error Response.

`data.hCaptcha` will be populated for subsequent Functions and the `onError` Function with [the hCaptcha response object](https://docs.hcaptcha.com/#verify-the-user-response-server-side).
