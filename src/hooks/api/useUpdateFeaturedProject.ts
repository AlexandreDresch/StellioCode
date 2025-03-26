import useAsync from "../use-async";

import * as featuredProjectsApi from "../../services/featured-projects-api";

export default function useUpdateFeaturedProject() {
  const {
    data: updatedFeaturedProject,
    loading: updateFeaturedProjectLoading,
    error: updateFeaturedProjectError,
    act: updateFeaturedProject,
  } = useAsync(featuredProjectsApi.editFeaturedProject, false);

  return {
    updatedFeaturedProject,
    updateFeaturedProjectLoading,
    updateFeaturedProjectError,
    updateFeaturedProject,
  };
}
