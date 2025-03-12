import useAsync from "../use-async";
import * as meetingsApi from "../../services/meetings-api";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";

export default function useGetAllDeveloperMeetings() {
  const [meetingPagination, setMeetingPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: meetings,
    loading: getMeetingsLoading,
    error: getMeetingsError,
    act: getAllMeetings,
  } = useAsync(
    (params) =>
      meetingsApi.getAllDeveloperMeetings({
        ...params,
        page: meetingPagination.pageIndex,
        pageSize: meetingPagination.pageSize,
      }),
    false,
  );

  return {
    meetings,
    getMeetingsLoading,
    getMeetingsError,
    getAllMeetings,
    meetingPagination,
    setMeetingPagination,
  };
}
