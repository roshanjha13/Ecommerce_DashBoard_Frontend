import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/login");
    }
  }, []);

  const submitData = async () => {
    // console.log(name, email, password);
    let result = await fetch("http://localhost:5000/user/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // console.log(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    if (result) {
      navigate("/");
    }
  };
  return (
    <div className="register">
      <div className="register_inner">
        <h1>Register</h1>
        <input
          className="inputbox"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter name"
        />
        <input
          className="inputbox"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter email"
        />
        <input
          className="inputbox"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter password"
        />
        <button onClick={submitData} className="button" type="button">
          SignUp
        </button>
      </div>
    </div>
  );
};

export default SignUp;
