"use client"; // this is a client component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./signup.module.css";
import Link from "next/link";

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
      alert("이미 " + data + " 계정으로 가입된 이메일입니다.");
      // throw new Error(data.message || "아이디 생성 실패");
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
    // router.push("/signin");
  };

  return (
    <div className={classes.base}>
      <form className={classes.form}>
        <Link href="/">
          <img className={classes.headLogo} src="/logo1.png" />
        </Link>
        <div className={classes.headName}>Sign in to 0_J0.log</div>
        <div>
          <input
            className={classes.inputBox}
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
            className={classes.inputBox}
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
            className={classes.inputBox}
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
            className={classes.inputBox}
            placeholder="PasswordCheck"
            type="password"
            value={passwordCheck}
            onChange={handlePasswordCheckChange}
            required
          />
        </div>

        <button onClick={handleSubmit} className={classes.btn}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
