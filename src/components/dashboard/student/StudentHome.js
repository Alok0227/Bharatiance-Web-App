import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../../layout/Spinner";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCourses, getAttendance, getAvg } from "../../../actions/student";
import { loadStudent } from "../../../actions/auth";
import { logout } from "../../../actions/auth";
import Card from "./Card";
import Sidebar from "./Sidebar";
import "./style.css";
import Footer from "./Footer";

const StudentHome = ({
  getAvg,
  getAttendance,
  getCourses,
  logout,
  loadStudent,
  student: { loading, courses, avg },
  auth: { user },
}) => {
  useEffect(() => { getCourses(); }, [getCourses]);

  useEffect(() => { getAvg(); loadStudent(); }, [getAvg]);

  let percent = Math.ceil(avg.avg);

  let ongoing = courses.filter((course) => {
    if (course.archived == 0) return course;
  });

  return !user ? (
    <Spinner />
  ) : (
    <div className="grid-container">
      <header className="header" style={{"backgroundColor":"black"}}>
        <div className="header__logo" >Attendance DashBoard</div>
        <div className="responsive-sidebar">
          <div className="inner-responsive-sidebar">

            <Link style={{ color: "white", fontWeight: "500px" }} to="/student/courses">
              <span className="">Dashboard</span>
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
          <div className="main-header">
            <div className="main-header__heading">
              <h1 style={{ "fontFamily": "courier-new" }}>
                {user.name}{" "}   -  {user.roll}
              </h1>
              <h4>
                {user.dept} -{user.year}{" "}
              </h4>
            </div>
            <div className="d-flex justify-content-end">
              <img src={process.env.PUBLIC_URL + `/images/logo.png`} />
            </div>
          </div>
        </div>

        <div className="main-overview" style={{ color: "white" }}>
          {ongoing.map((course) => (
            <ul className="card_container">
              <Card course={course} />
            </ul>
          ))}
        </div>

        <br />

        <div className="card" style={{width:'90%', margin:'10px auto'}}>
          <h2>
            <b>Average Attendance Record</b>
          </h2>
          <h6>Number of classes attended till date : {avg.present}</h6>
          <div className={`c100 p${percent}`}>
            <span>
              <b>{percent}%</b>
            </span>
            <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
            </div>
          </div>
        </div>

        {percent >= 75 ? (
          <div className="card" style={{ backgroundColor: "green", color: "white" }}>
            <h4>
              <u>Eligibility (cut-off 75%):</u>
            </h4>
            <h1> Eligible </h1>
          </div>
        ) : (
          <>
            <div className="card" style={{ backgroundColor: "red", color: "white" }}>
              <h4>
                <u>Eligibility (cut-off 75%)</u>
              </h4>
              <h1> Not Eligible </h1>
            </div>

            <div className="card" style={{ "marginTop": "10px" }}>
              <h2>Generate an Low Attendance Report</h2>
              <button className="btn btn-primary mx-10">
                <a href={process.env.PUBLIC_URL + `/Documents/Report.pdf`} target="_blank"
                  rel="noreferrer">
                  Generate the Report
                </a>
              </button>
            </div>
          </>
          


        )}
      </main>

      <Footer/>
    </div>
  );
};

StudentHome.propTypes = {
  getCourses: PropTypes.func.isRequired,
  getAvg: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  getAttendance: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  loadStudent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCourses,
  getAttendance,
  getAvg,
  loadStudent,
})(StudentHome);
