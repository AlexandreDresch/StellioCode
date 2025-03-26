import useAsync from "../use-async";

import * as featuredProjectsApi from "../../services/featured-projects-api";

export default function useCreateFeaturedProject() {
  const {
    data: featuredProject,
    loading: createFeaturedProjectLoading,
    error: createFeaturedProjectError,
    act: addFeaturedProject,
  } = useAsync(featuredProjectsApi.addFeaturedProject, false);

  return {
    featuredProject,
    createFeaturedProjectLoading,
    createFeaturedProjectError,
    addFeaturedProject,
  };
}
