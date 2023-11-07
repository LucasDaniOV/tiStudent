import { useRouter } from "next/router";
import React from "react";
import { Resource } from "../../types";
import ResourceService from "@/services/ResourceService";
import { MouseEvent } from "react";

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
        <table>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User ID</th>
              <th scope="col">Created at</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Subject</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, index) => (
              <tr
                key={index}
                onDoubleClick={() => {
                  router.push("/resources/delete/" + resource.id);
                }}
                onClick={() => {
                  router.push("/resources/" + resource.id);
                }}
              >
                <td>{resource.id}</td>
                <td>{resource.creator.id}</td>
                <td>{String(resource.createdAt)}</td>
                <td>{resource.title}</td>
                <td>{resource.description}</td>
                <td>{resource.category}</td>
                <td>{resource.subject}</td>
                <td onClick={(e) => deleteResource(e, resource)}>delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ResourceOverviewTable;
