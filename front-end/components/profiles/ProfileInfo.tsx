import { Profile } from "@/types";
import { useTranslation } from "next-i18next";
import React from "react";

type Props = {
  profile: Profile;
};

const ProfileInfo: React.FC<Props> = ({ profile }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      {profile && (
        <>
          <div>
            <strong>{t("profiles.fields.id")}</strong>
          </div>
          <div>
            <strong>{t("profiles.fields.username")}:</strong> {profile.username}
          </div>
          <div>
            <strong>{t("profiles.fields.bio")}:</strong> {profile.bio}
          </div>
          <div>
            <strong>{t("profiles.fields.created.at")}:</strong>{" "}
            {String(profile.createdAt).split("T")[0]}
          </div>
          <div>
            <strong>{t("profiles.fields.latest.activity")}:</strong>{" "}
            {String(profile.latestActivity).split("T")[0]}
          </div>
        </>
      )}
    </>
  );
};

export default ProfileInfo;
