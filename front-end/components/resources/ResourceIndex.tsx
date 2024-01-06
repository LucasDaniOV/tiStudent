import ResourceService from "@/services/ResourceService";
import { Profile, Resource } from "@/types";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import ResourcesOverviewTable from "./ResourcesOverviewTable";
import { useTranslation } from "next-i18next";

type Props = {
  profile: Profile;
};

const ResourceIndex: React.FC<Props> = ({ profile }: Props) => {
  const { t } = useTranslation();
  const fetchResources = async () => {
    if (!profile) return;
    const resourcesResponse = await ResourceService.getAllResources();
    return resourcesResponse.resources;
  };

  const { data: resources, error } = useSWR(profile ? "resources" : null, fetchResources);

  if (error) {
    console.error("Failed to fetch resources:", error);
    return <div>{t("login.error")}</div>;
  }

  useInterval(() => {
    mutate("resources", fetchResources());
  }, 5000);
  return (
    resources && (
      <>
        <Link href="/resources/create">{t("resources.create")}</Link>
        <ResourcesOverviewTable resources={resources as Resource[]} />
      </>
    )
  );
};
export default ResourceIndex;
