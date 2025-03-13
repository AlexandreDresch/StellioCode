import useAsync from "../use-async";
import * as projectsApi from "../../services/projects-api";

export default function useGetProjectById({
  userType,
}: {
  userType: "client" | "developer";
}) {
  const {
    data: project,
    loading: getProjectLoading,
    error: getProjectError,
    act: getProjectById,
  } = useAsync(projectsApi.getProjectById, false);

  return {
    project,
    getProjectLoading,
    getProjectError,
    getProjectById: (userId: string, projectId: string, token?: string) =>
      getProjectById({ userId, projectId, token, userType }),
  };
}
