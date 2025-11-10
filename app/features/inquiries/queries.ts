import db from "~/db";
import { inquiries } from "./schema";

interface InquiryInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const submitInquiry = async (inquiry: InquiryInput) => {
  try {
    const newInquiry = await db.insert(inquiries).values(inquiry).returning();

    console.log(newInquiry);

    return newInquiry[0];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to submit inquiry");
  }
};
