import React from "react";
import { Resource } from "../../types";
import { useRouter } from "next/router";
import ResourceService from "@/services/ResourceService";

type Props = {
  resources: Array<Resource>;
};

const ResourceOverviewTable: React.FC<Props> = ({ resources }: Props) => {
  const router = useRouter();
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ResourceOverviewTable;
