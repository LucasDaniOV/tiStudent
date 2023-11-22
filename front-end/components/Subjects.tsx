import React from "react";

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
//ik kon de enum Subject ni gebruiken -> required a loader?
const subjects = [
  "Front-End Development",
  "Programming 1",
  "Back-End Development",
  "Programming 2",
  "Computer Systems",
  "Computer Networks",
  "Database Foundations",
  "IT & Business",
  "Introductieproject",
  "IT Industry Discovery",
  "Full-Stack Software Development",
  "Software Engineering",
  "Server & System Management",
  "Data Analytics & Machine Learning",
  "Data Management",
  "IT & Society",
  "Junior Werkplekproject",
  "IT Integratieproject",
  "Advanced AI",
  "Data Engineering",
  "Data Visualisation",
  "Business Solutions Platforms",
  "Innovation Management",
  "User Interfaces",
  "New Medialab Gamification",
  "3D Graphics",
  "Cloud Fundamentals",
  "Wireless Communications",
  "Advanced Networking & Security 1",
  "Advanced Programming",
  "IT Innovation",
  "Senior Werkplekproject",
  "Bachelor Project",
  "Bedrijfsstage",
  "Onderzoeksstage",
  "European University: I living Labs 1",
  "European University: Explore Learning Snacks 1",
  "AI Applications",
  "Data Incubator",
  "Business Solutions Platforms Project",
  "IT Consultancy",
  "Mobile Applications",
  "Extended Reality",
  "New Medialab-UX & UI Design",
  "Internationaal Innovations Labs IT",
  "Bachelor@work Noord-Zuid",
  "Bachelor@work Small Business Project",
  "Enterprise Server Management",
  "Cloud & Operations",
  "Application Security",
  "Advanced Networking & Security 2",
  "Distributed Applications",
  "Cloud Native Engineering",
];
