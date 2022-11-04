import React from "react";
import { Link } from "react-router-dom";
import logo from "./bvp-logo.png";

const Choose = () => {
  return (
    <div className="container text-center" style={{ "marginTop": 50 + "px" }}>

      <Link className="my-10" to="/">
        <img src={logo} alt="logo" style={{ color: "white" }} />
      </Link>

      <h1 style={{ "margin": 24 + "px" }}>Welcome to Bharti Vidyapeeth College of Engineering</h1>

      <h3><i class="fas fa-sign-in-alt"></i> LOGIN</h3>

      <div class="d-grid gap-2 col-6 mx-auto">
        <button class="btn btn-danger btn-block" >
          <Link style={{ color: "black", textDecoration: "none" }} to="/faculty/login">STAFF LOGIN</Link>
        </button>
        <button class="btn btn-primary btn-block" >
          <Link style={{ color: "orange", textDecoration: "none" }} to="/student/login">STUDENT LOGIN</Link>
        </button>
      </div>
    </div>
  );
}

export default Choose;
