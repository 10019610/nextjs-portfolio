"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Comment(props) {
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  // console.log(reply);

  const inputHandler = (e) => {
    // if (comment) {
    // e.preventDefault();
    fetch("/api/comment/newComment", {
      method: "POST",
      body: JSON.stringify({
        comment: comment,
        parent: props.parentId,
      }),
    }).then(() => {
      setComment("");
    });
    // }
  };
  const onSubmit = () => {
    inputHandler();
  };
  const keyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  // console.log(reply);

  useEffect(() => {
    fetch("/api/comment/list?id=" + props.parentId)
      .then((r) => r.json())
      .then((data) => {
        setReply(data.result);
      });
  }, []);

  return (
    <div className="card my-4">
      <form className="">
        <input
          className="form-control"
          value={comment}
          placeholder="COMMENT"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          onKeyDown={keyDown}
        />
        {/* <button onClick={(e) => {}}>댓글전송</button> */}
      </form>
      <button onClick={() => inputHandler()}>댓글 작성</button>
      {reply.length > 0
        ? reply.map((a, i) => (
            <section className="mb-2" key={i}>
              <div className="card bg-light">
                <div className="card-body">
                  <div className="d-flex mb-0">
                    <div className="flex-shrink-0">
                      {a.image ? (
                        <img
                          className="rounded-circle"
                          src={a.image}
                          alt="..."
                          style={{ width: "50px" }}
                        />
                      ) : (
                        <img
                          className="rounded-circle"
                          src="/unknown_user2.png"
                          alt="..."
                          style={{ width: "50px" }}
                        />
                      )}
                      {/* {user && (
                        <img
                          className="rounded-circle"
                          src={user.user.image}
                          alt="..."
                          style={{ width: "50px" }}
                        />
                      )} */}
                    </div>
                    <div className="ms-3">
                      <div className="fw-bold">{a.author}</div>

                      <p className="mt-2 mb-0">{a.comment}</p>
                      <span>
                        <span>
                          {new Date(a.createDate).getMonth() + 1}월{" "}
                          {new Date(a.createDate).getDate()}일
                        </span>
                        <span
                          onClick={(e) => {
                            fetch("/api/comment/delete", {
                              method: "DELETE",
                              body: a._id,
                            }).then(() => {
                              fetch("/api/comment/list?id=" + props.parentId)
                                .then((r) => r.json())
                                .then((data) => {
                                  setReply(data.result);
                                });
                            });
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          🗑️
                        </span>
                      </span>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))
        : "댓글없음"}
    </div>
  );
}
