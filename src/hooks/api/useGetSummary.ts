import useAsync from "../use-async";

import * as summaryApi from "../../services/summary-api";

export default function useGetSummary() {
  const {
    data: summary,
    loading: getSummaryLoading,
    error: getSummaryError,
    act: getSummary,
  } = useAsync(summaryApi.getSummary, false);

  return {
    summary,
    getSummaryLoading,
    getSummaryError,
    getSummary,
  };
}