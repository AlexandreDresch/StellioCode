import useAsync from "../use-async";
import * as projectsApi from "../../services/projects-api";

export default function useGetProjectFollowUp({
  userType,
}: {
  userType: "client" | "developer";
}) {
  const {
    data: followUp,
    loading: getFollowUpLoading,
    error: getFollowUpError,
    act: getFollowUp,
  } = useAsync(projectsApi.getProjectFollowUpById, false);

  return {
    followUp,
    getFollowUpLoading,
    getFollowUpError,
    getFollowUp: (
      userId: string,
      projectId: string,
      token?: string
    ) => getFollowUp({ userId, projectId, token, userType }),
  };
}