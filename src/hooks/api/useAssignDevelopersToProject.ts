import useAsync from "../use-async";

import * as projectsApi from "../../services/projects-api";

export default function useAssignDevelopersToProject() {
  const {
    loading: assignDevelopersToProjectLoading,
    error: assignDevelopersToProjectError,
    act: assignDevelopersToProject,
  } = useAsync(projectsApi.assignDevelopersToProject, false);

  return {
    assignDevelopersToProjectLoading,
    assignDevelopersToProjectError,
    assignDevelopersToProject,
  };
}
