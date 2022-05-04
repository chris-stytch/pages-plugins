import stytchPlugin from "@cfpreview/pages-plugins-stytch";

export const STYTCH_PUBLIC_TOKEN = process.env.STYTCH_PUBLIC_TOKEN;

export const onRequest: PagesFunction = stytchPlugin({STYTCH_PUBLIC_TOKEN});
