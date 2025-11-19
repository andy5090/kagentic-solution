import db from "~/lib/db";
import { inquiries } from "./schema";
import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "~/lib/trpc/trpc";
import z from "zod";
import axios from "axios";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1158822981087272992/NXwpqJV7RbRCDzWAg-K0Zfm7-ITvBXqneVYMjeiFjfYnA7v-UjClpWNTyD5DV_Vn5Yhl";

interface InquiryInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const submitInquiry = async (inquiry: InquiryInput) => {
  try {
    const newInquiry = await db.insert(inquiries).values(inquiry).returning();

    await axios.post(DISCORD_WEBHOOK_URL, {
      content: `from **${inquiry.name}**

      **Email:** ${inquiry.email}
      **Phone:** ${inquiry.phone}
      **Message:**
      ${inquiry.message}`,
    });

    return newInquiry[0];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to submit inquiry");
  }
};

export const inquiriesRouter = {
  submitInquiry: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string().optional(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await submitInquiry(input);
    }),
  // user: protectedProcedure.query(async ({ input, ctx }) => {
  //   const user = await ctx.db.user.findFirst({
  //     where: {
  //       id: ctx.user?.id
  //     }
  //   })

  //   return user
  // })
} satisfies TRPCRouterRecord;
