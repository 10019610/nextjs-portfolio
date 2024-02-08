"use client";

import { useState } from "react";

export default function Write() {
  let [src, setSrc] = useState("");
  return (
    <form action="/api/post/newPost" method="POST">
      <input
        type="text"
        name="title"
        className="form-control mt-4 mb-2"
        placeholder="제목을 입력해주세요."
        required
      />
      <div className="form-group">
        <textarea
          className="form-control"
          rows="10"
          name="content"
          placeholder="내용을 입력해주세요"
          required
        ></textarea>
      </div>
      <input
        type="file"
        accept="image/*"
        name="image"
        onChange={async (e) => {
          let file = e.target.files[0];
          let filename = encodeURIComponent(file.name);
          let res = await fetch("/api/post/image?file=" + filename);
          res = await res.json();
          console.log(res);

          const formData = new FormData();
          Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
          });
          let 업로드결과 = await fetch(res.url, {
            method: "POST",
            body: formData,
          });
          console.log(업로드결과);

          if (업로드결과.ok) {
            setSrc(업로드결과.url + "/" + filename);
          } else {
            console.log("실패");
          }
        }}
      />
      <img src={src} />
      <button type="submit" className="btn btn-secondary mb-3">
        제출하기
      </button>
    </form>
  );
}
