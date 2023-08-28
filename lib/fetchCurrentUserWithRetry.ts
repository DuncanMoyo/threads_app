import { currentUser } from "@clerk/nextjs";

const RETRY_DELAY_MS = 1000; // 1 second

export async function fetchCurrentUserWithRetry(maxAttempts: number) {
  let user = null;
  let attempts = 0;

  while (!user && attempts < maxAttempts) {
    try {
      user = await currentUser();
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      attempts += 1;
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }

  return user;
}