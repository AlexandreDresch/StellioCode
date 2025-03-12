import useAsync from "../use-async";

import * as developersApi from "../../services/developers-api";

export default function useDeleteDeveloper() {
  const {
    loading: deleteDeveloperLoading,
    error: deleteDeveloperError,
    act: deleteDeveloper,
  } = useAsync(developersApi.deleteDeveloper, false);

  return {
    deleteDeveloperLoading,
    deleteDeveloperError,
    deleteDeveloper,
  };
}
