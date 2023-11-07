import Header from "@/components/header";
import Head from "next/head";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Subject } from "../../../back-end/domain/model/subject";
import ResourceService from "@/services/ResourceService";
import { useRouter } from "next/router";
import Subjects from "@/components/Subjects";
import { Profile, Resource, StatusMessage } from "@/types";
import ProfileService from "@/services/ProfileService";

const CreateResourceForm: React.FC = () => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");

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
    if (loggedInUser) {
      const email = JSON.parse(loggedInUser).email;
      const profile = await ProfileService.getProfileByEmail(email);

      const result = await ResourceService.createResource(
        profile,
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

  useEffect(() => {
    document.addEventListener("click", handleOutsideClicks);
    return () => {
      document.removeEventListener("click", handleOutsideClicks);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Resources</title>
      </Head>
      <Header />
      <main>
        {loggedInUser ? (
          <>
            {statusMessages && (
              <ul>
                {statusMessages.map((statusMessage, index) => (
                  <li key={index}>{statusMessage.message}</li>
                ))}
              </ul>
            )}
            <section>
              <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="title">Title: </label>
                <input
                  type="text"
                  id="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <label htmlFor="description">Description: </label>
                <textarea
                  id="description"
                  cols={30}
                  rows={5}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
                <label>Category</label>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="summary"
                    name="category"
                    value={"Summary"}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label htmlFor="summary">Summary</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="cheat-sheet"
                    name="category"
                    value={"Cheat Sheet"}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label htmlFor="cheat-sheet">Cheat Sheet</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="lecture-notes"
                    name="category"
                    value={"Lecture Notes"}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label htmlFor="lecture-notes">Lecture Notes</label>
                </div>
                <label htmlFor="subject">Subject</label>
                <input
                  type="search"
                  id="subject"
                  onFocus={() => setVisible(true)}
                  ref={subjectsInputRef}
                  value={subject}
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
                <br />
                {profileIdError && <div>{profileIdError}</div>}
                {titleError && <div>{titleError}</div>}
                {descriptionError && <div>{descriptionError}</div>}
                {categoryError && <div>{categoryError}</div>}
                {subjectError && <div>{subjectError}</div>}
                <button type="submit">Submit</button>
                <br />
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
