import { useRouter } from "next/router";
import React, { useState, ChangeEvent } from "react";

const FileUploadComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const router = useRouter();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Send the file to the server
        const response = await fetch("http://localhost:3000/files", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setUploadedFile(result.file);
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

  const handleDownload = async () => {
    if (uploadedFile) {
      // Replace 'http://localhost:3000/files' with your actual backend endpoint
      router.push(`http://localhost:3000/files/${uploadedFile.filename}`);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadedFile && (
        <div>
          <h2>Uploaded File Details</h2>
          <pre>{JSON.stringify(uploadedFile, null, 2)}</pre>
          <button onClick={handleDownload}>Download File</button>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
