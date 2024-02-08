"use client";
import { useEffect, useState } from "react";

export default function Like(props) {
  let [like, setLike] = useState(0);
  let [heart, setHeart] = useState("🤍");

  //   useEffect(() => {
  //     fetch(`/api/likeapi/b?id=${props.postId}`)
  //       .then((r) => {
  //         return r.json();
  //       })
  //       .then((result) => {
  //       });
  //   }, [like]);

  useEffect(() => {
    fetch("/api/post/likeFunc", {
      method: "POST",
      body: props.postId,
    })
      .then((r) => {
        return r.json();
      })
      .then((result) => {
        console.log(result.heart);
        console.log(result.likeCount);
        setHeart(result.heart);
        setLike(result.likeCount);
      });
  }, [heart]);
  return (
    <div>
      <span
        onClick={() => {
          fetch("/api/post/like", {
            method: "POST",
            body: props.postId,
          });
          setLike();
          setHeart();
        }}
      >
        {heart}
      </span>
      <span>{like}</span>
    </div>
  );
}
