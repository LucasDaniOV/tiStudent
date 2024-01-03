import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Resource } from "@/types";

type Props = {
  resource: Resource;
  likes: number;
};

const SharedResource: React.FC<Props> = ({ resource, likes }: Props) => {
  const router = useRouter();
  const [thumbNail, setThumbNail] = useState<string>("");
  useEffect(() => {
    const getThumbnail = async () => {
      try {
        const img = await import(
          "../../../back-end/uploads/" + resource.thumbNail
        );
        setThumbNail(img);
      } catch (error) {
        console.error(error);
      }
    };
    getThumbnail();
  });
  return (
    <tr
      key={resource.id}
      className="grid grid-cols-4 cursor-pointer hover:bg-gray-700"
      onClick={() => router.push("/resources/" + resource.id)}
    >
      <td key={"thumbnail"} className="m-auto">
        {thumbNail && (
          <Image src={thumbNail} alt={"Thumbnail"} width={150} height={150} />
        )}
      </td>
      <td key={"title"} className="flex m-1 justify-center items-center">
        {resource.title}
      </td>
      <td className="flex m-1 justify-center items-center">
        {resource.description}
      </td>
      <td key={"likes"} className="flex m-1 justify-center items-center">
        {likes}
      </td>
    </tr>
  );
};

export default SharedResource;
