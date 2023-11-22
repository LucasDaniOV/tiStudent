import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import router from "next/router";
import { FormEvent, useState } from "react";

const UserLoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setStatusMessages([]);
  };

  const validate = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("email is required");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("password is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (!validate()) return;
    
    const res = await UserService.loginUser(email, password);
    
    if (res.status === 401) {
      const { errorMessage } = await res.json();
      setStatusMessages([{ message: errorMessage, type: "error" }]);
      return;
    }

    if (res.status !== 200) {
      setStatusMessages([{ message: "An error has occurred. Please try again later.", type: "error" }]);
      return;
    }

    const user = await res.json();
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    setStatusMessages([{ message: "Login successful!", type: "success" }]);
    setTimeout(() => {
      router.push("/");
    }, 2000);
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
        <input id="emailInput" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailError && <div>{emailError}</div>}

        <label htmlFor="passwordInput">Password</label>
        <input id="passwordInput" type="password" onChange={(e) => setPassword(e.target.value)} />
        {passwordError && <div>{passwordError}</div>}

        <button type="submit">Login</button>

      </form>
    </>
  );
};

export default UserLoginForm;
