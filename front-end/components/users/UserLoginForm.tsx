import ProfileService from "@/services/ProfileService";
import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import { FormEvent, useState } from "react";

const UserLoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (!validate()) return;
    const profile = await ProfileService.getProfileByEmail(email);
    const profileResponse = JSON.stringify(profile);
    if (
      profileResponse ===
      `{"status":"error","errorMessage":"No user with email ${email} found"}`
    ) {
      setStatusMessages([{ message: "Invalid email", type: "error" }]);
    } else {
      if (password === profile.user.password) {
        sessionStorage.setItem("loggedInProfile", profileResponse);
        setStatusMessages([{ message: `Welcome, ${email}`, type: "success" }]);
      } else {
        setStatusMessages([{ message: "Invalid password", type: "error" }]);
      }
    }
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
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {emailError && <div>{emailError}</div>}
        {passwordError && <div>{passwordError}</div>}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default UserLoginForm;
