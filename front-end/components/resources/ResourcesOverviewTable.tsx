import ResourceService from "@/services/ResourceService";
import { useRouter } from "next/router";
import React, { MouseEvent } from "react";
import { Resource } from "../../types";
import { useTranslation } from "next-i18next";

type Props = {
  resources: Array<Resource>;
};

const ResourceOverviewTable: React.FC<Props> = ({ resources }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const deleteResource = async (e: MouseEvent, resource: Resource) => {
    e.stopPropagation();
    e.preventDefault();
    if (!confirm(`Are you sure you want to delete ${resource.id}?`)) return;
    await ResourceService.deleteResourceById(resource.id);
    router.reload();
  };

  return (
    <>
      {resources && (
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th scope="col" className="border p-4 text-left">
                {t("resources.fields.id")}
              </th>
              <th scope="col" className="border p-4 text-left">
                {t("resources.fields.user.id")}
              </th>
              <th scope="col" className="border p-4 text-left">
                {t("resources.fields.created.at")}
              </th>
              <th scope="col" className="border p-4 text-left">
                {t("resources.fields.title")}
              </th>
              <th scope="col" className="border p-4 text-left">
                {t("resources.fields.description")}
              </th>
              {/* <th scope="col" className="border p-4 text-left">
                {t("resources.fields.category")}
              </th>
              <th scope="col" className="border p-4 text-left">
                {t("resources.fields.subject")}
              </th> */}
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, index) => (
              <tr
                className="hover:text-white hover:bg-gray-600"
                key={index}
                onDoubleClick={() => {
                  router.push("/resources/delete/" + resource.id);
                }}
                onClick={() => {
                  router.push("/resources/" + resource.id);
                }}
              >
                <td className="border p-4">{resource.id}</td>
                <td className="border p-4">{resource.profileId}</td>
                <td className="border p-4">{String(resource.createdAt)}</td>
                <td className="border p-4">{resource.title}</td>
                <td className="border p-4">{resource.description}</td>
                {/* <td className="border p-4">{resource.category}</td>
                <td className="border p-4">{resource.subject}</td> */}
                <td
                  className="border p-4"
                  onClick={(e) => deleteResource(e, resource)}
                >
                  {t("delete")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ResourceOverviewTable;
