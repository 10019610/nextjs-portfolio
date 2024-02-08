"use client";
import { signIn } from "next-auth/react";
import classes from "./btn.module.css";

export default function LoginBtn() {
  return (
    <button
      className={classes.btn}
      onClick={() => {
        signIn();
      }}
    >
      LOGIN
    </button>
  );
}
