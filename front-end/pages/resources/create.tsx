import Subjects from "@/components/Subjects";
import Header from "@/components/header";
import ProfileService from "@/services/ProfileService";
import ResourceService from "@/services/ResourceService";
import { StatusMessage } from "@/types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";

const CreateResourceForm: React.FC = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isVisible, setVisible] = useState(false);
  const subjectsInputRef = useRef<HTMLInputElement | null>(null);
  const [subject, setSubject] = useState("");
  const [profileId, setProfileId] = useState<string>("");

  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [subjectError, setSubjectError] = useState<string>("");
  const [profileIdError, setProfileIdError] = useState<string>("");

  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setTitleError("");
    setDescriptionError("");
    setCategoryError("");
    setSubjectError("");
    setProfileIdError("");
    setStatusMessages([]);
  };

  //validate komt nog
  // const validate = () => {}

  const createResource = async () => {
    if (profileId) {
      const result = await ResourceService.createResource(
        profileId,
        title,
        description,
        category,
        subject
      );
      const message = result.message;
      const type = result.status;
      setStatusMessages([{ message, type }]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    // if (!validate()) return;
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

  useEffect(() => {
    document.addEventListener("click", handleOutsideClicks);
    () => {
      document.removeEventListener("click", handleOutsideClicks);
    };
    setUser();
  }, [profileId]);
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
                <label className="mt-2 mb-2">
                  {t("resources.fields.category")}:
                </label>
                <div>
                  <input
                    type="radio"
                    id="summary"
                    name="category"
                    value={"Summary"}
                    className="mr-2"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label className="mt-2 mb-2" htmlFor="summary">
                    {t("resources.fields.summary")}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="cheat-sheet"
                    name="category"
                    value={"Cheat Sheet"}
                    className="mr-2"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label className="mt-2 mb-2" htmlFor="cheat-sheet">
                    {t("resources.fields.cheat.sheet")}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="lecture-notes"
                    name="category"
                    value={"Lecture Notes"}
                    className="mr-2"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label className="mt-2 mb-2" htmlFor="lecture-notes">
                    {t("resources.fields.lecture.notes")}
                  </label>
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
