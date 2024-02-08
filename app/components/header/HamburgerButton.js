import React from "react";
import classes from "./Hamburger.module.css";
const HamburgerButton = ({ onClick }) => {
  return (
    <button className={classes.hamburger_button} onClick={onClick}>
      <span className={classes.hamburger_line}></span>
      <span className={classes.hamburger_line}></span>
      <span className={classes.hamburger_line}></span>
    </button>
  );
};

export default HamburgerButton;
