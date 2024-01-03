import ProfileService from "@/services/ProfileService";
import ResourceService from "@/services/ResourceService";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { MouseEvent, useEffect, useState } from "react";
import { Profile, Resource } from "../../types";
import Image from "next/image";

type Props = {
  resources: any[];
};

type imageMap = Record<string, string>;
const ResourceOverviewTable: React.FC<Props> = ({ resources }: Props) => {
  const [profile, setProfile] = useState<Profile>();
  const [imageState, setImageState] = useState<imageMap>({});
  const router = useRouter();
  const { t } = useTranslation();
  const images: imageMap = {};

  const mapImgToResource = async () => {
    await Promise.all(
      resources.map(async (r: Resource) => {
        const img = await import("../../../uploads/" + r.thumbNail);
        images[r.id] = img;
      })
    );
    setImageState(images);
  };

  useEffect(() => {
    const getProfile = async () => {
      const p = String(sessionStorage.getItem("loggedInUser"));
      if (!p) return;
      const pObject = await ProfileService.getProfileById(JSON.parse(p).id);
      if (pObject) setProfile(pObject.profile);
    };
    getProfile();
    mapImgToResource();
  }, []);

  const deleteResource = async (resource: Resource) => {
    if (
      !confirm(
        `Are you sure you want to delete resource with title: ${resource.title}?`
      )
    ) {
      return;
    } else {
      await ResourceService.deleteResourceById(resource.id);
      router.reload(); // houden? indien niet -> refresh rate verhogen
    }
  };

  const checkAuthority = async (e: MouseEvent, resource: Resource) => {
    e.stopPropagation();
    e.preventDefault();

    if (profile?.role === "ADMIN") {
      deleteResource(resource);
    } else {
      if (profile?.id === resource.profileId) {
        deleteResource(resource);
      } else {
        confirm("You are not the creator of this Resource.");
      }
    }
  };

  return (
    <>
      {resources && (
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
                Thumbnail
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
            {resources.map((resource, index) => (
              <tr
                className="hover:text-white hover:bg-gray-600"
                key={index}
                onDoubleClick={() => {
                  router.push("/resources/delete/" + resource.id);
                }}
                onClick={() => {
                  router.push("/resources/" + resource.id);
                }}
              >
                <td className="border p-4">{resource.id}</td>
                <td className="border p-4">{resource.profileId}</td>
                <td>
                  <span className="flex items-center justify-center">
                    {imageState && imageState[resource.id] && (
                      <Image
                        src={imageState[resource.id]}
                        alt={"Thumbnail"}
                        width={100}
                        height={50}
                      />
                    )}
                  </span>
                </td>
                <td className="border p-4">{String(resource.createdAt)}</td>
                <td className="border p-4">{resource.title}</td>
                <td className="border p-4">{resource.description}</td>
                <td className="border p-4">
                  {resource.categories.map((category: any) => {
                    return category.category.name;
                  })}
                </td>
                <td className="border p-4">
                  {resource.subjects.map((subject: any) => {
                    return subject.subject.name;
                  })}
                </td>
                <td
                  className="border p-4"
                  onClick={(e) => checkAuthority(e, resource)}
                >
                  {t("delete")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ResourceOverviewTable;
