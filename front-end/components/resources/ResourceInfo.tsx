import { Resource } from "@/types";
import React from "react";

type Props = {
  resource: Resource;
};

const ResourceInfo: React.FC<Props> = ({ resource }: Props) => {
  return (
    <>
      {resource && (
        <div className="grid grid-cols-2" role="resourceInfo">
          <h1 className="text-lg">
            <span className="text-2xl">
              <strong>{resource.title}</strong>
            </span>
            <br />
            <strong>{resource.description}</strong>
          </h1>
          <ul>
            <li>
              <strong>Category:</strong> {resource.category}
            </li>
            <li>
              <strong>Created at:</strong>{" "}
              {String(resource.createdAt).split("T")[0] /* DISPLAY ONLY DATE */}
            </li>
            <li>
              <strong>Subject:</strong> {resource.subject}
            </li>
            <li>
              <strong>Creator ID:</strong> {resource.creator.id}
            </li>
            <li>
              <strong>Likes:</strong> 
            </li>
          </ul>
          <br />
        </div>
      )}
    </>
  );
};

export default ResourceInfo;
