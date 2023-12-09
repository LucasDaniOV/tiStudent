import React from "react";
import { User } from "@/types";

type Props = {
  user: User;
};

const UserInfo: React.FC<Props> = ({ user }: Props) => {
  return (
    <>
      {user && (
        <div role="userInfo" className="w-auto">
          <p className="flex justify-between p-1">
            <span className="m-0 p-1">ID:</span>{" "}
            <span className="p-1">{user.id}</span>
          </p>
          <p className="flex justify-between p-1">
            <span className="p-1">E-mail:</span>{" "}
            <span className="p-1">{user.email}</span>
          </p>
          <p className="flex justify-between p-1">
            <span className="p-1">Password:</span>{" "}
            <span className="p-1">{user.password}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default UserInfo;
