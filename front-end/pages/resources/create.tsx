import Subjects from "@/components/Subjects";
import Header from "@/components/Header";
import ProfileService from "@/services/ProfileService";
import ResourceService from "@/services/ResourceService";
import { Category, StatusMessage } from "@/types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import CategoryService from "@/services/CategoryService";
import SubjectService from "@/services/SubjectService";
import FileUploadComponent from "@/components/FileUploadComponent";

const CreateResourceForm: React.FC = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filePath, setFilePath] = useState("");
  const [thumbNail, setThumbNail] = useState("");
  const [category, setCategory] = useState<Category>();
  const [isVisible, setVisible] = useState(false);
  const subjectsInputRef = useRef<HTMLInputElement | null>(null);
  const [subject, setSubject] = useState("");
  const [profileId, setProfileId] = useState<string>("");

  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [filePathError, setFilePathError] = useState("");
  const [thumbNailError, setThumbNailError] = useState("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [subjectError, setSubjectError] = useState<string>("");
  const [profileIdError, setProfileIdError] = useState<string>("");

  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const clearErrors = () => {
    setTitleError("");
    setDescriptionError("");
    setFilePathError("");
    setThumbNailError("");
    setCategoryError("");
    setSubjectError("");
    setProfileIdError("");
    setStatusMessages([]);
  };

  const createResource = async () => {
    const result = await ResourceService.createResource(
      title,
      description,
      filePath,
      thumbNail
    );
    const message = result.message;
    const type = result.status;
    setStatusMessages([{ message, type }]);
    if (!result.resource) return;

    const categoryOnResource = await CategoryService.addCategoryToResource(
      result.resource.id,
      category!.id
    );
    setStatusMessages([
      ...statusMessages,
      { message: categoryOnResource.message, type: categoryOnResource.status },
    ]);

    if (!categoryOnResource) return;

    const subjectYo = await SubjectService.getSubjectIdByName(subject);
    setStatusMessages([
      ...statusMessages,
      { message: subjectYo.message, type: subjectYo.status },
    ]);

    if (!subjectYo) return;

    const subjectId = subjectYo.subject.id;

    const subjectOnResource = await SubjectService.addSubjectToResource(
      result.resource.id,
      subjectId
    );
    setStatusMessages([
      ...statusMessages,
      { message: subjectOnResource.message, type: subjectOnResource.status },
    ]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (!category) {
      setCategoryError("Category is required");
      return;
    }

    if (!subject) {
      setSubjectError("Subject is required");
      return;
    }
    if (!title) {
      setTitleError("Title is required");
      return;
    }

    if (!description) {
      setDescriptionError("Description is required");
      return;
    }

    createResource();
    router.push("/resources");
  };

  const handleOutsideClicks = (event: MouseEvent) => {
    if (subjectsInputRef) {
      if (
        subjectsInputRef.current &&
        !subjectsInputRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    }
  };

  const setUser = async () => {
    const user = sessionStorage.getItem("loggedInUser");
    if (!user) return;
    setProfileId(JSON.parse(user).id);
  };

  const getCategories = async () => {
    const response = await CategoryService.getAllCategories();
    setCategories(response.categories);
  };

  const getSubjects = async () => {
    const response = await SubjectService.getAllSubjects();
    setSubjects(response.subjects);
  };

  useEffect(() => {
    if (!categories || categories.length === 0) getCategories();
    if (!subjects || subjects.length === 0) getSubjects();

    document.addEventListener("click", handleOutsideClicks);
    () => {
      document.removeEventListener("click", handleOutsideClicks);
    };
    setUser();
  }, [profileId, categories, subjects]);

  return (
    <>
      <Head>
        <title>{t("resources.create")}</title>
      </Head>
      <Header current="resources" />
      <main className="flex flex-row align-middle items-center justify-center">
        {profileId ? (
          <>
            <section>
              <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                <label className="mt-2 mb-2" htmlFor="title">
                  {t("resources.fields.title")}:{" "}
                </label>
                <input
                  type="text"
                  id="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <label className="mt-2 mb-2" htmlFor="description">
                  {t("resources.fields.description")}:{" "}
                </label>
                <textarea
                  id="description"
                  cols={30}
                  rows={5}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
                <div>
                  <p className="mt-2 mb-2">File: </p>
                  <FileUploadComponent callback={setFilePath} />
                </div>
                <div>
                  <p className="mt-2 mb-2">Thumbnail: </p>
                  <FileUploadComponent callback={setThumbNail} />
                </div>
                <div>
                  <label className="mt-2 mb-2">
                    {t("resources.fields.category")}:
                  </label>
                  {categories.map((category: Category) => {
                    return (
                      <div key={category.id}>
                        <input
                          type="radio"
                          id={category.name}
                          name="category"
                          value={category.name}
                          className="mr-2"
                          onChange={(e) => setCategory(category)}
                        />
                        <label className="mt-2 mb-2" htmlFor={category.name}>
                          {category.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <label className="mt-2 mb-2" htmlFor="subject">
                  {t("resources.fields.subject")}
                </label>
                <input
                  type="search"
                  id="subject"
                  onFocus={() => setVisible(true)}
                  ref={subjectsInputRef}
                  value={subject}
                  className="pl-2"
                  placeholder="Subject..."
                  onChange={(e) => setSubject(e.target.value)}
                />
                {isVisible && (
                  <Subjects
                    visible={isVisible}
                    func={setSubject}
                    filter={subject}
                    subjects={subjects}
                  />
                )}
                {profileIdError && <div>{profileIdError}</div>}
                {titleError && <div>{titleError}</div>}
                {descriptionError && <div>{descriptionError}</div>}
                {categoryError && <div>{categoryError}</div>}
                {subjectError && <div>{subjectError}</div>}
                <button
                  className="mt-10 mb-10 p-10 bg-gray-700 hover:bg-gray-500"
                  type="submit"
                >
                  {t("resources.comment.submit")}
                </button>
              </form>
            </section>
            {statusMessages && (
              <ul>
                {statusMessages.map((statusMessage, index) => (
                  <li key={index}>{statusMessage.message}</li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <h2>{t("authorization.error")}</h2>
        )}
      </main>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default CreateResourceForm;
