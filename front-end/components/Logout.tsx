import { useTranslation } from "next-i18next";

type Props = {
  callBack: Function;
};
const Logout: React.FC<Props> = ({ callBack }: Props) => {
  const { t } = useTranslation();
  return (
    <section className="m-10 mt-0 text-center">
      <h1 className="text-center text-xl">{t("logout.message")}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sessionStorage.removeItem("loggedInUser");
          callBack(null);
        }}
      >
        <button type="submit" className="text-center hover:bg-gray-500 p-1 text-xl">
          {t("logout.button")}
        </button>
      </form>
    </section>
  );
};

export default Logout;
