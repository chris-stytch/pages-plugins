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

export const generateLoginURL = ({
  redirectURL: redirectURLInit,
  aud,
}: {
  redirectURL: string | URL;
  aud: string;
}): string => {
  const redirectURL =
    typeof redirectURLInit === "string"
      ? new URL(redirectURLInit)
      : redirectURLInit;
  const host = redirectURL.origin;
  const loginURL = `/cdn-cgi/access/login/${host}?`;
  const searchParams = new URLSearchParams({
    kid: aud,
    redirect_url: redirectURL.pathname + redirectURL.search,
  });
  return loginURL + searchParams.toString();
};

export const generateLogoutURL = () => `/cdn-cgi/access/logout`;
