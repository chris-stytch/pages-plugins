import { Identity } from "..";

export const getIdentity = async ({
  jwt,
  domain,
}: {
  jwt: string;
  domain: string;
}): Promise<undefined | Identity> => {
  const identityURL = new URL("/cdn-cgi/access/get-identity", domain);
  const response = await fetch(identityURL.toString(), {
    headers: { Cookie: `CF_Authorization=${jwt}` },
  });
  if (response.ok) return await response.json();
};
