import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import { extractApiError } from "./extract-api-error";
import { DEFAULT_API_ERROR } from "./constants";

type BaseRequestConfig<T> = {
  api: AxiosInstance;
  url: string;
  headers?: Record<string, string>;
  successCondition?: (response: T) => boolean;
  params?: Record<string, string | number | boolean>;
};

type ApiSuccess<T> = Promise<{ success: true; data: T }>;

/**
 * All requests return { success: true, data } on success
 * Throws clean Error with backend message on failure
 */
async function handleRequest<T>(
  request: () => Promise<AxiosResponse<T>>,
  successCondition?: (response: T) => boolean,
): Promise<{ success: true; data: T }> {
  try {
    const response = await request();

    // Ensure backend returned data
    if (!response.data) {
      throw new Error(DEFAULT_API_ERROR);
    }

    // Custom success validation
    if (successCondition && !successCondition(response.data)) {
      throw new Error(DEFAULT_API_ERROR);
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (!err.response) {
        throw new Error(
          "Network error. Please check your internet connection.",
        );
      }

      throw new Error(extractApiError(err));
    }

    throw new Error((err as Error)?.message || DEFAULT_API_ERROR);
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
  successCondition,
}: BaseRequestConfig<T>): ApiSuccess<T> => {
  return handleRequest(
    () => api.get<T>(url, { headers, params }),
    successCondition,
  );
};

/**
 * Generic POST request
 */
export const postRequest = async <T, P>(
  params: BaseRequestConfig<T> & {
    payload: P;
  },
): ApiSuccess<T> => {
  return handleRequest(
    () =>
      params.api.post<T>(params.url, params.payload, {
        headers: params.headers,
        params: params.params,
      }),
    params.successCondition,
  );
};

/**
 * Generic PUT request
 */
export const putRequest = async <T, P>(
  params: BaseRequestConfig<T> & {
    payload: P;
  },
): ApiSuccess<T> => {
  return handleRequest(
    () =>
      params.api.put<T>(params.url, params.payload, {
        headers: params.headers,
        params: params.params,
      }),
    params.successCondition,
  );
};

/**
 * Generic DELETE request
 */
export const deleteRequest = async <T>(
  params: BaseRequestConfig<T>,
): ApiSuccess<T> => {
  return handleRequest(
    () =>
      params.api.delete<T>(params.url, {
        headers: params.headers,
        params: params.params,
      }),
    params.successCondition,
  );
};
