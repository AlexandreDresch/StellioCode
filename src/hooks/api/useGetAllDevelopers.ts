import useAsync from "../use-async";
import * as developersApi from "../../services/developers-api";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";

export default function useGetAllDevelopers() {
  const [devPagination, setDevPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: developers,
    loading: getDevelopersLoading,
    error: getDevelopersError,
    act: getAllDevelopers,
  } = useAsync((params) =>
    developersApi.getAllDevelopers({
      ...params,
      page: devPagination.pageIndex,
      pageSize: devPagination.pageSize,
    }),
    false
  );

  return {
    developers,
    getDevelopersLoading,
    getDevelopersError,
    getAllDevelopers,
    devPagination,
    setDevPagination,
  };
}
