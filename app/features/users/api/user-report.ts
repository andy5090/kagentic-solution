import { count } from "drizzle-orm";
import db from "~/lib/db";
import { user } from "../schema";
import axios from "axios";
import type { Route } from "./+types/user-report";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1158822981087272992/NXwpqJV7RbRCDzWAg-K0Zfm7-ITvBXqneVYMjeiFjfYnA7v-UjClpWNTyD5DV_Vn5Yhl";

export const action = async ({ request }: Route.ActionArgs) => {
  if (request.method !== "GET") {
    return {
      error: "Method not allowed",
    };
  }

  try {
    const [userCount] = await db.select({ count: count() }).from(user);

    await axios.post(DISCORD_WEBHOOK_URL, {
      content: `📊 **User Report**
Total Users: ${userCount.count}
Reported At: ${new Date().toLocaleString()}`,
    });

    return {
      userCount: userCount.count,
      reportedAt: new Date().toLocaleString(),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to report user count");
  }
};
