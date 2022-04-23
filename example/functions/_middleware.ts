import sentryPlugin from "@cfpreview/pages-plugins-sentry";
import headersPlugin from "@cfpreview/pages-plugins-headers";

export const onRequest: PagesFunction[] = [
  ({ next }) => {
    try {
      return next();
    } catch (thrown) {
      return new Response(`${thrown}`, { status: 500 });
    }
  },
  // sentryPlugin({
  //   // dsn: "https://sentry.io/xyz",
  // }),
  headersPlugin({
    "Access-Control-Allow-Origin": "*",
  }),
];
