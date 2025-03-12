import useAsync from "../use-async";

import * as featuredProjectsApi from "../../services/featured-projects-api";

export default function useDeleteFeaturedProject() {
  const {
    loading: deleteFeaturedProjectLoading,
    error: deleteFeaturedProjectError,
    act: deleteFeaturedProject,
  } = useAsync(featuredProjectsApi.deleteFeaturedProject, false);

  return {
    deleteFeaturedProjectLoading,
    deleteFeaturedProjectError,
    deleteFeaturedProject,
  };
}
