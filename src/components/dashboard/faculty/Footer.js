import React from 'react'
import "./style.css";

function Footer() {
    return (
        <footer className="footer" style={{ backgroundColor: "lightblue", color: "black", borderRadius: "10px" }}>
            <div className="footer__copyright">&copy; BVCOENM</div>
            <div className="footer__signature">
                Bharati Vidyapeeth College Of Engineering
            </div>
        </footer>
    )
}

export default Footer