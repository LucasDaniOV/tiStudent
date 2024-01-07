import CommentService from "@/services/CommentService";
import { Profile, Resource } from "@/types";
import { useTranslation } from "next-i18next";
import { FormEvent, useState } from "react";

type Props = {
  resource: Resource;
  profile: Profile;
};

const CommentCreateForm: React.FC<Props> = ({ resource, profile }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [messageError, setMessageError] = useState<string>("");
  const { t } = useTranslation();

  const validate = (): Boolean => {
    let isValid = true;

    if (!message) {
      isValid = false;
      setMessageError(t("resources.comment.empty"));
    }

    return isValid;
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setMessageError("");

    await CommentService.writeCommentOnResource(profile.id, resource.id, message);
  }

  return (
    <>
      {messageError && <div className="text-red-600">{messageError}</div>}
      <form onSubmit={onSubmit}>
        <textarea
          className="w-full h-24 bg-black border-2 border-gray-800 p-2 text-lg"
          name="message"
          placeholder={t("resources.comment.message")}
          required
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-tistudent-blue p-2 rounded-xl mt-2 hover:bg-blue-500 text-lg" type="submit">{t("resources.comment.submit")}</button>
      </form>
    </>
  );
};

export default CommentCreateForm;
