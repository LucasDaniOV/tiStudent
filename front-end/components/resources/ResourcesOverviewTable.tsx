import ProfileService from "@/services/ProfileService";
import ResourceService from "@/services/ResourceService";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { MouseEvent, useEffect, useState } from "react";
import { Profile, Resource } from "../../types";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import { profile } from "console";

type Props = {
  resources: any[];
};

type imageMap = Record<string, string>;

const ResourceOverviewTable: React.FC<Props> = ({ resources }: Props) => {
  const [imageState, setImageState] = useState<imageMap>({});
  const router = useRouter();
  const { t } = useTranslation();
  const images: imageMap = {};

  const mapImgToResource = async () => {
    await Promise.all(
      resources.map(async (r: Resource) => {
        try {
          const img = await import("../../../back-end/uploads/" + r.thumbNail);
          images[r.id] = img;
        } catch (error) {
          console.error(error);
        }
      })
    );
    setImageState(images);
  };

  const getProfile = async () => {
    try {
      await mapImgToResource();
      const p = String(sessionStorage.getItem("loggedInUser"));
      if (!p) return;
      const pObject = await ProfileService.getProfileById(JSON.parse(p).id);
      if (pObject) return pObject.profile;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading, error } = useSWR("profile", getProfile);

  useInterval(() => {
    mutate("profile", getProfile());
  }, 5000);

  const deleteResource = async (e: MouseEvent, resource: Resource) => {
    e.stopPropagation();
    e.preventDefault();
    if (!confirm(`${t("resources.confirm")}: ${resource.title}?`)) {
      return;
    } else {
      await ResourceService.deleteResourceById(resource.id);
    }
  };

  const checkAuthority = async (e: MouseEvent, resource: Resource) => {
    e.stopPropagation();
    e.preventDefault();

    if (data.role === "ADMIN") {
      deleteResource(e, resource);
    } else {
      if (data.id === resource.profileId) {
        deleteResource(e, resource);
      } else {
        confirm(t("resources.error.creator"));
      }
    }
  };

  return (
    <>
      {resources &&
        data &&
        (isLoading ? (
          <p>{t("loading")}</p>
        ) : (
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th scope="col" className="border p-4 text-left">
                  {t("resources.fields.id")}
                </th>
                <th scope="col" className="border p-4 text-left">
                  {t("resources.fields.user.id")}
                </th>
                <th scope="col" className="border p-4">
                  {t("resources.fields.thumbnail")}
                </th>
                <th scope="col" className="border p-4 text-left">
                  {t("resources.fields.created.at")}
                </th>
                <th scope="col" className="border p-4 text-left">
                  {t("resources.fields.title")}
                </th>
                <th scope="col" className="border p-4 text-left">
                  {t("resources.fields.description")}
                </th>
                <th scope="col" className="border p-4 text-left">
                  {t("resources.fields.category")}
                </th>
                <th scope="col" className="border p-4 text-left">
                  {t("resources.fields.subject")}
                </th>
              </tr>
            </thead>
            <tbody>
              {resources.map(
                (resource, index) =>
                  imageState &&
                  imageState[resource.id] && (
                    <tr
                      className="hover:text-white hover:bg-gray-600"
                      key={index}
                      onClick={() => {
                        router.push("/resources/" + resource.id);
                      }}
                    >
                      <td className="border p-4">{resource.id}</td>
                      <td className="border p-4">{resource.profileId}</td>
                      <td>
                        <span className="flex items-center justify-center">
                          <Image src={imageState[resource.id]} alt={"Thumbnail"} width={100} height={50} />
                        </span>
                      </td>
                      <td className="border p-4">{String(resource.createdAt)}</td>
                      <td className="border p-4">{resource.title}</td>
                      <td className="border p-4">{resource.description}</td>
                      <td className="border p-4">
                        {resource.categories.map((category: any) => {
                          return t(
                            "resources.fields." + String(category.category.name).toLowerCase().replace(" ", ".")
                          );
                        })}
                      </td>
                      <td className="border p-4">
                        {resource.subjects.map((subject: any) => {
                          return subject.subject.name;
                        })}
                      </td>
                      <td className="border p-4" onClick={(e) => checkAuthority(e, resource)}>
                        {t("delete")}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        ))}
    </>
  );
};

export default ResourceOverviewTable;
