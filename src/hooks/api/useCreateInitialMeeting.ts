import useAsync from "../use-async";

import * as meetingsApi from "../../services/meetings-api";

export default function useCreateInitialMeeting() {
  const {
    data: meeting,
    loading: createInitialMeetingLoading,
    error: createInitialMeetingError,
    act: createInitialMeeting,
  } = useAsync(meetingsApi.createInitialMeeting, false);

  return {
    meeting,
    createInitialMeetingLoading,
    createInitialMeetingError,
    createInitialMeeting,
  };
}
