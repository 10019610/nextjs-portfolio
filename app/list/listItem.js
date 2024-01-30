"use client";
import axios from "axios";
import Link from "next/link";
import classes from "./list.module.css";

export default function ListItem(props) {
  // const countCheck = () => {
  //   const result = fetch("/api/")
  // }
  return (
    <div className={classes.list}>
      {props.result.map((item, i) => (
        <div className={classes.list_item} key={i}>
          <Link
            href={"/detail/" + props.result[i]._id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <h4>{props.result[i].title}</h4>
          </Link>
          <Link
            href={"/edit/" + props.result[i]._id}
            className={classes.list_btn}
            style={{ textDecoration: "none" }}
          >
            ✏️
          </Link>
          <span
            onClick={(e) => {
              fetch("/api/post/delete", {
                method: "DELETE",
                body: props.result[i]._id,
              }).then(() => {
                e.target.parentElement.style.opacity = 0;
                setTimeout(() => {
                  e.target.parentElement.style.display = "none";
                }, 1000);
              });
            }}
            style={{ cursor: "pointer" }}
          >
            🗑️
          </span>
          <span
            onClick={() => {
              fetch("/api/post/like", {
                method: "post",
                body: props.result[i]._id,
              });
            }}
            style={{ cursor: "pointer" }}
          >
            ❤️
          </span>
          <span>🤍</span>
          <p>
            {new Date(item.createDate).getMonth() + 1}월{" "}
            {new Date(item.createDate).getDate()}일{" "}
            {new Date(item.createDate).getHours()}:
            {String(new Date(item.createDate).getMinutes()).padStart(2, "0")}
          </p>
        </div>
      ))}
    </div>
  );
}
