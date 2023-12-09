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
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th scope="col" className="border p-8 text-left">
                Id
              </th>
              <th scope="col" className="border p-8 text-left">
                Email
              </th>
              <th scope="col" className="border p-8 text-left">
                Password
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                className="hover:text-gray-50 hover:bg-gray-600 "
                key={index}
                onClick={() => {
                  router.push("/users/" + user.id);
                }}
              >
                <td className="border p-8">{user.id}</td>
                <td className="border p-8">{user.email}</td>
                <td className="border p-8">{user.password}</td>
                <td
                  className="border p-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Are you sure you want to delete ${user.id}?`))
                      router.push("/users/delete/" + user.id);
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
