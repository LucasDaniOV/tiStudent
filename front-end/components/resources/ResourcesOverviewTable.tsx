import ResourceService from "@/services/ResourceService";
import { useRouter } from "next/router";
import React, { MouseEvent } from "react";
import { Resource } from "../../types";

type Props = {
  resources: Array<Resource>;
};

const ResourceOverviewTable: React.FC<Props> = ({ resources }: Props) => {
  const router = useRouter();

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
                ID
              </th>
              <th scope="col" className="border p-4 text-left">
                User ID
              </th>
              <th scope="col" className="border p-4 text-left">
                Created at
              </th>
              <th scope="col" className="border p-4 text-left">
                Title
              </th>
              <th scope="col" className="border p-4 text-left">
                Description
              </th>
              <th scope="col" className="border p-4 text-left">
                Category
              </th>
              <th scope="col" className="border p-4 text-left">
                Subject
              </th>
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
                <td className="border p-4">{resource.creator.id}</td>
                <td className="border p-4">{String(resource.createdAt)}</td>
                <td className="border p-4">{resource.title}</td>
                <td className="border p-4">{resource.description}</td>
                <td className="border p-4">{resource.category}</td>
                <td className="border p-4">{resource.subject}</td>
                <td
                  className="border p-4"
                  onClick={(e) => deleteResource(e, resource)}
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

export default ResourceOverviewTable;
