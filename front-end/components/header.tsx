import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header role="heading">
      <a> tiStudent App</a>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/users">Users</Link>
        <Link href="/resources">Resources</Link>
        <Link href="/profiles">Profiles</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
