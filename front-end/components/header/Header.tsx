import React from "react";
import Language from "./Language";
import Logo from "./Logo";
import Nav from "./Nav";

type Props = {
  current: string;
  isLoggedIn?: boolean;
};

const Header: React.FC<Props> = ({ current, isLoggedIn }: Props) => {
  return (
    <header role="header" className="pl-20 pt-2 pb-2 flex gap-10 items-center">
      <Logo />
      <Nav current={current} isLoggedIn={isLoggedIn} />
      <Language />
    </header>
  );
};

export default Header;
