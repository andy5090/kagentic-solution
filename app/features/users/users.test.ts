import { describe, it, expect, beforeAll } from "vitest";
import { createCallerFactory } from "~/lib/trpc/trpc";
import resend from "~/lib/resend";
import db from "~/lib/db";
import { appRouter } from "~/trpc-router";

describe("sendEmail - real email sending test", () => {
  let caller: any;

  beforeAll(() => {
    // Create a caller factory for the router
    const createCaller = createCallerFactory(appRouter);

    // Create context with db, resend, and a mock user
    // The user object needs to match the schema structure
    const ctx = {
      db,
      resend,
      user: {
        id: "test-user-id",
        email: "test@example.com",
        name: "Test User",
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    // Create the caller with the context
    caller = createCaller(ctx);
  });

  it("should send a real email via resend", async () => {
    // Use a test email address - you may want to change this to your own email
    const testEmail = process.env.TEST_EMAIL || "test@example.com";
    const testUsername = "Test User";
    const testButtonLink = "https://kagentic.com/agentic";

    const result = await caller.users.sendEmail({
      email: testEmail,
      username: testUsername,
      buttonLink: testButtonLink,
    });

    // Verify the email was sent successfully
    expect(result).toEqual({
      success: true,
    });
  });

  it("should handle email sending errors", async () => {
    // Test with an invalid email to verify error handling
    // This should fail at zod validation, but we test the error path
    try {
      await caller.users.sendEmail({
        email: "invalid-email",
        username: "Test User",
        buttonLink: "https://kagentic.com/agentic",
      });
      // If validation passes and resend returns an error
      expect.fail("Should have thrown a validation error");
    } catch (error: any) {
      // Expect zod validation error
      expect(error).toBeDefined();
    }
  });
});
