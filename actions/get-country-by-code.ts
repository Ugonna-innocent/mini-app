import { getRequest } from "@/lib/requests-handlers";
import { restCountriesApi } from "@/lib/request-client";
import { GetCountryByCodeResponse } from "@/types/country";

type Payload = {
  code: string;
};

export const getCountryByCode = async ({ code }: Payload) => {
  const url = `/alpha/${code}`;

  const response = await getRequest<GetCountryByCodeResponse>({
    api: restCountriesApi,
    url,
    successCondition: (data) => data.length > 0,
  });

  return response.data;
};
