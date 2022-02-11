import type { PluginArgs } from "..";

type HeadersPagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>
> = PagesPluginFunction<Env, Params, Data, PluginArgs>;

export const onRequest: HeadersPagesPluginFunction = async ({
  next,
  pluginArgs,
}) => {
  const headers = new Headers(pluginArgs);

  let response = await next();
  response = new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  );

  for (const [name, value] of headers.entries()) {
    response.headers.set(name, value);
  }

  return response;
};
