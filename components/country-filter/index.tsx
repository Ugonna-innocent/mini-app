import type { CountryListItem } from "@/types/country";
import CountryCard from "../country-card";

interface CountryFiltersProps {
  countries?: CountryListItem[];
}

export default function CountryFilters({ countries }: CountryFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {countries?.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
}
