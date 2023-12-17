import Subjects from "@/components/Subjects";
import Header from "@/components/header";
import ProfileService from "@/services/ProfileService";
import ResourceService from "@/services/ResourceService";
import { StatusMessage } from "@/types";
import { getToken } from "@/util/token";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";

const CreateResourceForm: React.FC = () => {
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
    const token = getToken();
    const profile = await ProfileService.getProfileByEmail(
      JSON.parse(user).email
    );
    if (!profile) return;
    setProfileId(profile.id);
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
        <title>Create Resource</title>
      </Head>
      <Header current="resources" />
      <main className="flex flex-row align-middle items-center justify-center">
        {profileId ? (
          <>
            {statusMessages && (
              <ul>
                {statusMessages.map((statusMessage, index) => (
                  <li key={index}>{statusMessage.message}</li>
                ))}
              </ul>
            )}
            <section>
              <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                <label className="mt-2 mb-2" htmlFor="title">
                  Title:{" "}
                </label>
                <input
                  type="text"
                  id="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <label className="mt-2 mb-2" htmlFor="description">
                  Description:{" "}
                </label>
                <textarea
                  id="description"
                  cols={30}
                  rows={5}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
                <label className="mt-2 mb-2">Category</label>
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
                    Summary
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
                    Cheat Sheet
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
                    Lecture Notes
                  </label>
                </div>
                <label className="mt-2 mb-2" htmlFor="subject">
                  Subject
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
                  Submit
                </button>
              </form>
            </section>
          </>
        ) : (
          <h2>You need to be logged in to create a resource</h2>
        )}
      </main>
    </>
  );
};

export default CreateResourceForm;
