import useAsync from "../use-async";
import * as developersApi from "../../services/developers-api";

export default function useGetApprovedDevelopers() {
  const {
    data: approvedDevelopers,
    loading: getApprovedDevelopersLoading,
    error: getApprovedDevelopersError,
    act: getApprovedDevelopers,
  } = useAsync(developersApi.getApprovedDevelopers, false);

  return {
    approvedDevelopers,
    getApprovedDevelopersLoading,
    getApprovedDevelopersError,
    getApprovedDevelopers,
  };
}
