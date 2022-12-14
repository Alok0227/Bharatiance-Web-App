import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";
import logo from "../../auth/bvp-logo.png";

export const Sidebar = ({ auth: { user }, logout }) => {
  return (
    <aside className="sidenav" style={{ "borderBottomRightRadius": '10px', "backgroundColor": "white" }}>

      <div className="sidenav__close-icon">
        <i className="fas fa-times sidenav__brand-close"></i>
      </div>
      <ul className="sidenav__list">
        <Link className="my-10" to="/" >
          <img src={logo} alt="logo" style={{ color: "white", "width": 150 + "px", "margin": 42 + "px", "borderRadius": 10 + "px" }} />
        </Link>
        
        <li className="sidenav__list-item">
          <b style={{ fontWeight: "700px", fontSize: "22px", color: "black" }}>
            Welcome,
            <br />
            {user.name}!
          </b>
        </li>

        <Link style={{ color: "white", fontWeight: "500px" }} to="/student/courses">
          {" "}
          <li className="sidenav__list-item" style={{ color: "black" }}>
            <b>Dashboard</b>{" "}
          </li>
        </Link>

        <Link to="/" style={{ color: "white", fontWeight: "500px" }}>
          {" "}
          <li className="sidenav__list-item" onClick={logout} style={{ color: "black" }}>
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
