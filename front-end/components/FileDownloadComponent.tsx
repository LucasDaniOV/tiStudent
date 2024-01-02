import { getToken } from "@/util/token";
import React, { useEffect, useState } from "react";

type Props = {
  fileName: any;
};

const FileUploadComponent: React.FC<Props> = ({ fileName }: Props) => {
  const [uploadedFile, setUploadedFile] = useState<any>();
  useEffect(() => {
    setUploadedFile(fileName);
  }, [uploadedFile]);
  console.log(uploadedFile);

  const handleDownload = async () => {
    if (uploadedFile) {
      const token = getToken();
      const url = `${process.env.NEXT_PUBLIC_API_URL}/files/${uploadedFile}`;

      try {
        // Use fetch for client-side navigation with headers
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Convert the response to a Blob
          const blob = await response.blob();

          // Create a temporary URL for the Blob
          const blobUrl = URL.createObjectURL(blob);

          // Create an <a> element to trigger the download
          const downloadLink = document.createElement("a");
          downloadLink.href = blobUrl;
          downloadLink.download = uploadedFile;

          // Append the <a> element to the DOM and trigger the download
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          // Clean up the temporary URL
          URL.revokeObjectURL(blobUrl);
        } else {
          // Handle download failure
          console.error("Failed to download file.");
        }
      } catch (error) {
        // Handle fetch error
        console.error("Error during fetch:", error);
      }
    }
  };

  return (
    <div className="m-2 p-1">
      {uploadedFile && (
        <div className="">
          <button
            className="text-2xl align-middle hover:bg-gray-500 border p-1 rounded-lg "
            onClick={handleDownload}
          >
            <span className="text-3xl align-middle">&#10515;</span> Download
            File
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
