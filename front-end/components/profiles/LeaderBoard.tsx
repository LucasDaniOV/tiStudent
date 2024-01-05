import { Profile } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

type Props = {
  profiles: Array<{ profile: Profile; resourceCount: number }>;
};

const LeaderBoard: React.FC<Props> = ({ profiles }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const stopPropagationAndPreventDefault = (e: MouseEvent): void => {
    e.stopPropagation();
    e.preventDefault();
  };

  const getProfile = (e: MouseEvent, profileId: number): void => {
    stopPropagationAndPreventDefault(e);
    router.push("/profiles/" + profileId);
  };
  return (
    <>
      {profiles && (
        <>
          <h1 className="text-2xl">{t("leaderboard.top")}:</h1>
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th scope="col" className="border p-4 text-left">
                  {t("profiles.fields.username")}
                </th>
                <th>{t("leaderboard.count")}</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p, index) => (
                <tr
                  className="hover:text-white hover:bg-gray-600"
                  key={index}
                  onClick={(e) => getProfile(e, parseInt(p.profile.id))}
                >
                  <td className="border p-4 text-left">{p.profile.username}</td>
                  <td className="border p-4 text-left">{p.resourceCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default LeaderBoard;
