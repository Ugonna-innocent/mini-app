import Link from "next/link";
import Image from "next/image";
import { MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CountryListItem } from "@/types/country";

interface CountryCardProps {
  country: CountryListItem;
}

function formatPopulation(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return Math.round(n / 1_000) + "K";
  return n.toLocaleString();
}

export default function CountryCard({ country }: CountryCardProps) {
  const capital = country.capital?.[0] ?? "—";
  const primaryLang = country.languages
    ? Object.values(country.languages)[0]
    : null;

  return (
    <Link
      href={`/countries/${country.cca3}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
    >
      <Card className="h-full overflow-hidden transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5">
        {/* Flag */}
        <div className="relative h-40 w-full overflow-hidden bg-muted">
          <Image
            src={country.flags.png}
            alt={country.flags.alt ?? `Flag of ${country.name.common}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <Badge
            variant="secondary"
            className="absolute right-2 top-2 font-mono text-xs"
          >
            {country.cca2}
          </Badge>
        </div>

        <CardHeader className="pb-1 pt-3">
          <h2 className="line-clamp-1 text-base font-semibold group-hover:text-primary transition-colors">
            {country.name.common}
          </h2>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {country.name.official}
          </p>
        </CardHeader>

        <CardContent className="space-y-1.5 pb-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{capital}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span>{formatPopulation(country.population)}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <Badge variant="outline" className="text-xs">
              {country.region}
            </Badge>
            {primaryLang && (
              <Badge variant="outline" className="text-xs">
                {primaryLang}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
