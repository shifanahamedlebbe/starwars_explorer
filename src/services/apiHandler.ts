import { BaseQueryApi, fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react';

import { SWAPI_BASE } from 'services/urlDocs';
import handleApiError from 'services/handleApiError';

type ExtraOptions = Record<string, unknown>;

const baseQuery = fetchBaseQuery({
  baseUrl: SWAPI_BASE,
});

const baseQueryWithErrorHandler = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: ExtraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    console.log(result.error, 'result.error error');
    let message = (result.error.data as { detail: string })?.detail || '';
    const errPayload = handleApiError({ status: result.error.status as number, data: { message } });
    return { error: errPayload };
  }
  return result;
};

export default baseQueryWithErrorHandler;
