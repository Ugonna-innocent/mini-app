"use client";

import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { submitReview } from "@/actions/submit-review";

import z from "zod";
import { reviewSchema } from "@/schema/review-schema";

export type ReviewSchema = z.infer<typeof reviewSchema>;

export const useReviewForm = () => {
  const [rating, setRating] = useState(0);

  const form = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      title: "",
      body: "",
      rating: 0,
    },
  });

  const { execute, isExecuting } = useAction(submitReview, {
    onSuccess: () => {
      toast.success("Review submitted!", {
        description: "Thank you for your review.",
      });
      form.reset();
      setRating(0);
    },
    onError: ({ error }) => {
      toast.error("Submission failed", {
        description:
          (error.serverError ?? error.validationErrors)
            ? "Please check your inputs."
            : "Something went wrong.",
      });
    },
  });

  const onSubmit = (formData: ReviewSchema) => execute(formData);

  const handleRating = (value: number) => {
    setRating(value);
    form.setValue("rating", value, { shouldValidate: true });
  };

  return { form, onSubmit, isExecuting, rating, handleRating };
};
