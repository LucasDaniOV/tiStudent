import ProfileService from "@/services/ProfileService";
import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import { getToken } from "@/util/token";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const ProfileCreateForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [bioError, setBioError] = useState<string>("");
  const [userIdError, setUserIdError] = useState<string>("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const router = useRouter();

  const clearErrors = () => {
    setUsernameError("");
    setBioError("");
    setUserIdError("");
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
    if (!username.trim()) {
      setUsernameError("username is required");
      isValid = false;
    }
    if (username.length > 30) {
      setUsernameError("username cannot be longer than 30 characters");
      isValid = false;
    }
    if (bio.trim() && bio.length > 200) {
      setBioError("bio cannot be longer than 200 characters");
      isValid = false;
    }
    return isValid;
  };

  const createProfile = async (email: string) => {
    const token = getToken();
    const user = JSON.stringify(await UserService.getUserByEmail(email, token)); // kan ni me token
    console.log(user);
    const userObject = JSON.parse(user);

    const res = await ProfileService.createProfile(
      username,
      bio,
      parseInt(userObject.id)
    );
    const profileObject = await ProfileService.getProfileByEmail(email, token); // kan ni me token
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
    const token = getToken();
    await UserService.createUser(email, password, token); // kan ni me token
    await createProfile(email);
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
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="usernameInput">Username:</label>
        <br />
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        <label htmlFor="bioInput">Bio:</label>
        <br />
        <input
          id="bioInput"
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <br />

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

        <label htmlFor="passwordInput">Password</label>
        <br />
        <input
          id="passwordInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {passwordError && <div>{passwordError}</div>}
        {usernameError && <div>{usernameError}</div>}
        {bioError && <div>{bioError}</div>}
        {userIdError && <div>{userIdError}</div>}

        <button
          type="submit"
          className="bg-gray-500 hover:bg-gray-300 hover:text-black m-10"
        >
          Create profile
        </button>
      </form>
    </>
  );
};

export default ProfileCreateForm;
