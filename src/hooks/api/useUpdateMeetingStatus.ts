import useAsync from "../use-async";

import * as meetingsApi from "../../services/meetings-api";

export default function useUpdateMeetingStatus() {
  const {
    data: updatedMeeting,
    loading: updateMeetingLoading,
    error: updateMeetingError,
    act: updateMeetingStatus,
  } = useAsync(meetingsApi.updateMeetingStatus, false);

  return {
    updatedMeeting,
    updateMeetingLoading,
    updateMeetingError,
    updateMeetingStatus,
  };
}