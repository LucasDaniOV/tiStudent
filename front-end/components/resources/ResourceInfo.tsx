import { Resource, Comment } from "@/types";
import React from "react";
import Comments from "../comments/Comments";

type Props = {
  resource: Resource;
};

const ResourceInfo: React.FC<Props> = ({ resource }: Props) => {
  return (
    <>
      {resource && (
        <div className="resourceInfo">
          <h1>
            <strong>Title:</strong> {resource.title}
          </h1>
          <h3>
            <strong>Description:</strong> {resource.description}
          </h3>
          <ul>
            <p>
              <strong>Category:</strong> {resource.category}
            </p>
            <p>
              <strong>Created at:</strong> {String(resource.createdAt)}
            </p>
            <p>
              <strong>Subject:</strong> {resource.subject}
            </p>
            <p>
              <strong>Creator ID:</strong> {resource.creator.id}
            </p>
          </ul>
          <br />
        </div>
      )}
    </>
  );
};

export default ResourceInfo;
