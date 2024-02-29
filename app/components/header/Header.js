"use client"; // this is a client component

import React, { useDebugValue, useEffect, useState } from "react";
import HamburgerButton from "./HamburgerButton";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";
import classes from "./Header.module.css";
import { useSession } from "next-auth/react";
import LogoutBtn from "../button/LogoutBtn";
import LoginBtn from "../button/LoginBtn";
import Image from "next/image";

const Header = () => {
  const [user, setUser] = useState({});
  // const session = useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  // console.log(session);

  useEffect(() => {}, []);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={classes.header}>
      <div className={classes.nav}>
        <HamburgerButton onClick={handleMenuClick} />
        <div className={classes.logo}>
          <Link href="/">
            <img src="/logo.jpg" />

            {/* 내가 만드는 홈페이지 */}
          </Link>
        </div>
        {session ? (
          <span>
            <div className={classes.logData}>
              <img
                className="rounded-circle"
                src={session.user.image}
                alt="..."
                style={{ width: "50px", marginRight: "0.5rem" }}
              />
              {session.user.name}님 <LogoutBtn />
            </div>
          </span>
        ) : (
          <span className={classes.logData}>
            <LoginBtn></LoginBtn>
          </span>
        )}
      </div>
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={handleCloseMenu}
        session={session}
      />
    </header>
  );
};

export default Header;
