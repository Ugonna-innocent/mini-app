"use client";

import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LocalReview } from "@/types/country";

interface ReviewSectionProps {
  countryCode: string;
  countryName: string;
}

function ReviewCard({ review }: { review: LocalReview }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {review.reviewer.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium leading-none">
              {review.reviewer}
            </p>
            <div className="mt-0.5 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-3 w-3 ${
                    s <= review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          {new Date(review.submittedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {review.comment}
      </p>
    </div>
  );
}

export default function ReviewSection({
  countryCode,
  countryName,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<LocalReview[]>([]);

  const handleNewReview = (review: LocalReview) => {
    setReviews((prev) => [review, ...prev]);
  };

  return (
    <section className="space-y-6">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Reviews</h2>
        {reviews.length > 0 && (
          <Badge variant="secondary">{reviews.length}</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Form */}

        {/* Review list */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed text-center">
              <Star className="h-8 w-8 text-muted-foreground/40" />
              <p className="mt-2 text-sm text-muted-foreground">
                No reviews yet. Be the first!
              </p>
            </div>
          ) : (
            reviews.map((r) => (
              <ReviewCard key={r.id + r.submittedAt} review={r} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
