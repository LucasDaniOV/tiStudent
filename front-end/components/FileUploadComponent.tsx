import { getToken } from "@/util/token";
import React, { ChangeEvent, useState } from "react";

type Props = {
  callback: Function;
  allowedExtensions: Array<string>;
};

const FileUploadComponent: React.FC<Props> = ({ callback, allowedExtensions }: Props) => {
  const [state, setState] = useState<"pressed" | "unpressed">("unpressed");
  const [uploaded, setUploaded] = useState<"Upload" | "File succesfully uploaded">("Upload");
  const [error, setError] = useState<string>("");
  const [filename, setFilename] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const basic = "p-1 rounded-lg h-max ";
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState("unpressed");
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setUploaded("Upload");
    } else {
      setUploaded("Upload");
    }
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedFile) {
      if (allowedExtensions) {
        let valid = false;
        allowedExtensions.forEach((allowedExtension) => {
          if (!valid) {
            if (selectedFile.name.endsWith(allowedExtension)) {
              valid = true;
            }
          }
        });
        if (!valid) {
          setError(`Unsupported file format`);
          setUploaded("Upload");
          setState("unpressed");
          return;
        } else {
          setError("");
        }
      }
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const token = getToken();
        // Send the file to the server
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/files", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          callback(result.file.filename);
          setFilename(result.file.filename);
          setUploaded("File succesfully uploaded");
          setState("pressed");
        } else {
          setUploaded("Upload");
          setState("unpressed");
        }
      } catch (error) {
        setUploaded("Upload");
        setState("unpressed");
      }
    } else {
      setUploaded("Upload");
      setState("unpressed");
      console.error("No file selected.");
    }
  };

  const cancelUpload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedFile) {
      try {
        const token = getToken();
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/files/" + filename, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          callback("");
          setUploaded("Upload");
          setState("unpressed");
        }
      } catch (error) {
        setUploaded("File succesfully uploaded");
        setState("pressed");
      }
    } else {
      setUploaded("File succesfully uploaded");
      setState("pressed");
      console.error("No file selected.");
    }
  };

  return (
    <>
      <div className="m-2 p-1 flex items-center align-middle">
        <input type="file" onChange={handleFileChange} accept={String(allowedExtensions)} />
        <button
          className={
            basic + (state === "pressed" ? " bg-green-500 text-green-950" : "bg-tistudent-blue hover:bg-blue-500")
          }
          onClick={(e) => {
            if (state === "unpressed") {
              setState("pressed");
              handleUpload(e);
            }
          }}
        >
          {uploaded}
        </button>
        {state === "pressed" && (
          <button
            className={basic + " bg-red-700 p-1 ml-1 hover:bg-red-600"}
            onClick={(e) => {
              cancelUpload(e);
            }}
          >
            X
          </button>
        )}
      </div>
      <div className={`bg-red-600 w-fit rounded-lg ${error && "p-1"}`}>{error && error}</div>
    </>
  );
};

export default FileUploadComponent;
