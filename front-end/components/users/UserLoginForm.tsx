import ProfileService from "@/services/ProfileService";
import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const UserLoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const router = useRouter();
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
      console.log(res);

      setStatusMessages([
        {
          message: "An error has occurred. Please try again later.",
          type: "error",
        },
      ]);
      return;
    }

    const user = await res.json();
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    setStatusMessages([
      { message: "Login successful! Redirecting...", type: "success" },
    ]);
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

      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="emailInput" className="mb-1">
          Email
        </label>
        <input
          id="emailInput"
          type="email"
          value={email}
          className="mb-1"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div>{emailError}</div>}

        <label htmlFor="passwordInput" className="mb-1">
          Password
        </label>
        <input
          id="passwordInput"
          type="password"
          className="mb-1"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div>{passwordError}</div>}

        <button
          type="submit"
          className="bg-gray-500 m-5 hover:bg-gray-300 hover:text-black"
        >
          Enter
        </button>
      </form>
    </>
  );
};

export default UserLoginForm;
