import ProfileService from "@/services/ProfileService";
import { StatusMessage } from "@/types";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const ProfileCreateForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [userId, setUserId] = useState("");
    const [usernameError, setUsernameError] = useState<string>("");
    const [bioError, setBioError] = useState<string>("");
    const [userIdError, setUserIdError] = useState<string>("");
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const clearErrors = () => {
        setUsernameError("");
        setBioError("");
        setUserIdError("");
        setStatusMessages([]);
    };

    const validate = () => {
        let isValid = true;
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
        if (!userId.trim()) {
            setUserIdError("user id is required");
            isValid = false;
        }
        return isValid;
    };

    const createProfile = async () => {
        const res = await ProfileService.createProfile(username, bio, userId);
        const message = res.message;
        const type = res.status;
        setStatusMessages([{ message, type }]);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();
        if (!validate()) return;
        createProfile();
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
                
                <label htmlFor="usernameInput">Username:</label><br />
                <input id="usernameInput" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/><br />

                <label htmlFor="bioInput">Bio:</label><br />
                <input id="bioInput" type="text" value={bio} onChange={(e) => setBio(e.target.value)}/><br />

                <label htmlFor="userIdInput">User ID:</label><br />
                <input id="userIdInput" type="number" value={userId} onChange={(e) => setUserId(e.target.value)}/><br />

                {usernameError && (<div>{usernameError}</div>)}
                {bioError && (<div>{bioError}</div>)}
                {userIdError && (<div>{userIdError}</div>)}

                <button type="submit">Create profile</button>

            </form>
        </>
    );
}

export default ProfileCreateForm;
