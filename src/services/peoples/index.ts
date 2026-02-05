import { createApi } from '@reduxjs/toolkit/query/react';

import { addPeople, appendPeoples } from 'store/people';

import baseQueryWithErrorHandler from 'services/apiHandler';
import { PeopleListResponse } from 'services/peoples/types';

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  // Api Custome handler added with common error handling
  baseQuery: baseQueryWithErrorHandler as any,
  endpoints: builder => ({
    getPeople: builder.query<PeopleListResponse, { page?: number }>({
      query: ({ page }) => ({
        url: `people/?page=${page}`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data && data.results) {
            dispatch(appendPeoples(data.results));
          }
        } catch (e) {
          console.log('get people server error', e);
        }
      },
    }),
    addPeople: builder.mutation({
      query: people => ({
        url: `people/add`,
        method: 'POST',
        body: people,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data && data.results) {
            dispatch(addPeople(data.results));
          }
        } catch (e) {
          console.log('add people server error', e);
          dispatch(addPeople(arg));
        }
      },
    }),
  }),
});

export const { useLazyGetPeopleQuery, useAddPeopleMutation } = peopleApi;
