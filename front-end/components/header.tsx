import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    setUser(sessionStorage.getItem("loggedInUser"));
  }, [user]);
  return (
    <header role="heading">
      <a> tiStudent App</a>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/users">Users</Link>
        <Link href="/resources">Resources</Link>
        <Link href="/profiles">Profiles</Link>
        <Link href="/login">{user ? "Logout" : "Login"}</Link>
      </nav>
    </header>
  );
};

export default Header;
