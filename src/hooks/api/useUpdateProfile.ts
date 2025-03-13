import useAsync from "../use-async";

import * as developersApi from "../../services/developers-api";

export default function useUpdateProfile() {
  const {
    loading: updateProfileLoading,
    error: updateProfileError,
    act: updateProfile,
  } = useAsync(developersApi.editProfile, false);

  return {
    updateProfileLoading,
    updateProfileError,
    updateProfile,
  };
}
