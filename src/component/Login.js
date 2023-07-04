// it is a login page where user will be authenticated
// learn more about useNavigate

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  let history = useNavigate();

  const [credential, setcredential] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here we are fetching data directly from the api
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    // ____________________________________________________________________________________________

    // to redirect the page
    if (json.success){
      localStorage.setItem("token",json.authtoken);
      props.showAlert("Logged in Succesfully", "success");
      history("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }

    // ____________________________________________________________________________________________
  };

  const onChange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="">
      <div className="container p-5 col-4 background1">
      <form onSubmit={handleSubmit}>
        <div className="mt-1 mb-4 text-center">
          <h4 className="">Login Page</h4>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="form-label  fw-bold">
            Email Address
          </label>
          <input
            onChange={onChange}
            value={credential.email}
            type="email"
            className="form-control "
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <input
            value={credential.password}
            onChange={onChange}
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary glow-on-hover glowing ">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login