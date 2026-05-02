import Container from "@/components/container";
import { safeRequest } from "@/lib/safe-request";
import CountryCard from "@/components/country-card";
import { getCountries } from "../actions/get-all-countries";

export const revalidate = 86400;

export default async function HomePage() {
  const { data, error } = await safeRequest(getCountries);

  if (error) {
    return (
      <Container className="py-20 text-center">
        <p className="text-lg font-medium text-destructive">
          Failed to load countries
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{error}</p>
      </Container>
    );
  }

  const countries = data ?? [];

  return (
    <Container className="py-10">
      <div className="mb-8">
        <p className="mb-1 font-mono text-xs text-muted-foreground">
          GET /v3.1/all?fields=name,cca2,cca3,capital,region,population,flags…
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          World Countries{" "}
          <span className="text-primary">({countries?.length})</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Click any country to view full details and leave a review.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {countries?.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </Container>
  );
}
