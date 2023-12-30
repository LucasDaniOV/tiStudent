import { getToken } from "@/util/token";
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
        const token = getToken();
        // Send the file to the server
        const response = await fetch("http://localhost:3000/files", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      const token = getToken();
      const url = `http://localhost:3000/files/${uploadedFile.filename}`;

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
          downloadLink.download = uploadedFile.filename;

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
