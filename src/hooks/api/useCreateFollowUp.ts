import useAsync from "../use-async";

import * as projectsApi from "../../services/projects-api";

export default function useCreateFollowUp() {
  const {
    data: followUp,
    loading: createFollowUpLoading,
    error: createFollowUpError,
    act: addFollowUp,
  } = useAsync(projectsApi.addFollowUp, false);

  return {
    followUp,
    createFollowUpLoading,
    createFollowUpError,
    addFollowUp,
  };
}
