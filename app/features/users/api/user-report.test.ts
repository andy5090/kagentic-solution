import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  beforeAll,
} from "vitest";
import { action } from "./user-report";
import axios from "axios";
import type { Route } from "./+types/user-report";

// Mock dependencies
const mockFrom = vi.fn();
const mockSelect = vi.fn(() => ({
  from: mockFrom,
}));

describe("user-report real execution test", () => {
  it("should count users and send Discord webhook notification", async () => {
    const result = await action({
      request: {
        method: "POST",
      } as Request,
    } as Route.ActionArgs);

    expect(result).toEqual(
      expect.objectContaining({
        userCount: expect.any(Number),
        reportedAt: expect.any(String),
      })
    );
  });
});

describe("user-report action", () => {
  const mockRequest = {
    method: "POST",
  } as Request;

  beforeAll(() => {
    vi.mock("~/lib/db", () => ({
      default: {
        select: mockSelect,
      },
    }));

    vi.mock("axios", () => ({
      default: {
        post: vi.fn(),
      },
    }));
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockSelect.mockReturnValue({
      from: mockFrom,
    });
    // Mock console.error to avoid noise in test output
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("method validation", () => {
    it("should return error for non-POST requests", async () => {
      const getRequest = {
        method: "GET",
      } as Request;

      const result = await action({
        request: getRequest,
      } as any);

      expect(result).toEqual({
        error: "Method not allowed",
      });
      expect(mockSelect).not.toHaveBeenCalled();
      expect(axios.post).not.toHaveBeenCalled();
    });

    it("should process POST requests", async () => {
      const mockUserCount = [{ count: 5 }];
      mockFrom.mockResolvedValue(mockUserCount);
      (axios.post as any).mockResolvedValue({ status: 200 });

      await action({
        request: mockRequest,
      } as any);

      expect(mockSelect).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalled();
    });
  });

  describe("successful execution", () => {
    it("should count users and send Discord webhook notification", async () => {
      const mockUserCount = [{ count: 10 }];
      mockFrom.mockResolvedValue(mockUserCount);
      (axios.post as any).mockResolvedValue({ status: 200 });

      const result = await action({
        request: mockRequest,
      } as any);

      expect(result).toEqual({
        userCount: mockUserCount[0].count,
        reportedAt: expect.any(String),
      });

      // Verify database query
      expect(mockSelect).toHaveBeenCalledWith({ count: expect.anything() });
      expect(mockFrom).toHaveBeenCalled();

      // Verify Discord webhook call
      expect(axios.post).toHaveBeenCalledWith(
        "https://discord.com/api/webhooks/1158822981087272992/NXwpqJV7RbRCDzWAg-K0Zfm7-ITvBXqneVYMjeiFjfYnA7v-UjClpWNTyD5DV_Vn5Yhl",
        expect.objectContaining({
          content: expect.stringContaining("📊 **User Report**"),
        })
      );

      const webhookCall = (axios.post as any).mock.calls[0];
      const webhookPayload = webhookCall[1];
      expect(webhookPayload.content).toContain("Total Users:");
      expect(webhookPayload.content).toContain("Reported At:");
    });

    it("should format the Discord message correctly", async () => {
      const mockUserCount = [{ count: 42 }];
      mockFrom.mockResolvedValue(mockUserCount);
      (axios.post as any).mockResolvedValue({ status: 200 });

      await action({
        request: mockRequest,
      } as any);

      const webhookCall = (axios.post as any).mock.calls[0];
      const webhookPayload = webhookCall[1];
      const content = webhookPayload.content;

      expect(content).toContain("📊 **User Report**");
      expect(content).toContain("Total Users:");
      expect(content).toContain("Reported At:");
      expect(content).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/); // Date format check
    });
  });

  describe("error handling", () => {
    it("should throw error when database query fails", async () => {
      const dbError = new Error("Database connection failed");
      mockFrom.mockRejectedValue(dbError);

      await expect(
        action({
          request: mockRequest,
        } as any)
      ).rejects.toThrow("Failed to report user count");

      expect(console.error).toHaveBeenCalledWith(dbError);
      expect(axios.post).not.toHaveBeenCalled();
    });

    it("should throw error when Discord webhook fails", async () => {
      const mockUserCount = [{ count: 5 }];
      const webhookError = new Error("Discord API error");
      mockFrom.mockResolvedValue(mockUserCount);
      (axios.post as any).mockRejectedValue(webhookError);

      await expect(
        action({
          request: mockRequest,
        } as any)
      ).rejects.toThrow("Failed to report user count");

      expect(console.error).toHaveBeenCalledWith(webhookError);
      expect(mockSelect).toHaveBeenCalled();
    });

    it("should handle zero user count", async () => {
      const mockUserCount = [{ count: 0 }];
      mockFrom.mockResolvedValue(mockUserCount);
      (axios.post as any).mockResolvedValue({ status: 200 });

      const result = await action({
        request: mockRequest,
      } as any);

      expect(result).toEqual({
        userCount: 0,
        reportedAt: expect.any(String),
      });

      const webhookCall = (axios.post as any).mock.calls[0];
      const webhookPayload = webhookCall[1];
      expect(webhookPayload.content).toContain("Total Users:");
    });
  });
});
