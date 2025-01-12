import useAsync from "../use-async";

import * as developersApi from "../../services/developers-api";

export default function useGetPostsByUserId() {
  const {
    data: posts,
    loading: getPostsLoading,
    error: getPostsError,
    act: getPostsByUserId,
  } = useAsync(developersApi.getDevelopersByProjectId, false);

  return {
    posts,
    getPostsLoading,
    getPostsError,
    getPostsByUserId,
  };
}
