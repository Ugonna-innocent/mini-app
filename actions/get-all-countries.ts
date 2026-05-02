import { getRequest } from "@/lib/http";
import { restCountriesApi } from "@/lib/request-client";
import { GetAllCountriesResponse } from "@/types/country";

const LIST_FIELDS = [
  "name",
  "cca2",
  "cca3",
  "capital",
  "region",
  "subregion",
  "population",
  "flags",
  "languages",
  "currencies",
].join(",");

export const getCountries = async () => {
  const api = await restCountriesApi();
  const url = "/all";

  const response = await getRequest<GetAllCountriesResponse>({
    api,
    url,
    params: { fields: LIST_FIELDS },
  });

  return response.data;
};
