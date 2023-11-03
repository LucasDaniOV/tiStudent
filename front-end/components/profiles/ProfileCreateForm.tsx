import ProfileService from "@/services/ProfileService";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const ProfileCreateForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [userId, setUserId] = useState("");

    const createProfile = async () => {
        const res = await ProfileService.createProfile(username, bio, userId);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        createProfile();
    };

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                
                <label htmlFor="usernameInput">Username:</label>
                <br />
                <input id="usernameInput" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <br />

                <label htmlFor="bioInput">Bio:</label>
                <br />
                <input id="bioInput" type="text" value={bio} onChange={(e) => setBio(e.target.value)}/>
                <br />

                <label htmlFor="userIdInput">User ID:</label>
                <br />
                <input id="userIdInput" type="number" value={userId} onChange={(e) => setUserId(e.target.value)}/>
                <br />

                <button type="submit">Create profile</button>

            </form>
        </>
    );
}

export default ProfileCreateForm;
