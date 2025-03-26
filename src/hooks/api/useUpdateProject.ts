import useAsync from "../use-async";

import * as projectsApi from "../../services/projects-api";

export default function useUpdateProject() {
  const {
    loading: updateProjectLoading,
    error: updateProjectError,
    act: updateProject,
  } = useAsync(projectsApi.editProject, false);

  return {
    updateProjectLoading,
    updateProjectError,
    updateProject,
  };
}
