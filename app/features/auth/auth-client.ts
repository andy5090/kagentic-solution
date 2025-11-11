import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient();

export const signIn = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });
};

export const signOut = async () => {
  const response = await authClient.signOut();

  if (response.data?.success) {
    window.open("/", "_self");
  }
};
