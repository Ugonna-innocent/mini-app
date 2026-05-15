"use server";

import { postRequest } from "@/lib/requests-handlers";
import { jsonPlaceholderApi } from "@/lib/request-client";
import { action } from "@/lib/safe-action";
import { reviewSchema } from "@/schema/review-schema";
import { SubmitReviewResponse } from "@/types/country";

export const submitReview = action
  .inputSchema(reviewSchema)
  .action(async ({ parsedInput }) => {
    const url = "/posts";

    return postRequest<SubmitReviewResponse, typeof parsedInput>({
      url,
      api: jsonPlaceholderApi,
      payload: parsedInput,
    });
  });
