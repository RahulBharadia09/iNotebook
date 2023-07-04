import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

const Signup = (props) => {

    let history = useNavigate();
    const [credential, setcredential] = useState({name:"", email:"", password:""});
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const {name,email,password} = credential;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
            body:JSON.stringify({
              name,email,password
            }),
        });
  
      const json = await response.json();
      console.log(json);
  
      // to redirect the page after user is created
      if (json.success){
        localStorage.setItem("token",json.authtoken);
        props.showAlert("Logged in Succesfully", "success");
        history("/");
      } else {
        props.showAlert("Invalid Credentials", "danger");
      }


    };
  
    const onChange = (e) => {
      setcredential({ ...credential, [e.target.name]: e.target.value });
    };


  return (
    <div className="container my-3 fw-bold col-6 background1 p-5 " >
      <form onSubmit={handleSubmit}>

        <div className="name">
          <h4 className="text-center mb-4">SignUp</h4>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
             Name
          </label>
          <input 
          name="name"
          onChange={onChange}
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
          />
          
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input 
          name="email"
          onChange={onChange}
            type="email"
            className="form-control "
            id="email"
            aria-describedby="emailHelp"
          />
          
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
          name="password" 
          onChange={onChange} 
          type="password" 
          className="form-control " 
          id="password" 
          minLength={5} 
          required />
        </div>
        <div className="mb-4">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
          name="cpassword"  
          onChange={onChange} type="password" className="form-control " id="cpassword" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-outline-primary glow-on-hover glowing ">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup