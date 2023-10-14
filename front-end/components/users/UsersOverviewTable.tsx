import React from "react";
import { User } from "../../types";
import { useRouter } from "next/router";
import UserService from "@/services/UserService";

type Props = {
  users: Array<User>;
};

const UsersOverviewTable: React.FC<Props> = ({ users }: Props) => {
  const router = useRouter();
  return (
    <>
      {users && (
        <table>
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                onDoubleClick={() => {
                  UserService.deleteUserById(String(user.id));
                  router.push("/users");
                }}
                onClick={() => {
                  router.push("/users/" + user.id);
                }}
              >
                <td>{user._email}</td>
                <td>{user._password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UsersOverviewTable;
