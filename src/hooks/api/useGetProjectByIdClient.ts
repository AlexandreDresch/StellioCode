import useAsync from "../use-async";
import * as projectsApi from "../../services/projects-api";

export default function useGetProjectByIdClient() {
  const {
    data: project,
    loading: getProjectLoading,
    error: getProjectError,
    act: getProjectByIdClient,
  } = useAsync(projectsApi.getProjectByIdClient, false);

  return {
    project,
    getProjectLoading,
    getProjectError,
    getProjectByIdClient,
  };
}
