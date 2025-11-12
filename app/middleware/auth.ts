import { eq } from "drizzle-orm";
import { redirect } from "react-router";
import { userContext } from "~/context";
import db from "~/db";
import { user } from "~/features/users/schema";
import { auth } from "~/lib/auth";

export const authMiddleware = async ({ request, context }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  const userId = session?.user.id;

  if (!userId) {
    throw redirect("/");
  }

  const userData = await db.select().from(user).where(eq(user.id, userId));

  context.set(userContext, userData);
};
