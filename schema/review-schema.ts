import z from "zod";

export const reviewSchema = z.object({
  title: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name too long"),
  body: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review must be under 500 characters"),
  rating: z.number().min(1, "Please select a rating").max(5),
});
