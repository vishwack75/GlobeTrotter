import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let inMemoryAccessToken: string | null = null;

export const setInMemoryAccessToken = (token: string | null) => {
  inMemoryAccessToken = token;
};

export const getInMemoryAccessToken = () => inMemoryAccessToken;

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers) => {
    if (inMemoryAccessToken) {
      headers.set("Authorization", `Bearer ${inMemoryAccessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    const refreshResult: any = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data && refreshResult.data.accessToken) {
      setInMemoryAccessToken(refreshResult.data.accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      setInMemoryAccessToken(null);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User", "Trip", "City", "Activity", "Budget", "Admin"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.accessToken) {
            setInMemoryAccessToken(data.accessToken);
          }
        } catch {}
      },
      invalidatesTags: ["Auth", "User", "Trip"],
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.accessToken) {
            setInMemoryAccessToken(data.accessToken);
          }
        } catch {}
      },
      invalidatesTags: ["Auth", "User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
          setInMemoryAccessToken(null);
        } catch {
          setInMemoryAccessToken(null);
        }
      },
      invalidatesTags: ["Auth", "User", "Trip", "Admin"],
    }),
    getProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    toggleSaveDestination: builder.mutation({
      query: (cityId) => ({
        url: "/user/saved-destinations/toggle",
        method: "POST",
        body: { cityId },
      }),
      invalidatesTags: ["User", "City"],
    }),
    getTrips: builder.query({
      query: () => "/trips",
      providesTags: ["Trip"],
    }),
    getTripById: builder.query({
      query: (id) => `/trips/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Trip", id }],
    }),
    getPublicTrip: builder.query({
      query: (shareCode) => `/trips/public/${shareCode}`,
    }),
    createTrip: builder.mutation({
      query: (data) => ({
        url: "/trips",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Trip"],
    }),
    updateTrip: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/trips/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Trip", id }, "Trip"],
    }),
    deleteTrip: builder.mutation({
      query: (id) => ({
        url: `/trips/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Trip"],
    }),
    copyTrip: builder.mutation({
      query: (shareCode) => ({
        url: `/trips/copy/${shareCode}`,
        method: "POST",
      }),
      invalidatesTags: ["Trip"],
    }),
    addStop: builder.mutation({
      query: (data) => ({
        url: "/trips/stops",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Trip"],
    }),
    deleteStop: builder.mutation({
      query: (stopId) => ({
        url: `/trips/stops/${stopId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Trip"],
    }),
    getCities: builder.query({
      query: (params) => ({
        url: "/cities/search",
        params,
      }),
      providesTags: ["City"],
    }),
    getCityById: builder.query({
      query: (id) => `/cities/${id}`,
      providesTags: (_result, _error, id) => [{ type: "City", id }],
    }),
    getActivities: builder.query({
      query: (params) => ({
        url: "/activities/search",
        params,
      }),
      providesTags: ["Activity"],
    }),
    addStopActivity: builder.mutation({
      query: (data) => ({
        url: "/activities/stop-activity",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Trip", "Budget"],
    }),
    removeStopActivity: builder.mutation({
      query: (id) => ({
        url: `/activities/stop-activity/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Trip", "Budget"],
    }),
    getTripBudgetSummary: builder.query({
      query: (tripId) => `/budget/${tripId}`,
      providesTags: (_result, _error, tripId) => [{ type: "Budget", id: tripId }],
    }),
    updateBudgetCategories: builder.mutation({
      query: ({ tripId, categories }) => ({
        url: `/budget/${tripId}`,
        method: "PUT",
        body: { categories },
      }),
      invalidatesTags: (_result, _error, { tripId }) => [{ type: "Budget", id: tripId }],
    }),
    getAdminAnalytics: builder.query({
      query: () => "/admin/analytics",
      providesTags: ["Admin"],
    }),
    getAdminUsers: builder.query({
      query: (params) => ({
        url: "/admin/users",
        params,
      }),
      providesTags: ["Admin"],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/admin/users/${userId}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteAdminUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useToggleSaveDestinationMutation,
  useGetTripsQuery,
  useGetTripByIdQuery,
  useGetPublicTripQuery,
  useCreateTripMutation,
  useUpdateTripMutation,
  useDeleteTripMutation,
  useCopyTripMutation,
  useAddStopMutation,
  useDeleteStopMutation,
  useGetCitiesQuery,
  useGetCityByIdQuery,
  useGetActivitiesQuery,
  useAddStopActivityMutation,
  useRemoveStopActivityMutation,
  useGetTripBudgetSummaryQuery,
  useUpdateBudgetCategoriesMutation,
  useGetAdminAnalyticsQuery,
  useGetAdminUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteAdminUserMutation,
} = apiSlice;
