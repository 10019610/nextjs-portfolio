"use client";

import { useSession } from "next-auth/react";

import React from "react";
import classes from "./Hamburger.module.css";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";
import LoginBtn from "../button/LoginBtn";
import LogoutBtn from "../button/LogoutBtn";

const HamburgerMenu = ({ isOpen, onClose, session }) => {
  return (
    <div className={`${classes.hamburger_menu} ${isOpen ? classes.open : ""}`}>
      <div>
        <span className={classes.head}>
          {session && session.user.name + "님 안녕하세요!"}
        </span>
        <span className={classes.closeBtn}>
          <img src="/close.png" onClick={onClose} />
        </span>
      </div>
      {!session && (
        <span>
          <Link href="/signup" onClick={onClose}>
            <button className={classes.upBtn}>Sign Up</button>
          </Link>
        </span>
      )}
      {!session && (
        <span>
          <LoginBtn />
        </span>
      )}
      {session && (
        <span>
          <LogoutBtn />
        </span>
      )}
      <hr className={classes.hr1} />
      <ul className={classes.menu}>
        <li>
          <Link href="/list" onClick={onClose}>
            LIST
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HamburgerMenu;
