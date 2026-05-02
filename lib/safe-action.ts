import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient({
  handleServerError: (e) => {
    // Return the actual error message from the server
    if (e instanceof Error) {
      return e.message;
    }
    return "Something went wrong while processing the request.";
  },
});
