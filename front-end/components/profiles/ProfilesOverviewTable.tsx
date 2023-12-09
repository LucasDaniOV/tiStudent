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
    if (!confirm(`Are you sure you want to delete ${profile.username}?`))
      return;
    await ProfileService.deleteProfileById(parseInt(profile.id));
    router.reload();
  };

  return (
    <>
      {profiles && (
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th scope="col" className="border p-4 text-left">
                id
              </th>
              <th scope="col" className="border p-4 text-left">
                username
              </th>
              <th scope="col" className="border p-4 text-left">
                bio
              </th>
              <th scope="col" className="border p-4 text-left">
                createdAt
              </th>
              <th scope="col" className="border p-4 text-left">
                latestActivity
              </th>
              <th scope="col" className="border p-4 text-left">
                user id
              </th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile, index) => (
              <tr
                className="hover:text-white hover:bg-gray-600"
                key={index}
                onClick={(e) => getProfile(e, parseInt(profile.id))}
              >
                <td className="border p-4 text-left">{profile.id}</td>
                <td className="border p-4 text-left">{profile.username}</td>
                <td className="border p-4 text-left">{profile.bio}</td>
                <td className="border p-4 text-left">
                  {String(profile.createdAt)}
                </td>
                <td className="border p-4 text-left">
                  {String(profile.latestActivity)}
                </td>
                <td
                  className="border p-4 text-left"
                  onClick={(e) => getProfileUser(e, profile.user.id)}
                >
                  {profile.user.id}
                </td>
                <td
                  className="border p-4 text-left"
                  onClick={(e) => deleteProfile(e, profile)}
                >
                  delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ProfilesOverviewTable;
