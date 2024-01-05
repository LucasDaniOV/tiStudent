import ProfileService from "@/services/ProfileService";
import { StatusMessage } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import PredefinedUsersTable from "../PredefinedUsersTable";

const ProfileLoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const { t } = useTranslation();
  const router = useRouter();
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setStatusMessages([]);
  };

  const validate = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError(t("login.profile.form.error.email"));
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError(t("login.profile.form.error.password.exists"));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (!validate()) return;

    const res = await ProfileService.loginUser(email, password);

    if (res.status === 401) {
      const { errorMessage } = await res.json();
      setStatusMessages([{ message: errorMessage, type: "error" }]);
      return;
    }

    if (res.status !== 200) {
      setStatusMessages([
        {
          message: t("login.error"),
          type: "error",
        },
      ]);
      return;
    }

    const user = await res.json();
    sessionStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        token: user.token,
        id: user.id,
        email: user.email,
        role: user.role,
      })
    );
    setStatusMessages([{ message: t("login.succes"), type: "success" }]);
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
          {t("login.profile.form.email")}
        </label>
        <input id="emailInput" type="email" value={email} className="mb-1" onChange={(e) => setEmail(e.target.value)} />
        {emailError && <div>{emailError}</div>}

        <label htmlFor="passwordInput" className="mb-1">
          {t("login.profile.form.password")}
        </label>
        <input id="passwordInput" type="password" className="mb-1" onChange={(e) => setPassword(e.target.value)} />
        {passwordError && <div>{passwordError}</div>}

        <button type="submit" className="bg-gray-500 m-5 hover:bg-gray-300 hover:text-black">
          {t("login.enter")}
        </button>
      </form>
    </>
  );
};

export default ProfileLoginForm;
