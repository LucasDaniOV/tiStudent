import { useRouter } from "next/router";
import React from "react";
import { User } from "../../types";

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
              <th scope="col">Id</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                onClick={() => {
                  router.push("/users/" + user.id);
                }}
              >
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Are you sure you want to delete ${user.id}?`)) router.push("/users/delete/" + user.id);
                  }}
                >
                  delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UsersOverviewTable;
