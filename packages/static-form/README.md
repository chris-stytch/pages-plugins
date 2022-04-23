## Pages Plugins

# Static Form

This Plugin...

## Installation

```sh
npm install --save @cfpreview/pages-plugins-static-form
```

## Usage

```typescript
// ./functions/_middleware.ts

import staticFormPlugin from "@cfpreview/pages-plugins-static-form";

export const onRequest: PagesFunction = staticFormPlugin();
```
