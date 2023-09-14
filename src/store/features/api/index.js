import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
	baseQuery: fakeBaseQuery(),
	keepUnusedDataFor: 3600,
	reducerPath: 'baseApi',
	tagTypes: ['Test'],
	endpoints: () => ({}),
});

export default baseApi;
