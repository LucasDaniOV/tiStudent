import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="pl-20 pr-20 pt-2 pb-2 bg-gradient-to-b from-black to-tistudent-blue">
      <div className="flex flex-col">
        <h1 className="text-xl text-white">Contact:</h1>
        <span className="text-lg">davy.bellens@student.ucll.be</span>
        <span className="text-lg">lucas.oudevrielink@student.ucll.be</span>
      </div>
      <div className="flex justify-center">
        <p className="text-md">&copy; 2024 - tiStudent</p>
      </div>
    </footer>
  );
};

export default Footer;
