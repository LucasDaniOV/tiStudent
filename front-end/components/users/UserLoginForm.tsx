import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import { FormEvent, useState } from "react";

const UserLoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setEmailError("");
    setStatusMessages([]);
  };

  const validate = () => {
    let isValid = true;
    if (!email.trim()) {
      setEmailError("email is required");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (!validate()) return;
    const user = await UserService.getUserByEmail(email);
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    setStatusMessages([{ message: `Welcome, ${email}`, type: "success" }]);
  };

  return (
    <>
      {statusMessages && (
        <ul>
          {statusMessages.map(({ message, type }, i) => (
            <li key={i} className={type}>
              {message}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="emailInput">Email</label>
        <br />
        <input
          id="emailInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        {emailError && <div>{emailError}</div>}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default UserLoginForm;
