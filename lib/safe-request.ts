/**
 * safeRequest.ts
 *
 * This is a universal wrapper for all server/client API calls in the project.
 *
 * Purpose:
 * - Ensures that API failures never crash server-side pages (avoids Next.js error.tsx).
 * - Returns a consistent structure: { data?, error? }.
 *   - `data` contains the API response if the request succeeds.
 *   - `error` contains the backend error message if the request fails.
 * - Preserves strict typing with generic <T> for API response.
 * - Can wrap any promise-returning function (getRequest, postRequest, putRequest, deleteRequest).
 *
 * Usage:
 *   const { data, error } = await safeRequest(() => getRequest<T>({ ... }));
 */

export async function safeRequest<T>(
  fn: () => Promise<T>,
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await fn();
    return { data, error: undefined };
  } catch (err) {
    return {
      data: undefined,
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
}
