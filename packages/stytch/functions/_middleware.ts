export const onRequestGet = async ({ next }) => {
  const response = await next();


  return new HTMLRewriter()
    .on("script", {
      element(script) {
        script.replace(
          `<script src="https://js.stytch.com/stytch.js"></script>`,
          { html: true }
        );
      },
    })
    .transform(response);
};

