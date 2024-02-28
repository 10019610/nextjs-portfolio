"use client";

import firestore from "./firestore";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState();

  const onClickUpLoadButton = async () => {
    //    addDoc(collection(db       , "컬렉션이름") , { 추가할 데이터 }
    await addDoc(collection(firestore, `temp`), {
      value,
    });
  };

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <input onChange={(event) => setValue(event.target.value)} />
        <button onClick={onClickUpLoadButton}>전송</button>
      </form>
    </div>
  );
}
