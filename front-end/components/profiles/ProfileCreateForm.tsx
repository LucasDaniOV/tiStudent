import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const ProfileCreateForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [userId, setUserId] = useState("");

    const [usernameError, setUsernameError] = useState<string>("");
    const [bioError, setBioError] = useState<string>("");
    const [userIdError, setUserIdError] = useState<string>("");
    
    const clearErrors = () => {
        setUsernameError("");
        setBioError("");
        setUserIdError("");
    };

    const validate = () => {
        if (!!username.trim()) {
            setUsernameError("username is required");
            return false;
        }
        if (username.length > 30) {
            setUsernameError("username cannot be longer than 30 characters");
            return false;
        }
        if (bio.trim() && bio.length > 200) {
            setBioError("bio cannot be longer than 200 characters");
            return false;
        }
        if (!!userId.trim()) {
            setUserIdError("user id is required");
            return false;
        }
    };

    const createProfile = async () => {};

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();
        if (!validate) return;
        createProfile();
    };

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="usernameInput">Username:</label>
                <label htmlFor="bioInput">Bio:</label>
                <label htmlFor="userIdInput">User ID:</label>

                <input id="usernameInput" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input id="bioInput" type="text" value={bio} onChange={(e) => setBio(e.target.value)}/>
                <input id="userIdInput" type="number" value={userId} onChange={(e) => setUserId(e.target.value)}/>
                
                {usernameError && (<div>{usernameError}</div>)}
                {bioError && (<div>{bioError}</div>)}
                {userIdError && (<div>{userIdError}</div>)}
                
                <button type="submit">Create profile</button>
            </form>
        </>
    );
}

export default ProfileCreateForm;
