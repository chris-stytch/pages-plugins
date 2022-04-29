import * as stytch from 'stytch';

// let client: stytch.Client;
// const loadStytch = () => {
//   if (!client) {
//     client = new stytch.Client({
//       project_id: process.env.STYTCH_PROJECT_ID || '',
//       secret: process.env.STYTCH_SECRET || '',
//       env: process.env.STYTCH_PROJECT_ENV === 'live' ? stytch.envs.live : stytch.envs.test,
//     });
//   }

//   return client;
// };

// export default loadStytch;

// class ScriptHandler {
//   element(element) {
//     element.append(`<script src="https://js.stytch.com/stytch.js"></script>`, { html: true })
//   }
// }

// export const onRequestGet = async ({ next }) => {
//   // We first get the original response from the project
//   const response = await next()

//   // Then, using HTMLRewriter, we transform `form` elements with a `data-static-form-name` attribute, to tell them to POST to the current page
//   return new HTMLRewriter().on('script', new ScriptHandler()).transform(response)
// }

export const onRequestGet = async ({ next }) => {
  const response = await next();

  return new HTMLRewriter()
    .on("script", {
      element(script) {
        script.append(
          `<script src="https://js.stytch.com/stytch.js"></script>`,
          { html: true }
        );
      },
    })
    .transform(response);
};

