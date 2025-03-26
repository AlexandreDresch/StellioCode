import useAsync from "../use-async";
import * as projectsApi from "../../services/projects-api";

export default function useGetProjectByIdAdmin() {
  const {
    data: project,
    loading: getProjectLoading,
    error: getProjectError,
    act: getProjectByIdAdmin,
  } = useAsync(projectsApi.getProjectByIdAdmin, false);

  return {
    project,
    getProjectLoading,
    getProjectError,
    getProjectByIdAdmin,
  };
}
