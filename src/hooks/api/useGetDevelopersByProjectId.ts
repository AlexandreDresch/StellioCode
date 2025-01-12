import useAsync from "../use-async";

import * as developersApi from "../../services/developers-api";

export default function useGetDevelopersByProjectId() {
  const {
    data: developers,
    loading: getDevelopersLoading,
    error: getDevelopersError,
    act: getDevelopersByUserId,
  } = useAsync(developersApi.getDevelopersByProjectId, false);

  return {
    developers,
    getDevelopersLoading,
    getDevelopersError,
    getDevelopersByUserId,
  };
}
