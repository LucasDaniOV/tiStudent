import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header role="heading">
      <h1>tiStudent App</h1>
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
