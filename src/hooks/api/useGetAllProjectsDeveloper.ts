import useAsync from "../use-async";
import * as projectApi from "../../services/projects-api";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";

export default function useGetAllProjectsDeveloper() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: projects,
    loading: getProjectsLoading,
    error: getProjectsError,
    act: getAllProjectsDeveloper,
  } = useAsync(
    (params) =>
      projectApi.getAllProjectsDeveloper({
        ...params,
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }),
    false,
  );

  return {
    projects,
    getProjectsLoading,
    getProjectsError,
    getAllProjectsDeveloper,
    pagination,
    setPagination,
  };
}
