import { Category, Profile, Resource, Subject } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  resource: Resource;
  categories: Category[];
  subjects: Subject[];
};

const ResourceInfo: React.FC<Props> = ({ resource, categories, subjects }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      {resource && (
        <>
          <div className="grid grid-cols-2" role="resourceInfo">
            <div className="grid grid-cols-2 col-span-2">
              <h1 className="text-lg">
                <span className="text-2xl">
                  <strong>{resource.title}</strong>
                </span>
                <br />
              </h1>
              <span className="flex justify-center">
                <strong>{t("resources.fields.subject")}:</strong>
                <span className="ml-1">
                  {subjects.map((subject) => {
                    return subject as unknown as string;
                  })}
                </span>
              </span>
              <span>
                <strong>{t("resources.fields.category")}:</strong>
                <span className="ml-1">
                  {categories.map((category) => {
                    return category as unknown as string;
                  })}
                </span>
              </span>
              <span className="flex justify-center">
                <strong>{t("resources.fields.created.at")}:</strong>
                <span className="ml-1">{String(resource.createdAt).split("T")[0] /* DISPLAY ONLY DATE */}</span>
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResourceInfo;
