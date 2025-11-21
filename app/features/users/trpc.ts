import type { TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure } from "~/lib/trpc/trpc";
import WelcomeEmail from "react-email-starter/emails/welcome";
import z from "zod";

export const usersRouter = {
  sendEmail: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        username: z.string(),
        buttonLink: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, username, buttonLink } = input;
      const { resend } = ctx;

      const { error } = await resend.emails.send({
        from: "noreply@andineering.com",
        to: email,
        subject: "Welcome to Andineering",
        react: WelcomeEmail({ username, buttonLink }),
      });

      if (error) {
        return {
          error: error.message,
        };
      }

      return {
        success: true,
      };
    }),
} satisfies TRPCRouterRecord;
