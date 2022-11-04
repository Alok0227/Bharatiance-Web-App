import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { loginStudent, studentRegister } from "../../../actions/auth";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import store from "../../../store";
import "../Slide.css";
import logo from "../../auth/bvp-logo.png";


const StudentLogin = ({
  setAlert,
  studentRegister,
  loginStudent,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    roll: "",
    dept: "",
    year: "",
  });

  const { name, email, password, roll, dept, year } = formData;

  let signUpButton = document.getElementById("signUp");
  let signInButton = document.getElementById("signIn");
  let container = document.getElementById("container");

  useEffect(() => {
    signUpButton = document.getElementById("signUp");
    signInButton = document.getElementById("signIn");
    container = document.getElementById("container");
  }, []);

  // const addClass = () => {
  //   container.classList.add("right-panel-active");
  // };

  // const removeClass = () => {
  //   container.classList.remove("right-panel-active");
  // };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const login = async (e) => {
    e.preventDefault();
    loginStudent(email, password);
  };

  const register = async (e) => {
    e.preventDefault();
    studentRegister({ name, email, password, roll, dept, year });
  };

  if (isAuthenticated) {
    return <Redirect to="/student/courses" />;
  }

  return (
    <div className="body">


      <div className="container" id="container" style={{ height: "100px", borderRadius:"20px" }}>

        <form action="#" onSubmit={(e) => login(e)}>
          <Link className="my-10" to="/">
            <img src={logo} alt="logo" style={{ width: "20vw" }} />
          </Link>
          <h1>Sign in</h1>
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

StudentLogin.propTypes = {
  loginStudent: PropTypes.func.isRequired,
  studentRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  setAlert,
  loginStudent,
  studentRegister,
})(StudentLogin);
