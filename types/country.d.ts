export interface NativeName {
  official: string;
  common: string;
}

export interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<string, NativeName>;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface CountryCurrency {
  name: string;
  symbol: string;
}

export interface CountryIdd {
  root: string;
  suffixes: string[];
}

export interface CountryMaps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface CountryDemonym {
  f: string;
  m: string;
}

export interface CountryCapitalInfo {
  latlng?: [number, number];
}

export interface CountryCoatOfArms {
  png?: string;
  svg?: string;
}

export interface CountryCar {
  signs: string[];
  side: "left" | "right";
}

export interface CountryPostalCode {
  format: string;
  regex?: string;
}

export interface CountryListItem {
  name: CountryName;
  cca2: string; // 2-letter ISO code  e.g. "NG"
  cca3: string; // 3-letter ISO code  e.g. "NGA"
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  flags: CountryFlags;
  languages?: Record<string, string>;
  currencies?: Record<string, CountryCurrency>;
}

export interface CountryDetail extends CountryListItem {
  timezones: string[];
  continents: string[];
  borders?: string[]; // cca3 codes of bordering countries
  latlng: [number, number];
  landlocked: boolean;
  independent?: boolean;
  unMember: boolean;
  tld?: string[]; // top-level domains  e.g. [".ng"]
  idd?: CountryIdd; // international dialling
  altSpellings: string[];
  maps: CountryMaps;
  demonyms?: Record<string, CountryDemonym>;
  coatOfArms: CountryCoatOfArms;
  car: CountryCar;
  postalCode?: CountryPostalCode;
  gini?: Record<string, number>;
  fifa?: string;
  startOfWeek: string;
  capitalInfo: CountryCapitalInfo;
}

export type GetAllCountriesResponse = CountryListItem[];

export interface GetCountryByCodeParams {
  code: string;
}
export type GetCountryByCodeResponse = CountryDetail[];

export interface SubmitReviewPayload {
  title: string; // reviewer's name or headline
  body: string; // review text
  userId: number; // hardcoded to 1
}

export interface SubmitReviewResponse {
  id: number; // auto-generated — always 101 on this mock API
  title: string;
  body: string;
  userId: number;
}

// ── Local UI type (not from any API) ──────────
// Held in React state after a successful review POST.

export interface LocalReview {
  id: number;
  reviewer: string;
  rating: number; // 1 – 5
  comment: string;
  submittedAt: string; // ISO timestamp
}
