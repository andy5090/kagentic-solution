import db from "~/db";
import { inquiries } from "../inquiries/schema";

interface Inquiry {
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: "submitted" | "in_progress" | "resolved" | "closed";
}

export const submitInquiry = async (inquiry: Inquiry) => {
  try {
    const newInquiry = await db.insert(inquiries).values(inquiry);

    return newInquiry;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
