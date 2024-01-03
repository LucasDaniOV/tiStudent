const PredefinedUsersTable: React.FC = () => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">satoshi@tistudent.com</td>
            <td className="p-2">Str0ngPW!!!</td>
            <td className="p-2">ADMIN</td>
          </tr>
          <tr>
            <td className="p-2">alice@gmail.com</td>
            <td className="p-2">Str0ngPW!!!2</td>
            <td className="p-2">USER</td>
          </tr>
          <tr>
            <td className="p-2">bob@gmail.com</td>
            <td className="p-2">passWord123!$</td>
            <td className="p-2">USER</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PredefinedUsersTable;
