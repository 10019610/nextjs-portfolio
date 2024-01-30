"use client";
import { signOut } from "next-auth/react";
import classes from "./btn.module.css";

export default function LogoutBtn() {
  return (
    <button
      className={classes.btn}
      onClick={() => {
        signOut();
      }}
    >
      LOGOUT
    </button>
  );
}
