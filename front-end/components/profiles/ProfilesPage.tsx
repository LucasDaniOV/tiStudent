import LeaderBoard from "@/components/profiles/LeaderBoard";
import ProfilesOverviewTable from "@/components/profiles/ProfilesOverviewTable";
import { useTranslation } from "next-i18next";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import ProfileService from "../../services/ProfileService";

const ProfilesPage: React.FC = () => {
  const { t } = useTranslation();
  const getProfiles = async () => {
    const response = await ProfileService.getAllProfiles();
    return response.profiles;
  };

  const getTopTen = async () => {
    const response = await ProfileService.getLeaderboard();
    return response.profiles;
  };

  const { data: profilesData, isLoading: profilesLoading, error: profilesError } = useSWR("profiles", getProfiles);
  const { data: topTenData, isLoading: topTenLoading, error: topTenError } = useSWR("topTen", getTopTen);

  useInterval(() => {
    mutate("profiles", getProfiles());
    mutate("topTen", getTopTen());
  }, 5000);
  return (
    <>
      <h1 className="text-3xl">{t("profiles.index.title")}</h1>
      <section>
        {profilesError && <div>{profilesError}</div>}
        {topTenError && <div>{topTenError}</div>}
        {topTenLoading && <div>{t("loading")}</div>}
        {profilesLoading && <div>{t("loading")}</div>}
        <div className="m-12">{topTenData && <LeaderBoard profiles={topTenData} />}</div>
        {profilesData && <ProfilesOverviewTable profiles={profilesData} />}
      </section>
    </>
  );
};
export default ProfilesPage;
