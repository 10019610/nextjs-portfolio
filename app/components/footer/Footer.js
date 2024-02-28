import classes from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footers}>
      <p>
        <span>대표자 : 양영조</span>
        <br />
        <span>문의 : a10019610@gmail.com</span>
        <br />
        <span>Copyright © YOUNGJOYANG. All Rights Reserved.</span>
      </p>
    </footer>
  );
};

export default Footer;
