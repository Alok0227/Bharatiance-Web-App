import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import Sidebar from "./Sidebar";
import { getCourses } from "../../../actions/faculty";
import "./style.css";
import { loadFaculty } from "../../../actions/auth";
import { logout } from "../../../actions/auth";
import Footer from "./Footer";

const FacultyHome = ({
  getCourses,
  logout,
  loadFaculty,
  faculty: { courses },
  auth: { user },
}) => {
  useEffect(() => {
    getCourses();
    loadFaculty();
  }, [getCourses]);

  let ongoing = courses.filter((course) => {
    if (course.archived == 0) return course;
  });

  return !user ? (
    <Spinner />
  ) : (
    <div className="grid-container">
      <header className="header" style={{ "background": "black", "padding": "10px" }}>
        <div className="header__logo">Attendance DashBoard</div>
        <div className="responsive-sidebar">
          <div className="inner-responsive-sidebar">

            <Link style={{ color: "white", fontWeight: "500px" }} to="/faculty/courses">
              <span className="">Dashboard</span>
            </Link>

            <Link style={{ color: "white", fontWeight: "500px" }} to="/faculty/create">
              <span className="">Create Course</span>
            </Link>

            <Link style={{ color: "white", fontWeight: "500px" }} to="/faculty/chat" >
              <span className="">Class Rooms </span>
            </Link>


            <Link to="/" style={{ color: "white", fontWeight: "500px" }}>
              <span onClick={logout}>Logout</span>
            </Link>
          </div>
        </div>
      </header>

      <Sidebar user={user} />

      <main className="main">
        <div className="container_head">
          <div className="main-header" style={{ backgroundColor: "white" }}>
            <div className="main-header__heading">
              <h1 style={{ fontWeight: "200px" }}>Prof. {user.name}</h1>
              <h4 style={{ fontSize: "18px" }}>{user.dept} department faculty</h4>
            </div>
            <div className="d-flex justify-content-end">
              {(user.name === "Sanjay Kadam") ?
                (<img src={process.env.PUBLIC_URL + `/images/sk.jpg`} />)
                : (user.name === "Hitendra Chavan") ?
                  (<img src={process.env.PUBLIC_URL + `/images/hn.jpg`} />)
                  :
                  (<img src={process.env.PUBLIC_URL + `/images/sp.jpg`} />)
              }
            </div>
          </div>
        </div>

        <h1 style={{ paddingLeft: "30px", fontFamily: "courier new" }}>Lectures </h1>
        <div class="card">
          <div class="card-body">
            Nothing to Show here.
          </div>
        </div>
        <br />
      </main>
      <Footer />
    </div>
  );
};

FacultyHome.propTypes = {
  getCourses: PropTypes.func.isRequired,
  loadFaculty: PropTypes.func.isRequired,
  faculty: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  faculty: state.faculty,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCourses, loadFaculty, logout })(FacultyHome);
