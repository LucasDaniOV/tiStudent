import React from "react";
import { User } from "@/types";

type Props = {
  user: User;
};

const UserInfo: React.FC<Props> = ({ user }: Props) => {
  return (
    <>
      {user && (
        <div role="userInfo">
          <p>{user.id}</p>
          <p>{user.email}</p>
          <p>{user.password}</p>
        </div>
      )}
    </>
  );
};

export default UserInfo;
