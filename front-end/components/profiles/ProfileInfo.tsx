import { Profile } from "@/types";
import React from "react";
import { useTranslation } from "next-i18next";

type Props = {
  profile: Profile;
};

const ProfileInfo: React.FC<Props> = ({ profile }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      {profile && (
        <table role="profileInfo">
          <tr>
            <td>
              <strong>{t("profiles.fields.id")}</strong>
            </td>
            <td>{profile.id}</td>
          </tr>
          <tr>
            <td>
              <strong>{t("profiles.fields.username")}</strong>
            </td>
            <td>{profile.username}</td>
          </tr>
          <tr>
            <td>
              <strong>{t("profiles.fields.bio")}</strong>
            </td>
            <td>{profile.bio}</td>
          </tr>
          <tr>
            <td>
              <strong>{t("profiles.fields.created.at")}</strong>
            </td>
            <td>{String(profile.createdAt)}</td>
          </tr>
          <tr>
            <td>
              <strong>{t("profiles.fields.latest.activity")}</strong>
            </td>
            <td>{String(profile.latestActivity)}</td>
          </tr>
        </table>
      )}
    </>
  );
};

export default ProfileInfo;
