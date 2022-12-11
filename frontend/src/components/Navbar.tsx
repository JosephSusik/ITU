import React from "react";
import "../index.css"
import { Link } from "react-router-dom"

function Navbar() {
    return(
        <div>
            <div className="navbar">
            <div className="navbar_left">
                <li>
                    <Link to="/" className="link">PAGENAME</Link>
                </li>
            </div>
            <div className="navbar_mid">
                <input type="text" className="navbar_search" placeholder="Hledat..."></input>
                <button className="navbar_button"><b>Hledat</b></button>
            </div>
            <div className="navbar_right">
                <li>
                    <Link to="/profile" className="link">PROFILE</Link>
                </li>
            </div>
        </div>
        </div>
    );
}

export default Navbar;