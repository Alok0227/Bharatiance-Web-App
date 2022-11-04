import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";
import logo from "../../auth/bvp-logo.png"



export const Sidebar = ({ auth: { user }, logout }) => {
  return (
    <aside className="sidenav" style={{ "borderBottomRightRadius": '10px', "backgroundColor": "white" }}>
      <ul className="sidenav__list">
        <Link className="my-10" to="/" >
          <img src={logo} alt="logo" style={{ color: "white", "width": 150 + "px", "margin": 42 + "px", "borderRadius": 10 + "px" }} />
        </Link>
        <li className="sidenav__list-item">
          <b style={{ fontWeight: "700px", fontSize: "22px", color:"black" }}>
            Welcome,
            <br />
            {user.name}!
          </b>
        </li>

        <Link  to="/faculty/courses">
          <li className="sidenav__list-item" style={{color:"black"}}>
            <b>Dashboard</b>
          </li>
        </Link>

        <Link  to="/faculty/create" >
          <li className="sidenav__list-item" style={{color:"black"}}>
            <b>Create Course</b>
          </li>
        </Link>

        <Link  to="/faculty/chat" >
          <li className="sidenav__list-item" style={{color:"black"}}>
            <b>My Classrooms</b>
          </li>
        </Link>

        <Link  to="/faculty/archives">
          <li className="sidenav__list-item" style={{color:"black"}}>
            <b>Archived courses</b>{" "}
          </li>
        </Link>

        <Link to="/" >
          <li className="sidenav__list-item" style={{color:"black"}} onClick={logout}>
            <b>Logout</b>{" "}
          </li>
        </Link>
      </ul>
    </aside>
  );
};

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Sidebar);
