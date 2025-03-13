import useAsync from "../use-async";

import * as developersApi from "../../services/developers-api";

export default function useUpdateDeveloper() {
  const {
    loading: updateDeveloperLoading,
    error: updateDeveloperError,
    act: updateDeveloper,
  } = useAsync(developersApi.editDeveloper, false);

  return {
    updateDeveloperLoading,
    updateDeveloperError,
    updateDeveloper,
  };
}
