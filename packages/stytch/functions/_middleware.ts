export const onRequestGet = async ({ next }) => {
  const response = await next();


  return new HTMLRewriter()
    .on("body", {
      element(body) {
        body.append(
          `<script src="https://js.stytch.com/stytch.js"></script><script>window.stytchClient = Stytch('REPLACE_PUBLIC_TOKEN')</script>`,
          { html: true }
        );
      },
    })
    .transform(response);
};

