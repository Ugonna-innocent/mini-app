import type { AxiosInstance } from "axios";
import axios from "axios";
import { extractApiError } from "./extract-api-error";

/**
 * All requests return { success: true, data } on success
 * Throws clean Error with backend message on failure
 */
async function handleRequest<T>(
  request: () => Promise<T>,
): Promise<{ success: true; data: T }> {
  try {
    const data = await request();
    return { success: true, data };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (!err.response) {
        throw new Error(
          "Network error. Please check your internet connection.",
        );
      }

      console.log(extractApiError(err));

      throw new Error(extractApiError(err));
    }

    throw new Error(
      (err as Error)?.message ||
        "Something went wrong while processing the request.",
    );
  }
}

/**
 * Generic GET request
 */
export const getRequest = async <T>({
  api,
  url,
  headers,
  params,
}: {
  api: AxiosInstance;
  url: string;
  headers?: Record<string, string | boolean | number>;
  params?: Record<string, string | boolean | number>;
}) => {
  return handleRequest(() =>
    api.get<T>(url, { headers, params }).then((r) => r.data),
  );
};

/**
 * Generic POST request
 */
export const postRequest = async <T, P>(params: {
  api: AxiosInstance;
  url: string;
  payload: P;
  headers?: Record<string, string | boolean | number>;
}): Promise<{ success: true; data: T }> => {
  return handleRequest(() =>
    params.api
      .post<T>(params.url, params.payload, { headers: params.headers })
      .then((r) => r.data),
  );
};

/**
 * Generic PUT request
 */
export const putRequest = async <T, P>(params: {
  api: AxiosInstance;
  url: string;
  payload: P;
  headers?: Record<string, string | boolean | number>;
}): Promise<{ success: true; data: T }> => {
  return handleRequest(() =>
    params.api
      .put<T>(params.url, params.payload, { headers: params.headers })
      .then((r) => r.data),
  );
};

/**
 * Generic DELETE request
 */
export const deleteRequest = async <T>(params: {
  api: AxiosInstance;
  url: string;
  headers?: Record<string, string | boolean | number>;
}): Promise<{ success: true; data: T }> => {
  return handleRequest(() =>
    params.api
      .delete<T>(params.url, { headers: params.headers })
      .then((r) => r.data),
  );
};
