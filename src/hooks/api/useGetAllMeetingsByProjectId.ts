import useAsync from "../use-async";
import * as meetingsApi from "../../services/meetings-api";

export default function useGetAllMeetingsByProjectId({
  userType,
}: {
  userType: "client" | "developer";
}) {
  const {
    data: meetings,
    loading: getMeetingsLoading,
    error: getMeetingsError,
    act: getMeetingsById,
  } = useAsync(meetingsApi.getAllMeetingsByProjectId, false);

  return {
    meetings,
    getMeetingsLoading,
    getMeetingsError,
    getMeetingsById: (userId: string, projectId: string, token?: string) =>
      getMeetingsById({ userId, projectId, token, userType }),
  };
}
