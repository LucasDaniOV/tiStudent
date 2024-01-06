import ResourceService from "@/services/ResourceService";
import { Category, Profile, Resource, Subject } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

type Props = {
  resource: Resource;
};

const ResourceInfo: React.FC<Props> = ({ resource }: Props) => {
  const { t } = useTranslation();

  const getSubjects = async () => {
    const response = await ResourceService.getSubjectsByResourceId(resource.id);
    return response;
  };

  const getCategories = async () => {
    const response = await ResourceService.getCategoriesByResourceId(resource.id);
    return response;
  };

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useSWR("categories", getCategories);

  const { data: subjects, isLoading: subjectsLoading, error: subjectsError } = useSWR("subjects", getSubjects);

  useInterval(() => {
    mutate("subjects", getSubjects());
    mutate("categories", getCategories());
  }, 5000);
  return (
    <>
      {resource && subjects && categories && (
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
