"use client"; // this is a client component

import { useEffect, useState } from "react";
import "./signin.css";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GithubLoginButton } from "react-social-login-buttons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [providers, setProviders] = useState(null);

  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    }).then((result) => {
      if (result.ok) router.push("/");
      if (result.error) setError(true);
    });
    // console.log(email, password);
  };

  const signupRouter = () => {
    router.push("/signup");
  };

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="base">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            className="inputBox"
            placeholder="E-Mail"
            type="text"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <input
            className="inputBox"
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button type="submit" className="signinBtn">
            Sign In
          </button>
        </div>
        <div>
          <img
            src="/kakao_login.png"
            onClick={() =>
              signIn("kakao", { redirect: true, callbackUrl: "/" })
            }
            style={{ cursor: "pointer", width: "20rem" }}
          />
        </div>

        <div>
          <GithubLoginButton
            style={{ width: "20rem", fontSize: "0.85rem", borderRadius: "4px" }}
            onClick={() =>
              signIn("github", { redirect: true, callbackUrl: "/" })
            }
          >
            <span style={{ marginLeft: "4.3rem" }}>Login with GitHub</span>
          </GithubLoginButton>
        </div>

        <div>
          <button className="signupBtn" onClick={signupRouter}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
