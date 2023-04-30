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
    const response = await fetch("http://localhost:2000/api/auth/login", {
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
    <div className="container col-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label  fw-bold">
            Email Address
          </label>
          <input
            onChange={onChange}
            value={credential.email}
            type="email"
            className="form-control border border-primary"
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
            className="form-control border border-primary"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login
