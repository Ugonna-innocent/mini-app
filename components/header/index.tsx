import Link from "next/link";
import { Globe } from "lucide-react";
import Container from "../container";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Globe className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Country<span className="text-primary">Explorer</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
              REST Countries v3.1
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}
