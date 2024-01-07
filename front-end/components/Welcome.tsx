import { useTranslation } from "next-i18next";
import Image from "next/image";

type Props = {
  name: string;
};

const Welcome: React.FC<Props> = ({ name }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="p-20" role="welcome">
      <h1 className="text-3xl font-bold">
        {t("home.welcome")} {name}!
      </h1>
      <Image
        src="/images/einstein.jpg"
        alt="einstein smoking a cigar while browsing our website"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "auto", height: "auto" }}
      />
    </div>
  );
};

export default Welcome;
