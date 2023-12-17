import Subjects from "@/components/Subjects";
import subjects from "./subjects";
import ResourceService from "@/services/ResourceService";
import { StatusMessage } from "@/types";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";

const ResourceCreateForm: React.FC = () => {
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

  const validate = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError(t("resources.error.title"));
      isValid = false;
    }

    if (title.length > 60) {
      setTitleError(t("resources.error.title.length"));
      isValid = false;
    }

    if (!description.trim()) {
      setDescriptionError(t("resources.error.description"));
      isValid = false;
    }

    if (description.length > 500) {
      setDescriptionError(t("resources.error.description.length"));
      isValid = false;
    }

    if (!category.trim()) {
      setCategoryError(t("resources.error.category"));
      isValid = false;
    }

    if (!["Summary", "Cheat Sheet", "Lecture Notes"].includes(category)) {
      setCategoryError(t("resources.error.category.invalid"));
      isValid = false;
    }

    if (!subject.trim()) {
      setSubjectError(t("resources.error.subject"));
      isValid = false;
    }

    if (!subjects.includes(subject)) {
      setSubjectError(t("resources.error.subject.invalid"));
      isValid = false;
    }

    if (!profileId.trim()) {
      setProfileIdError(t("resources.error.profileId"));
      isValid = false;
    }

    return isValid;
  };

  const createResource = async () => {
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
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (!validate()) return;
    createResource();
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
      {statusMessages && (
        <ul>
          {statusMessages.map((statusMessage, index) => (
            <li key={index}>{statusMessage.message}</li>
          ))}
        </ul>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="profileId">{t("resources.fields.profileId")}</label>
        <input
          type="text"
          id="profileId"
          value={profileId}
          onChange={(e) => setProfileId(e.target.value)}
        />
        <label htmlFor="title">{t("resources.fields.title")}:</label>
        <input
          type="text"
          id="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="description">
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
        <label>{t("resources.fields.category")}</label>
        <div className="flex items-center">
          <input
            type="radio"
            id="summary"
            name="category"
            value={"Summary"}
            className="mb-2"
            onChange={(e) => setCategory(e.target.value)}
          />
          <label htmlFor="summary" className="ml-2 bg-white">
            {t("resources.fields.summary")}
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="cheat-sheet"
            name="category"
            value={"Cheat Sheet"}
            className="mb-2"
            onChange={(e) => setCategory(e.target.value)}
          />
          <label htmlFor="cheat-sheet" className="mr-4">
            {t("resources.fields.cheat.sheet")}
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="lecture-notes"
            name="category"
            value={"Lecture Notes"}
            className="mb-2"
            onChange={(e) => setCategory(e.target.value)}
          />
          <label htmlFor="lecture-notes" className="mr-4">
            {t("resources.fields.lecture.notes")}
          </label>
        </div>
        <label htmlFor="subject">{t("resources.fields.subject")}</label>
        <input
          type="search"
          id="subject"
          onFocus={() => setVisible(true)}
          ref={subjectsInputRef}
          value={subject}
          placeholder={String(t("resources.fields.subject") + "...")}
          onChange={(e) => setSubject(e.target.value)}
        />
        {isVisible && (
          <Subjects visible={isVisible} func={setSubject} filter={subject} />
        )}
        <br />
        {profileIdError && <div>{profileIdError}</div>}
        {titleError && <div>{titleError}</div>}
        {descriptionError && <div>{descriptionError}</div>}
        {categoryError && <div>{categoryError}</div>}
        {subjectError && <div>{subjectError}</div>}
        <button type="submit">{t("resources.comment.submit")}</button>
        <br />
      </form>
    </>
  );
};

export default ResourceCreateForm;
