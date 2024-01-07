import { Subject } from "@/types";
import React from "react";

type Props = {
  visible: boolean;
  func: (e: string) => void;
  filter: string;
  subjects: Subject[];
};

const Subjects: React.FC<Props> = ({ visible = false, func, filter, subjects }: Props) => {
  const showing = subjects
    .filter((sub) => (filter.trim() !== "" ? sub.name.startsWith(filter) : true))
    .filter((sub) => sub.name.toLowerCase() !== filter.toLowerCase());
  return (
    <ul id="subjects" className="subjects" style={{ display: visible ? "unset" : "none" }}>
      {showing.map((sub, index) => (
        <li
          className="pl-2"
          key={index}
          onClick={() => func(sub.name)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              func(sub.name);
            }
          }}
        >
          {sub.name}
        </li>
      ))}
    </ul>
  );
};

export default Subjects;
