"use client";
import { useEffect, useState } from "react";

export default function Like(props) {
  let [like, setLike] = useState(0);
  let [heart, setHeart] = useState("🤍");

  useEffect(() => {
    fetch("/api/post/likeFunc", {
      method: "POST",
      body: props.postId,
    })
      .then((r) => {
        return r.json();
      })
      .then((result) => {
        setHeart(result.heart);
        setLike(result.likeCount);
      });
  }, [heart]);
  return (
    <div>
      <span>{like}</span>

      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          fetch("/api/post/like", {
            method: "POST",
            body: props.postId,
          }).then((r) => {
            if (r.status === 500) {
              alert("로그인이 필요합니다.");
              return;
            }
            console.log(r.status);
          });
          setLike();
          setHeart();
        }}
      >
        {heart}
      </span>
    </div>
  );
}
