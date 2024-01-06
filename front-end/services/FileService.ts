import { getToken } from "@/util/token";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/files";

const getFile = async (fileName: string) => {
  try {
    const token = getToken();
    const res = await fetch(`${baseUrl}/${fileName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.blob();
  } catch (error) {}
};

const FileService = {
  getFile,
};

export default FileService;
