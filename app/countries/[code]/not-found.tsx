import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-5xl">🌐</p>
      <h1 className="mt-4 text-2xl font-bold">Country not found</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        No data found for that country code.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">← Back to all countries</Link>
      </Button>
    </Container>
  );
}
