import React, { useState } from "react";
import subjects from "./subjects";

type Props = {
  visible: boolean;
  func: (e: string) => void;
  filter: string;
};

const Subjects: React.FC<Props> = ({
  visible = false,
  func,
  filter,
}: Props) => {
  const showing = subjects
    .filter((sub) => (filter.trim() !== "" ? sub.startsWith(filter) : true))
    .filter((sub) => sub.toLowerCase() !== filter.toLowerCase());
  return (
    <ul
      id="subjects"
      className="subjects"
      style={{ display: visible ? "unset" : "none" }}
    >
      {showing.map((sub, index) => (
        <li
          key={index}
          onClick={() => func(sub)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              func(sub);
            }
          }}
        >
          {sub}
        </li>
      ))}
    </ul>
  );
};

export default Subjects;
