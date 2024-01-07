import ProfileService from "@/services/ProfileService";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const useProfile = (profileId: string | undefined) => {
  const fetchProfile = async () => {
    if (!profileId) {
      return null;
    }

    try {
      const profileResponse = await ProfileService.getProfileById(profileId);

      if (profileResponse.profile) {
        return profileResponse.profile;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data: profile, isLoading } = useSWR(`profile-${profileId}`, fetchProfile);

  useEffect(() => {
    if (profileId) {
      mutate(`profile-${profileId}`, fetchProfile());
    }
  }, [profileId]);

  return { profile, isLoading };
};

export default useProfile;
