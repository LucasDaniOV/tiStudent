import ProfileService from "@/services/ProfileService";
import { Profile } from "@/types";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

type Props = {
    profiles: Array<Profile>;
};

const ProfilesOverviewTable: React.FC<Props> = ({ profiles }: Props) => {
    const router = useRouter();

    const stopPropagationAndPreventDefault = (e: MouseEvent): void => {
        e.stopPropagation();
        e.preventDefault();
    };

    const getProfile = (e: MouseEvent, profileId: number): void => {
        stopPropagationAndPreventDefault(e);
        router.push("/profiles/" + profileId);
    };

    const getProfileUser = (e: MouseEvent, userId: string): void => {
        stopPropagationAndPreventDefault(e);
        router.push("/users/" + userId);
    };

    const deleteProfile = async (e: MouseEvent, profile: Profile) => {
        stopPropagationAndPreventDefault(e);
        if (!confirm(`Are you sure you want to delete ${profile.username}?`)) return;
        await ProfileService.deleteProfileById(profile.id);
        router.reload();
    };

    return (
        <>
            {profiles && (
                <table>
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">username</th>
                            <th scope="col">bio</th>
                            <th scope="col">createdAt</th>
                            <th scope="col">latestActivity</th>
                            <th scope="col">user id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map((profile, index) => (
                            <tr key={index} onClick={(e) => getProfile(e, profile.id)}>
                                <td>{profile.id}</td>
                                <td>{profile.username}</td>
                                <td>{profile.bio}</td>
                                <td>{String(profile.createdAt)}</td>
                                <td>{String(profile.latestActivity)}</td>
                                <td onClick={(e) => getProfileUser(e, profile.user.id)}>{profile.user.id}</td>
                                <td onClick={(e) => deleteProfile(e, profile)}>delete</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default ProfilesOverviewTable;
