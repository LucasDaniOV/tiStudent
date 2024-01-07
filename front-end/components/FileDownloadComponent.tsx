import FileService from "@/services/FileService";
import React from "react";
import { useTranslation } from "next-i18next";

type Props = {
  fileName: any;
};

const FileDownloadComponent: React.FC<Props> = ({ fileName }: Props) => {
  const { t } = useTranslation();

  const handleDownload = async () => {
    try {
      const blob = await FileService.getFile(fileName);

      if (!blob) {
        return;
      }

      const blobUrl = URL.createObjectURL(blob);

      // Here is where the magic happens
      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(t("download.error.fetch"), error);
    }
  };

  return (
    <div
      className="flex text-3xl bg-tistudent-blue w-max p-2 rounded-xl hover:cursor-pointer hover:bg-blue-500"
      onClick={handleDownload}
    >
      <strong className="text-3xl mr-1">&#10515;</strong>
      <span className="flex align-middle">{t("download.message")}</span>
    </div>
  );
};

export default FileDownloadComponent;
