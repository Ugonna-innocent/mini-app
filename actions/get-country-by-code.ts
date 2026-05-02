import { getRequest } from "@/lib/http";
import { restCountriesApi } from "@/lib/request-client";
import { GetCountryByCodeResponse } from "@/types/country";

type Payload = {
  code: string;
};

export const getCountryByCode = async ({ code }: Payload) => {
  const api = await restCountriesApi();
  const url = `/alpha/${code}`;

  const response = await getRequest<GetCountryByCodeResponse>({
    api,
    url,
  });

  return response.data;
};
