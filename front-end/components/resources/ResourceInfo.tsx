import React from "react";
import { Resource } from "@/types";

type Props = {
  resource: Resource;
};

const UserInfo: React.FC<Props> = ({ resource }: Props) => {
  return (
    <>
      {resource && (
        <div>
          <p>
            <strong>ID:</strong> {resource.id}
          </p>
          <p>
            <strong>Creator ID:</strong> {resource.creator.id}
          </p>
          <p>
            <strong>Created at:</strong> {String(resource.createdAt)}
          </p>
          <p>
            <strong>Title:</strong> {resource._title}
          </p>
          <p>
            <strong>Description:</strong> {resource._description}
          </p>
          <p>
            <strong>Category:</strong> {resource._category}
          </p>
          <p>
            <strong>Subject:</strong> {resource._subject}
          </p>
        </div>
      )}
    </>
  );
};

export default UserInfo;
