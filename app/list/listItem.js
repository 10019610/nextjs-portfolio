"use client";
import Link from "next/link";
import classes from "./list.module.css";
import Like from "../components/button/likeButton";

export default function ListItem(props) {
  return (
    <div className={classes.list}>
      {props.result.map((item, i) => (
        <div className={classes.list_item} key={i}>
          {props.result[i].image !== "" ? (
            <Link href={"/detail/" + props.result[i]._id}>
              <img
                src={`https://yjprojectimage.s3.ap-northeast-2.amazonaws.com/${props.result[i].image}`}
              />
            </Link>
          ) : (
            <Link href={"/detail/" + props.result[i]._id}>
              <img src="/logo1.png" />
            </Link>
          )}
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
              }).then((result) => {
                console.log(result.status);
                if (result.status === 500) {
                  alert("본인이 작성한 게시글만 삭제 가능합니다.");
                } else {
                  e.target.parentElement.style.opacity = 0;
                  setTimeout(() => {
                    e.target.parentElement.style.display = "none";
                  }, 1000);
                }
              });
            }}
            style={{ cursor: "pointer" }}
          >
            🗑️
          </span>
          <Like postId={props.result[i]._id} />
          {/* {heart === "❤️" ? (
            <span
              onClick={() => {
                fetch("/api/post/dislike", {
                  method: "DELETE",
                  body: props.result[i]._id,
                }).then((result) => {
                  setHeart("🤍");
                });
              }}
              style={{ cursor: "pointer" }}
            >
              {heart}
            </span>
          ) : (
            <span
              onClick={() => {
                fetch("/api/post/like", {
                  method: "POST",
                  body: props.result[i]._id,
                }).then((result) => {
                  setHeart("❤️");
                });
              }}
              style={{ cursor: "pointer" }}
            >
              {heart}
            </span>
          )} */}

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
