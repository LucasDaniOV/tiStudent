import ProfileService from "@/services/ProfileService";
import { Profile } from "@/types";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { useTranslation } from "next-i18next";

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

  return (
    <>
      {profiles && (
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th scope="col" className="border p-4 text-left">
                {t("profiles.fields.id")}
              </th>
              <th scope="col" className="border p-4 text-left">
                {t("profiles.fields.username")}
              </th>
              <th scope="col" className="border p-4 text-left">
                {t("profiles.fields.bio")}
              </th>
              <th scope="col" className="border p-4 text-left">
                {t("profiles.fields.created.at")}
              </th>
              <th scope="col" className="border p-4 text-left">
                {t("profiles.fields.latest.activity")}
              </th>
              <th scope="col" className="border p-4 text-left">
                {t("profiles.fields.user.id")}
              </th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile, index) => (
              <tr
                className="hover:text-white hover:bg-gray-600"
                key={index}
                onClick={(e) => getProfile(e, parseInt(profile.id))}
              >
                <td className="border p-4 text-left">{profile.id}</td>
                <td className="border p-4 text-left">{profile.username}</td>
                <td className="border p-4 text-left">{profile.bio}</td>
                <td className="border p-4 text-left">
                  {String(profile.createdAt)}
                </td>
                <td className="border p-4 text-left">
                  {String(profile.latestActivity)}
                </td>
                <td
                  className="border p-4 text-left"
                  onClick={(e) => deleteProfile(e, profile)}
                >
                  {t("delete")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ProfilesOverviewTable;
