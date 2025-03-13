import useAsync from "../use-async";

import * as developersApi from "../../services/developers-api";

export default function useGetProfileData() {
  const {
    data: data,
    loading: getProfileDataLoading,
    error: getProfileDataError,
    act: getProfileDataById,
  } = useAsync(developersApi.getProfileData, false);

  return {
    data,
    getProfileDataLoading,
    getProfileDataError,
    getProfileDataById,
  };
}
