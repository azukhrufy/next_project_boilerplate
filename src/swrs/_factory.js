import useSWR from "swr";

export const createSWRHook = ({ key, fetcher }) => {
  return (params = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
      [key, params], // Key for caching; includes params to make it dynamic
      () => fetcher(params) // Fetcher function, invoked with params
    );

    return {
      data,
      isLoading,
      isError: !!error,
      mutate,
    };
  };
};
