import { Category, Profile, Resource, Subject } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  resource: Resource;
  categories: Category[];
  subjects: Subject[];
  creator: Profile;
};

const ResourceInfo: React.FC<Props> = ({
  resource,
  categories,
  subjects,
  creator,
}: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  console.log(resource.filePath);
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
                router.push("../../profiles/" + resource.profileId)
              }
            >
              {creator.username}
            </span>
          </h1>
          <ul className="items-end m-auto">
            <li>
              <strong>{t("resources.fields.category")}:</strong>{" "}
              {categories.map((category) => {
                return category as unknown as string;
              })}
            </li>
            <li>
              <strong>{t("resources.fields.created.at")}</strong>{" "}
              {String(resource.createdAt).split("T")[0] /* DISPLAY ONLY DATE */}
            </li>
            <li>
              <strong>{t("resources.fields.subject")}</strong>{" "}
              {subjects.map((subject) => {
                return subject as unknown as string;
              })}
            </li>
            <li>
              <strong>{t("resources.fields.user.id")}</strong>{" "}
              {resource.profileId}
            </li>
          </ul>
          <br />
        </div>
      )}
    </>
  );
};

export default ResourceInfo;
