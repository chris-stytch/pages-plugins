import sentryPlugin from "@cfpreview/pages-plugins-sentry";
import headersPlugin from "@cfpreview/pages-plugins-headers";

export const onRequest: PagesFunction[] = [
  // sentryPlugin({
  //   // dsn: "https://sentry.io/xyz",
  // }),
  headersPlugin({
    "Access-Control-Allow-Origin": "*",
  }),
  ({ next }) => {
    return next();
  },
];
