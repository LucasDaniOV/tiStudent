import useResource from "@/hooks/useResource";
import ResourceService from "@/services/ResourceService";
import { useTranslation } from "next-i18next";
import router from "next/router";
import { FormEvent, useEffect, useState } from "react";

type Props = {
  resourceId: string;
};

const ResourceEditForm: React.FC<Props> = ({ resourceId }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const { resource: fetchedResource, isLoading: isLoadingResource } = useResource(resourceId);

  const clearErrors = () => {
    setTitleError("");
    setDescriptionError("");
  };

  useEffect(() => {
    console.log(fetchedResource);
    if (fetchedResource) {
      setTitle(fetchedResource.title);
      setDescription(fetchedResource.description);
    }
  }, [fetchedResource]);

  const updateResource = async () => {
    try {
      if (!title || !description) return;
      await ResourceService.updateResource(resourceId, title, description);
      router.push("/resources");
    } catch (error) {
      console.error("Failed to update resource:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    if (!title) {
      setTitleError(t("resources.error.title"));
      isValid = false;
    }
    if (!description) {
      setDescriptionError(t("resources.error.description"));
      isValid = false;
    }
    return isValid;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (validate()) {
      updateResource();
    }
  };

  console.log(title);

  return (
    <>
      {!isLoadingResource && fetchedResource && (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="mt-2 mb-2" htmlFor="title">
            {t("resources.fields.title")}:
          </label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} />
          {titleError && <div className="error">{titleError}</div>}

          <label className="mt-2 mb-2" htmlFor="description">
            {t("resources.fields.description")}:
          </label>
          <textarea id="description" cols={30} rows={5} value={description} onChange={handleDescriptionChange} />
          {descriptionError && <div className="error">{descriptionError}</div>}

          <button className="mt-10 mb-10 p-10 bg-gray-700 hover:bg-gray-500" type="submit">
            {t("resources.comment.submit")}
          </button>
        </form>
      )}
    </>
  );
};

export default ResourceEditForm;
