import axios from "axios";

export const extractApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.error ||
      error.response?.data?.message ||
      "We couldn’t process your request. Please try again later."
    );
  }

  return "We couldn’t process your request. Please try again later.";
};
