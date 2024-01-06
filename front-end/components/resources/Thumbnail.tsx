import FileService from "@/services/FileService";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  filePath: string;
};

const Thumbnail: React.FC<Props> = ({ filePath }: Props) => {
  const [imgSrc, setImgSrc] = useState<any>(null);

  useEffect(() => {
    FileService.getFile(filePath).then((blob) => {
      if (blob) {
        setImgSrc(URL.createObjectURL(blob));
      }
    });
  }, [filePath]);

  if (!imgSrc) {
    return (
      <Image
        src="/images/logo.png"
        alt="tiStudent Logo"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "auto", height: "100%" }}
      />
    );
  }

  return (
    <Image src={imgSrc} alt="thumbnail" width={0} height={0} sizes="100vw" style={{ width: "auto", height: "100%" }} />
  );
};

export default Thumbnail;
