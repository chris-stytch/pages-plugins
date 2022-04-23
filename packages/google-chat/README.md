## Pages Plugins

# [TODO WIP!] Google Chat

This Plugin creates a Google Chat bot which can respond to messages. It also includes an API for interacting with Google Chat (e.g. for creating messages) without the invocation having to be a response to an incoming message. This API is useful for situations where you want no user input e.g. alerts.

## Installation

```sh
npm install --save @cfpreview/pages-plugins-google-chat
```

## Usage

```typescript
// ./functions/google-chat.ts

import googleChatPlugin from "@cfpreview/pages-plugins-google-chat";

export const onRequest: PagesFunction = googleChatPlugin(async (message) => {
  if (message.text.includes("ping")) {
    return { text: "pong" };
  }

  return { text: "Sorry, I could not understand your message." };
});
```

The Plugin takes a function, which in turn takes an incoming message and returns a Promise of a response message (or void if there should not be any response).

The Plugin only exposes a single route, which is the URL you should set in the Google Cloud Console when creating the bot.

TODO: Screenshot of settings

### API

TODO: Documentation
