import useAsync from "../use-async";
import * as projectApi from "../../services/projects-api";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";

export default function useGetAllProjectsAdmin() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: projects,
    loading: getProjectsLoading,
    error: getProjectsError,
    act: getAllProjectsAdmin,
  } = useAsync(
    (params) =>
      projectApi.getAllProjectsAdmin({
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
    getAllProjectsAdmin,
    pagination,
    setPagination,
  };
}
