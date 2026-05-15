import axios from "axios";
import { DEFAULT_API_ERROR } from "./constants";

export const extractApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.error ||
      error.response?.data?.message ||
      DEFAULT_API_ERROR
    );
  }

  return DEFAULT_API_ERROR;
};
