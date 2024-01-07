import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import ProfileService from "../../services/ProfileService";
import { Profile } from "../../types";
import Thumbnail from "../resources/Thumbnail";

type Props = {
  profiles: Array<Profile>;
};

const ProfilesOverviewTable: React.FC<Props> = ({ profiles }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const stopPropagationAndPreventDefault = (e: MouseEvent): void => {
    e.stopPropagation();
    e.preventDefault();
  };

  const getProfile = (e: MouseEvent, profileId: number): void => {
    stopPropagationAndPreventDefault(e);
    router.push("/profiles/" + profileId);
  };

  const deleteProfile = async (e: MouseEvent, profile: Profile) => {
    stopPropagationAndPreventDefault(e);
    if (!confirm(`${t("profiles.delete")} ${profile.username}?`)) return;
    await ProfileService.deleteProfileById(parseInt(profile.id));
    router.reload();
  };
  const basic = "border border-t-0 border-b-0 p-4 text-left flex justify-center items-center ";
  return (
    <>
      {profiles && (
        <div className="w-2/3 m-auto">
          <div className="grid grid-cols-7 mb-5 items-center">
            <div className="flex justify-center col-start-2">{t("profiles.fields.id")}</div>
            <div className="flex justify-center">{t("profiles.fields.username")}</div>
            <div className="flex justify-center">{t("profiles.fields.bio")}</div>
            <div className="flex justify-center">{t("resources.info.member")}</div>
            <div className="flex justify-center">{t("profiles.fields.latest.activity")}</div>
          </div>
          {profiles.map((profile, index) => (
            <div
              className="border mb-5 bg-tistudent-blue rounded-lg h-40 hover:text-white hover:bg-blue-500 hover:rounded-lg grid grid-cols-7"
              key={index}
              onClick={(e) => getProfile(e, parseInt(profile.id))}
            >
              <div className="w-24 h-24 m-auto border">
                <Thumbnail filePath={profile.picture} />
              </div>
              <div className={basic}>{profile.id}</div>
              <div className={basic + (profile.username.replace(" ", "").length > 15 && " break-all")}>
                {profile.username}
              </div>
              <div
                className={
                  basic + (profile.bio && profile.bio.length > 60 && "overflow-hidden overflow-ellipsis break-all")
                }
              >
                {profile.bio}
              </div>
              <div className={basic}>{String(profile.createdAt).split("T")[0]}</div>
              {/** More understandable */}
              <div className={basic}>{String(profile.latestActivity).split("T")[0]}</div>
              <div
                className="hover:bg-red-600 hover:rounded-se-lg hover:rounded-ee-lg items-center flex justify-center border border-t-0 border-b-0 rounded-e-lg"
                onClick={(e) => deleteProfile(e, profile)}
              >
                {t("delete")}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProfilesOverviewTable;
