import { Subject } from "@/types";
import React from "react";
import th1 from "../public/images/default-thumbnail1.jpg";
import th2 from "../public/images/default-thumbnail2.jpg";
import th3 from "../public/images/default-thumbnail3.jpg";
import Image from "next/image";

type Props = {
  visible: boolean;
  func: (e: string) => void;
};

const Thumbnails: React.FC<Props> = ({ visible = false, func }: Props) => {
  return (
    <ul
      id="thumbnails"
      className="thumbnails"
      style={{ display: visible ? "unset" : "none" }}
    >
      {[th1, th2, th3].map((sub, index) => (
        <li
          className="ml-2"
          key={index}
          onClick={() => {
            if (
              sub.src === "/_next/static/media/default-thumbnail1.e0c3b69c.jpg"
            ) {
              func("default-thumbnail1.jpg");
            } else if (
              sub.src === "/_next/static/media/default-thumbnail2.e0c3b69c.jpg"
            ) {
              func("default-thumbnail2.jpg");
            } else {
              func("default-thumbnail3.jpg");
            }
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (
                sub.src ===
                "/_next/static/media/default-thumbnail1.e0c3b69c.jpg"
              ) {
                func("default-thumbnail1.jpg");
              } else if (
                sub.src ===
                "/_next/static/media/default-thumbnail2.e0c3b69c.jpg"
              ) {
                func("default-thumbnail2.jpg");
              } else {
                func("default-thumbnail3.jpg");
              }
            }
          }}
        >
          <Image src={sub.src} alt={sub.src} width={50} height={50} />
        </li>
      ))}
    </ul>
  );
};

export default Thumbnails;
