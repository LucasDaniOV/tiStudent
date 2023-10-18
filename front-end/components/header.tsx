import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <a> tiStudent App</a>
      <nav>
        <div>
          <Link href="/">Home</Link>
          <Link href="/users">Users</Link>
          <Link href="/resources">Resources</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
