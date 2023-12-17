import React from "react";
import { User } from "@/types";
import { useTranslation } from "next-i18next";

type Props = {
  user: User;
};

const UserInfo: React.FC<Props> = ({ user }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      {user && (
        <div role="userInfo" className="w-auto">
          <p className="flex justify-between p-1">
            <span className="m-0 p-1">{t("users.fields.id")}:</span>{" "}
            <span className="p-1">{user.id}</span>
          </p>
          <p className="flex justify-between p-1">
            <span className="p-1">{t("users.fields.email")}:</span>{" "}
            <span className="p-1">{user.email}</span>
          </p>
          <p className="flex justify-between p-1">
            <span className="p-1">{t("users.fields.password")}:</span>{" "}
            <span className="p-1">{user.password}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default UserInfo;
