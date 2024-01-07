import ProfileService from "@/services/ProfileService";
import { Profile } from "@/types";
import { useEffect, useState } from "react";

const useAuthProfile = () => {
  const [profile, setAuthProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAuthProfile = async () => {
    try {
      const loggedInUser = sessionStorage.getItem("loggedInUser");

      if (!loggedInUser) {
        setIsLoading(false);
        return;
      }

      const profileResponse = await ProfileService.getProfileById(JSON.parse(loggedInUser).id);

      if (profileResponse.profile) {
        setAuthProfile(profileResponse.profile);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAuthProfile();
  }, []);

  return { profile, isLoading };
};

export default useAuthProfile;
