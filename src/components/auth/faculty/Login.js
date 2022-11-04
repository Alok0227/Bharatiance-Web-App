import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { loginFaculty, facultyRegister } from "../../../actions/auth";
import PropTypes from "prop-types";
import store from "../../../store";
import "../Slide.css";
import logo from "../../auth/bvp-logo.png";


const FacultyLogin = ({
  setAlert,
  facultyRegister,
  loginFaculty,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dept: "",
  });

  const { name, email, password, dept } = formData;

  let signUpButton = document.getElementById("signUp");
  let signInButton = document.getElementById("signIn");
  let container = document.getElementById("container");

  useEffect(() => {
    signUpButton = document.getElementById("signUp");
    signInButton = document.getElementById("signIn");
    container = document.getElementById("container");
  }, []);


  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const login = async (e) => {
    e.preventDefault();
    console.log(formData);
    loginFaculty(email, password);
  };

  // const register = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   facultyRegister({ name, email, password, dept });
  // };

  if (isAuthenticated) {
    return <Redirect to="/faculty/courses" />;
  }

  return (
    <div className="body">


      <div className="container" id="container" style={{ height: "100px", borderRadius: "20px" }}>

        <form action="#" onSubmit={(e) => login(e)}>
          <Link className="my-10" to="/">
            <img src={logo} alt="logo" style={{ width: "20vw" }} />
          </Link>
          <h1> Faculty Sign in</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => onChange(e)}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => onChange(e)}
            autoComplete="off"
          />
          <button>Sign In</button>
        </form>
      </div>
    </div>
  );
};

FacultyLogin.propTypes = {
  loginFaculty: PropTypes.func.isRequired,
  facultyRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  setAlert,
  loginFaculty,
  facultyRegister,
})(FacultyLogin);
