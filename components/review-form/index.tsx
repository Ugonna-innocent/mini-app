"use client";

import { useState } from "react";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { submitReview } from "@/lib/api/countries";
import type { LocalReview } from "@/types/country";

interface ReviewFormProps {
  countryCode: string;
  countryName: string;
  onReviewAdded: (review: LocalReview) => void;
}

export default function ReviewForm({
  countryCode,
  countryName,
  onReviewAdded,
}: ReviewFormProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!name.trim()) return "Please enter your name.";
    if (rating === 0) return "Please select a star rating.";
    if (!comment.trim()) return "Please write a review.";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setError("");
    setLoading(true);

    try {
      /**
       * POST https://jsonplaceholder.typicode.com/posts
       *
       * Payload : SubmitReviewPayload
       *   { title: string, body: string, userId: number }
       *
       * Response: SubmitReviewResponse
       *   { id: number, title: string, body: string, userId: number }
       *
       * We embed the rating and country code inside `body`
       * since the mock API only has title / body / userId fields.
       */
      const response = await submitReview({
        title: name.trim(),
        body: `[rating:${rating}] [country:${countryCode}] ${comment.trim()}`,
        userId: 1,
      });

      // Build local review from the echoed response
      const localReview: LocalReview = {
        id: response.id,
        reviewer: response.title,
        rating,
        comment: comment.trim(),
        submittedAt: new Date().toISOString(),
      };

      onReviewAdded(localReview);
      setSuccess(true);
      setName("");
      setRating(0);
      setComment("");

      setTimeout(() => setSuccess(false), 5_000);
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
        <CardDescription>
          Share your experience with or knowledge of {countryName}
        </CardDescription>

        {/* Endpoint reference */}
        <div className="mt-1 rounded-md bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
          <span className="text-green-500 dark:text-green-400">POST</span>{" "}
          jsonplaceholder.typicode.com/posts
          <br />
          <span className="opacity-60">
            Body: {"{ title, body, userId }"} → Response:{" "}
            {"{ id, title, body, userId }"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="e.g. Emeka Obi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Star rating */}
        <div className="space-y-1.5">
          <Label>Rating</Label>
          <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                disabled={loading}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                className="transition-transform hover:scale-110 disabled:pointer-events-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hover || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 self-center text-sm text-muted-foreground">
                {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
              </span>
            )}
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-1.5">
          <Label htmlFor="comment">Review</Label>
          <Textarea
            id="comment"
            placeholder={`Tell us about ${countryName}…`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            disabled={loading}
            className="resize-none"
          />
          <p className="text-right text-xs text-muted-foreground">
            {comment.length} chars
          </p>
        </div>

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success */}
        {success && (
          <Alert className="border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Review submitted! (via JSONPlaceholder mock API)
            </AlertDescription>
          </Alert>
        )}

        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting…
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
