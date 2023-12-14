import { Resource } from "@/types";
import { Router, useRouter } from "next/router";
import React from "react";

type Props = {
  resource: Resource;
};

const ResourceInfo: React.FC<Props> = ({ resource }: Props) => {
  const router = useRouter();
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
            <br />
            <span>Creator:</span> {/* LATER VERVANGEN MET ICON VAN PROFILE */}
            <span
              className="hover:cursor-pointer hover:text-red-600 m-1"
              onClick={() =>
                router.push("../../profiles/" + resource.creator.id)
              }
            >
              {resource.creator.username}
            </span>
          </h1>
          <ul className="items-end m-auto">
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
          </ul>
          <br />
        </div>
      )}
    </>
  );
};

export default ResourceInfo;
