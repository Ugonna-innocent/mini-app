import Container from "@/components/container";
import { safeRequest } from "@/lib/safe-request";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { getCountryByCode } from "@/actions/get-country-by-code";
import ReviewForm from "./_compnonets/review-form";

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const { data, error } = await safeRequest(() => getCountryByCode({ code }));

  if (error || !data?.[0]) notFound();

  const country = data[0];

  return (
    <Container className="py-8">
      {/* Back */}
      <Button variant="outline" size="sm" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          All Countries
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Left: Flag */}
        <div className="space-y-4 lg:col-span-2">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border bg-muted">
            <Image
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt ?? `Flag of ${country.name.common}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-6 lg:col-span-3">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {country.name.common}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {country.name.official}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>{country.region}</Badge>
              {country.subregion && (
                <Badge variant="secondary">{country.subregion}</Badge>
              )}
              {country.unMember && <Badge variant="outline">UN Member</Badge>}
              {country.landlocked && (
                <Badge variant="outline">Landlocked</Badge>
              )}
              <Badge variant="secondary" className="font-mono">
                {country.cca3}
              </Badge>
            </div>
          </div>

          <Separator className="my-10" />

          {/* Review form */}
          <div className="max-w-lg">
            <h2 className="mb-1 text-xl font-semibold">Reviews</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Submitted via{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                POST jsonplaceholder.typicode.com/posts
              </code>
            </p>
            <ReviewForm countryName={country.name.common} />
          </div>
        </div>
      </div>
    </Container>
  );
}
