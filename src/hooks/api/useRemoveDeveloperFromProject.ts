import useAsync from "../use-async";

import * as projectsApi from "../../services/projects-api";

export default function useRemoveDeveloperFromProject() {
  const {
    loading: removeDeveloperFromProjectLoading,
    error: removeDeveloperFromProjectError,
    act: removeDeveloperFromProject,
  } = useAsync(projectsApi.removeDeveloperFromProject, false);

  return {
    removeDeveloperFromProjectLoading,
    removeDeveloperFromProjectError,
    removeDeveloperFromProject,
  };
}
