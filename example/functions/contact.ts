import mailchannelsPlugin from "@cfpreview/pages-plugins-mailchannels";

export const onRequest: PagesFunction = mailchannelsPlugin({
  personalizations: ({ formData }) => [
    {
      to: [{ name: "Greg Brimble", email: "hello@gregbrimble.com" }],
      bcc: [
        {
          name: formData.get("name").toString(),
          email: formData.get("email").toString(),
        },
      ],
    },
  ],
  from: ({ formData }) => ({
    name: formData.get("name").toString(),
    email: formData.get("email").toString(),
  }),
  respondWith: () =>
    new Response(null, {
      status: 302,
      headers: { Location: "/thank-you" },
    }),
});
