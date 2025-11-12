import { createContext } from "react-router";
import type { user } from "./features/users/schema";

export const userContext = createContext<typeof user | null>(null);
