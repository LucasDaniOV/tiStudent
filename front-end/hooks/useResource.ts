import ResourceService from "@/services/ResourceService";
import { useEffect } from "react";
import useSWR from "swr";

const useResource = (resourceId: string | undefined) => {
  const fetchResource = async (id: string) => {
    try {
      return await ResourceService.getResourceById(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const {
    data: resource,
    error,
    isValidating,
    mutate,
  } = useSWR(resourceId ? `resource-${resourceId}` : null, () => fetchResource(resourceId as string), {
    shouldRetryOnError: false,
  });

  useEffect(() => {
    if (resourceId) {
      mutate();
    }
  }, [resourceId, mutate]);

  return { resource, isLoading: isValidating, error };
};

export default useResource;
