import { Profile } from "@/types";
import React from "react";

type Props = {
    profile: Profile;
};

const ProfileInfo: React.FC<Props> = ({ profile }: Props) => {
    return (
        <>
            {profile && (
                <table>
                    <tr>
                        <td><strong>id</strong></td>
                        <td>{profile.id}</td>
                    </tr>
                    <tr>
                        <td><strong>username</strong></td>
                        <td>{profile.username}</td>
                    </tr>
                    <tr>
                        <td><strong>bio</strong></td>
                        <td>{profile.bio}</td>
                    </tr>
                    <tr>
                        <td><strong>createdAt</strong></td>
                        <td>{String(profile.createdAt)}</td>
                    </tr>
                    <tr>
                        <td><strong>latestActivity</strong></td>
                        <td>{String(profile.latestActivity)}</td>
                    </tr>
                    <tr>
                        <td><strong>user id</strong></td>
                        <td>{profile.user.id}</td>
                    </tr>
                </table>
            )}
        </>
    );
};

export default ProfileInfo;
