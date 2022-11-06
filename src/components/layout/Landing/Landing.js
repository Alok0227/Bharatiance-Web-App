import React from "react";
import "../../../App.css";
import logo from "./bvp-logo.png";
import { Link } from "react-router-dom";



export const Landing = () => {
    return (
        <div>
            <div data-spy="scroll" data-target="#navbarResponsive" >
                <div id="home">
                    <div className="landing">
                        <div className="home-wrap">
                            <div className="home-inner">
                                <div className="home-bg"></div>
                            </div>
                        </div>
                    </div>
                    <div className="caption" style={{ textAlign: "center" }}>
                        <Link className="" to="/" style={{ position: "relative", bottom: "100px", opacity: "10" }}>
                            <img src={logo} class="rounded mx-auto d-block" alt="..." />
                        </Link>

                        <h1 style={{ "font-family": 'Century Gothic' }}>
                            Welcome to Bharati Vidyapeeth College of Engineering's <br />
                            web-based attendance management system
                        </h1>
                        <Link className="btn btn-primary btn-lg" to="/login">
                            Get Start
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
