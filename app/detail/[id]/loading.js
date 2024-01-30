import classes from "./loading.module.css";

function Loading() {
  return (
    <div className={classes.loadingbar}>
      <div className={classes.loading}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Loading;
