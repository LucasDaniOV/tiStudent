import ProfileService from "@/services/ProfileService";
import { StatusMessage } from "@/types";
import { getToken } from "@/util/token";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const ProfileCreateForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [bioError, setBioError] = useState<string>("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const { t } = useTranslation();
  const clearErrors = () => {
    setUsernameError("");
    setBioError("");
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
    if (!username.trim()) {
      setUsernameError(t("login.profile.form.error.username"));
      isValid = false;
    }
    if (username.length > 30) {
      setUsernameError(t("login.profile.form.error.username.length"));
      isValid = false;
    }
    if (bio.trim() && bio.length > 200) {
      setBioError(t("login.profile.form.error.bio"));
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError(t("login.profile.form.error.password.exists"));
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError(t("login.profile.form.error.password.length"));
      isValid = false;
    } else if (!password.match(/\d/)) {
      setPasswordError(t("login.profile.form.error.password.number"));
      isValid = false;
    } else if (!password.match(/[A-Z]/)) {
      setPasswordError(t("login.profile.form.error.password.capital"));
      isValid = false;
    } else if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      setPasswordError(t("login.profile.form.error.password.special"));
      isValid = false;
    }
    return isValid;
  };

  const createProfile = async () => {
    const existingProfile = JSON.stringify(
      await ProfileService.getProfileByEmail(email)
    );
    if (existingProfile) throw new Error("Email already linked to profile");
    const res = await ProfileService.createProfile(
      email,
      password,
      "user",
      username,
      bio
    );
    const profileObject = await ProfileService.getProfileByEmail(email);
    const profile = JSON.stringify(profileObject);
    sessionStorage.setItem("loggedInProfile", profile);
    const message = res.message;
    const type = res.status;
    setStatusMessages([{ message, type }]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (!validate()) return;
    await createProfile();
  };

  return (
    <>
      {statusMessages && (
        <ul>
          {statusMessages.map((statusMessage, index) => (
            <li key={index}>{statusMessage.message}</li>
          ))}
        </ul>
      )}
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <label className="mb-4" htmlFor="usernameInput">
          {t("login.profile.form.username")}:
        </label>
        <br />
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && <div>{usernameError}</div>}
        <br />

        <label className="mb-4" htmlFor="bioInput">
          {t("login.profile.form.bio")}:
        </label>
        <br />
        <input
          id="bioInput"
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        {bioError && <div>{bioError}</div>}
        <br />

        <label className="mb-4" htmlFor="emailInput">
          {t("login.profile.form.email")}:
        </label>
        <br />
        <input
          id="emailInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        {emailError && <div>{emailError}</div>}

        <label className="mb-4" htmlFor="passwordInput">
          {t("login.profile.form.password")}:
        </label>
        <br />
        <input
          id="passwordInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {passwordError && <div>{passwordError}</div>}
        <button
          type="submit"
          className="bg-gray-500 hover:bg-gray-300 hover:text-black m-10"
        >
          {t("login.enter")}
        </button>
      </form>
    </>
  );
};

export default ProfileCreateForm;
