import useAsync from "../use-async";

import * as featuredProjectsApi from "../../services/featured-projects-api";

export default function useGetAllFeaturedProjects() {
  const {
    data: featuredProjects,
    loading: getFeaturedProjectsLoading,
    error: getFeaturedProjectsError,
    act: getFeaturedProjects,
  } = useAsync(featuredProjectsApi.getAllFeaturedProjects, false);

  return {
    featuredProjects,
    getFeaturedProjectsLoading,
    getFeaturedProjectsError,
    getFeaturedProjects,
  };
}
