import useAsync from "../use-async";

import * as meetingsApi from "../../services/meetings-api";

export default function useUpdateMeetingDate() {
  const {
    data: updatedMeetingDate,
    loading: updateMeetingDateLoading,
    error: updateMeetingDateError,
    act: updateMeetingDate,
  } = useAsync(meetingsApi.updateMeetingDate, false);

  return {
    updatedMeetingDate,
    updateMeetingDateLoading,
    updateMeetingDateError,
    updateMeetingDate,
  };
}
