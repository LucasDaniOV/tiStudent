import { Profile, Resource } from "@/types";
import { useTranslation } from "next-i18next";
import React from "react";
import Thumbnail from "./Thumbnail";
import router from "next/router";
import Image from "next/image";
import ResourceService from "@/services/ResourceService";

type Props = {
  resources: Resource[];
  profile: Profile;
};

const ResourcesOverview: React.FC<Props> = ({ resources, profile }: Props) => {
  const { t } = useTranslation();

  const deleteResource = async (resource: Resource) => {
    if (confirm(`${t("resources.confirm")}: ${resource.title}?`)) {
      return await ResourceService.deleteResourceById(resource.id);
    }
  };

  return (
    <div className="flex flex-wrap gap-5">
      {resources.map((resource) => (
        <div
          className="w-60 p-5 rounded-xl bg-tistudent-blue hover:bg-blue-500 hover:cursor-pointer"
          key={resource.id}
          onClick={() => {
            router.push("/resources/" + resource.id);
          }}
        >
          <div className="relative">
            <div className="absolute top-0 right-0">
              {profile && (resource.profileId === profile.id || profile.role === "ADMIN") && (
                <div className="flex gap-2">
                  <Image
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      router.push("/resources/edit/" + resource.id);
                    }}
                    className="w-8 h-8 hover:bg-red-500 bg-white"
                    src="/images/edit_icon.svg"
                    alt="edit icon"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <Image
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      deleteResource(resource);
                    }}
                    className="w-8 h-8 hover:bg-red-500 bg-white"
                    src="/images/delete_icon.svg"
                    alt="delete icon"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
              )}
            </div>
            <div className="h-40 flex items-center justify-center">
              <Thumbnail filePath={resource.thumbNail} />
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-lg bold overflow-hidden overflow-ellipsis whitespace-nowrap">{resource.title}</h3>
            <div className="text-md overflow-hidden overflow-ellipsis whitespace-nowrap">
              {resource.categories &&
                resource.categories.map((category: any) => {
                  return t("resources.fields." + String(category.category.name).toLowerCase().replace(" ", "."));
                })}
            </div>
            <div className="text-md overflow-hidden overflow-ellipsis whitespace-nowrap">
              {resource.subjects &&
                resource.subjects.map((subject: any) => {
                  return subject.subject.name;
                })}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div className="text-sm">{`${resource.updatedAt}`.split("T", 1)}</div>
              <div>
                <div className="flex items-center gap-1">
                  <Image
                    className="w-8 h-8"
                    src="/images/like_icon.svg"
                    alt="edit icon"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <span>x {resource.likes && resource.likes.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourcesOverview;
