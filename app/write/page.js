"use client";

import { useState } from "react";

export default function Write() {
  let [src, setSrc] = useState("");
  return (
    <form action="/api/post/newPost" method="POST">
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <div>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            style={{
              margin: "auto",
              width: "800px",
              marginBottom: "1rem",
              fontSize: "40px",
              outline: "none",
              border: "none",
              borderBottom: "3px solid #182145",
              padding: "10px",
            }}
          />

          <textarea
            style={{
              width: "800px",
              height: "400px",
              border: "none",
              padding: "10px",
              resize: "none",
              outline: "none",
            }}
            placeholder="내용을 입력해주세요."
          />
          <input
            style={{ margin: "auto" }}
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
              Object.entries({ ...res.fields, file }).forEach(
                ([key, value]) => {
                  formData.append(key, value);
                }
              );
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
          <button
            style={{ marginLeft: "45%" }}
            type="submit"
            className="btn btn-secondary mb-3"
          >
            제출하기
          </button>
        </div>
        <img src={src} />
      </div>
    </form>
  );
}
