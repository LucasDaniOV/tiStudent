import CategoryService from "@/services/CategoryService";
import ResourceService from "@/services/ResourceService";
import SubjectService from "@/services/SubjectService";
import { Profile, StatusMessage } from "@/types";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { Category } from "../../../back-end/domain/model/category";
import FileUploadComponent from "../FileUploadComponent";
import Subjects from "../Subjects";

const CreateResourceForm: React.FC = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filePath, setFilePath] = useState("");
  const [thumbNail, setThumbNail] = useState("");
  const [category, setCategory] = useState<Category>();
  const [subjectsIsVisible, setSubjectVisible] = useState(false);
  const subjectsInputRef = useRef<HTMLInputElement | null>(null);
  const [subject, setSubject] = useState("");

  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [filePathError, setFilePathError] = useState("");
  const [thumbNailError, setThumbNailError] = useState("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [subjectError, setSubjectError] = useState<string>("");

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
    setStatusMessages([]);
  };

  const createResource = async () => {
    const result = await ResourceService.createResource(
      title,
      description,
      filePath,
      thumbNail ? thumbNail : "default-thumbnail1.jpg"
    );
    const message = result.message;
    const type = result.status;
    setStatusMessages([{ message, type }]);
    if (!result.resource) return;

    const categoryOnResource = await CategoryService.addCategoryToResource(
      result.resource.id,
      category!.id as unknown as string
    );
    setStatusMessages([...statusMessages, { message: categoryOnResource.message, type: categoryOnResource.status }]);

    if (!categoryOnResource) return;

    const subjectYo = await SubjectService.getSubjectIdByName(subject);
    setStatusMessages([...statusMessages, { message: subjectYo.message, type: subjectYo.status }]);

    if (!subjectYo) return;

    const subjectId = subjectYo.subject.id;

    const subjectOnResource = await SubjectService.addSubjectToResource(result.resource.id, subjectId);
    setStatusMessages([...statusMessages, { message: subjectOnResource.message, type: subjectOnResource.status }]);
  };

  const validate = () => {
    let isValid = true;

    if (!category) {
      setCategoryError(t("resources.error.category"));
      isValid = false;
    }

    if (!subject) {
      setSubjectError(t("resources.error.subject"));
      isValid = false;
    }
    if (!title) {
      setTitleError(t("resources.error.title"));
      isValid = false;
    } else {
      if (title.length > 60) {
        setTitleError(t("resources.error.titleLength"));
        isValid = false;
      }
    }

    if (!description) {
      setDescriptionError(t("resources.error.description"));
      isValid = false;
    } else {
      if (description.length > 500) {
        setDescriptionError(t("resources.error.descriptionLength"));
        isValid = false;
      }
    }

    if (!filePath) {
      setFilePathError(t("resources.error.file"));
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearErrors();
    if (!validate()) return;
    createResource();
    router.push("/resources");
  };

  const handleOutsideClicks = (event: MouseEvent) => {
    if (subjectsInputRef) {
      if (subjectsInputRef.current && !subjectsInputRef.current.contains(event.target as Node)) {
        setSubjectVisible(false);
      }
    }
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
  }, [categories, subjects]);
  const errorClass = "text-red-600 mt-1";
  return (
    <>
      <section className="border border-gray-500 p-5 rounded-xl">
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          <label className="mt-2 mb-2" htmlFor="title">
            {t("resources.fields.title")}:
          </label>
          <input
            type="text"
            id="title"
            className="border border-gray-400 bg-black p-1"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label className="mt-2 mb-2" htmlFor="description">
            {t("resources.fields.description")}:
          </label>
          <textarea
            className="border border-gray-400 bg-black p-1"
            id="description"
            cols={30}
            rows={5}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <div>
            <p className="mt-2 mb-2">{t("resources.fields.file")}: </p>
            <FileUploadComponent callback={setFilePath} allowedExtensions={[".jpg", ".jpeg", ".png", ".zip", ".pdf"]} />
          </div>
          <div>
            <p className="mt-2 mb-2">{t("resources.fields.thumbnail")}: </p>
            <FileUploadComponent callback={setThumbNail} allowedExtensions={[".jpg", ".jpeg", ".png"]} />
          </div>
          <div>
            <label className="mt-2 mb-2">{t("resources.fields.category")}:</label>
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
                    {t("resources.fields." + category.name.toLowerCase().replace(" ", "."))}
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
            onFocus={() => setSubjectVisible(true)}
            ref={subjectsInputRef}
            value={subject}
            className="pl-2 placeholder:text-gray-500 border border-gray-400 bg-black p-1"
            placeholder="Subject..."
            onChange={(e) => setSubject(e.target.value)}
          />
          {subjectsIsVisible && (
            <Subjects visible={subjectsIsVisible} func={setSubject} filter={subject} subjects={subjects} />
          )}
          {titleError && <div className={errorClass}>{titleError}</div>}
          {descriptionError && <div className={errorClass}>{descriptionError}</div>}
          {filePathError && <div className={errorClass}>{filePathError}</div>}
          {thumbNailError && <div className={errorClass}>{thumbNailError}</div>}
          {categoryError && <div className={errorClass}>{categoryError}</div>}
          {subjectError && <div className={errorClass}>{subjectError}</div>}
          <button
            className="mt-5 mb-10 p-10 bg-tistudent-blue rounded-lg text-gray-200 hover:bg-blue-500"
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
  );
};
export default CreateResourceForm;
