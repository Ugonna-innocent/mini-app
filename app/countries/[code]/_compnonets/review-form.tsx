"use client";

import { Star, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReviewForm } from "./review-form-config";
import { ControlledField } from "@/components/controlled-field";

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

export default function ReviewForm({ countryName }: { countryName: string }) {
  const { form, onSubmit, isExecuting, rating, handleRating } = useReviewForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
        <CardDescription>
          Share your thoughts about {countryName}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <ControlledField
            name="title"
            control={form.control}
            label="Your Name"
            required
          >
            {(field) => (
              <Input
                {...field}
                id="title"
                placeholder="e.g. Emeka Obi"
                disabled={isExecuting}
              />
            )}
          </ControlledField>

          {/* Star Rating Field */}
          <ControlledField
            name="rating"
            control={form.control}
            label="Rating"
            required
          >
            {(field) => (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      disabled={isExecuting}
                      onClick={() => {
                        handleRating(star);
                        field.onChange(star); // Update RHF state
                      }}
                      className="transition-transform hover:scale-110 disabled:pointer-events-none"
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <span className="text-sm font-medium text-muted-foreground">
                    {RATING_LABELS[rating]}
                  </span>
                )}
              </div>
            )}
          </ControlledField>

          {/* Review Body Field */}
          <ControlledField
            name="body"
            control={form.control}
            label="Review"
            required
          >
            {(field) => (
              <Textarea
                {...field}
                id="body"
                placeholder={`Tell us about ${countryName}…`}
                rows={4}
                className="resize-none"
                disabled={isExecuting}
              />
            )}
          </ControlledField>

          <Button type="submit" className="w-full" disabled={isExecuting}>
            {isExecuting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
