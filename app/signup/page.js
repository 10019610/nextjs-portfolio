"use client"; // this is a client component

import { useEffect, useState } from "react";
import "./signup.css";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const router = useRouter();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  async function createUser(param) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "아이디 생성 실패");
    }
    return data;
  }
  const signupParam = {
    name: name,
    email: email,
    password: password,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("회원가입");
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      passwordCheck === ""
    ) {
      return alert("공백없이 입력해주세요");
    } else if (password !== passwordCheck) {
      return alert("입력된 비밀번호를 확인하십시오");
    }
    const result = await createUser(signupParam);
    router.push("/signin");
  };

  return (
    <div className="base">
      <form className="form">
        <div>
          <input
            className="inputBox"
            placeholder="Name"
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <input
            className="inputBox"
            placeholder="E-Mail"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <input
            className="inputBox"
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <input
            className="inputBox"
            placeholder="PasswordCheck"
            type="password"
            value={passwordCheck}
            onChange={handlePasswordCheckChange}
            required
          />
        </div>

        <button onClick={handleSubmit} className="btn">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
