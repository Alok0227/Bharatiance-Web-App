import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../../layout/Spinner";
import { connect } from "react-redux";
import { getCourses } from "../../../actions/faculty";
import { logout } from "../../../actions/auth";
import Card from "./Card";
import Sidebar from "./Sidebar";
import "./style.css";
import Footer from "./Footer";

const FacRoom = ({
  getCourses,
  logout,
  faculty: { loading, courses },
  auth: { user },
}) => {
  useEffect(() => {
    getCourses();
  }, [getCourses]);
  return loading ? (
    <Spinner />
  ) : (
    <div className="grid-container">
      <header className="header">
        <div className="header__logo">Attendance DashBoard</div>
      </header>

      <Sidebar user={user} />

      <main className="main">
        <h1 style={{ marginLeft: "100px", marginTop: "20px" }}>Chatrooms: </h1>

        <div className="main-overview" style={{ color: "white" }}>
          {courses.map((course, i) => (
            <ul key={i}>
              <Link to={`/faculty/chat/${course.course}/${course.year}`}>
                <Card course={course} />
              </Link>
            </ul>
          ))}
        </div>
      </main>
      <Footer/>
    </div>
  );
};

FacRoom.propTypes = {
  getCourses: PropTypes.func.isRequired,
  faculty: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  faculty: state.faculty,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCourses })(FacRoom);
