import { getToken } from "@/util/token";
import React, { ChangeEvent, useState } from "react";

type Props = {
  callback: Function;
};

const FileUploadComponent: React.FC<Props> = ({ callback }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const token = getToken();
        // Send the file to the server
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/files",
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          callback(result.file.filename);
          console.log("File uploaded successfully!");
        } else {
          console.error("Failed to upload file.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected.");
    }
  };

  return (
    <div className="m-2 p-1">
      <input type="file" onChange={handleFileChange} />
      <button onClick={(e) => handleUpload(e)}>Upload</button>
    </div>
  );
};

export default FileUploadComponent;
