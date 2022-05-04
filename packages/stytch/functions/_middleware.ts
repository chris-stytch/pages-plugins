import type { PluginArgs } from "..";

type StytchPagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>
> = PagesPluginFunction<Env, Params, Data, PluginArgs>;

export const onRequestGet: StytchPagesPluginFunction = async ({
  next,
  pluginArgs,
}) => {
  const response = await next();

  return new HTMLRewriter()
    .on("body", {
      element(body) {
        body.append(
          `<script src="https://js.stytch.com/stytch.js"></script><script>window.stytchClient = Stytch('${pluginArgs.STYTCH_PUBLIC_TOKEN}')</script>`,
          { html: true }
        );
      },
    })
    .transform(response);
};

