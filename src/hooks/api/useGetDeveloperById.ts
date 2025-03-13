import useAsync from "../use-async";

import * as developersApi from "../../services/developers-api";

export default function useGetDeveloperById() {
  const {
    data: developer,
    loading: getDeveloperLoading,
    error: getDeveloperError,
    act: getDeveloperById,
  } = useAsync(developersApi.getDeveloperById, false);

  return {
    developer,
    getDeveloperLoading,
    getDeveloperError,
    getDeveloperById,
  };
}
