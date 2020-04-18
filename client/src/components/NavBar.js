import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useGlobalStore } from "./GlobalStore";

/* activePage  | changePage-call-back */
function NavBar() {
  const location = useLocation();

  const style = {
      logo: { width: '64px', height: '64px' }
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
          <img src='https://www.dalmio-dent.md/wp-content/uploads/2016/11/Untitled-6.png' alt="" style={style.logo} />
      </Link>
     
      <div id="navbarSupportedContent"> {/* <div className={showClass} id="navbarSupportedContent"></div> */}
        <ul class="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/search" className={location.pathname === "/search" || location.pathname === "/" ? "nav-link active" : "nav-link"}>
              Search
            </Link>
          </li>  
          <li className="nav-item">
            <Link to="/saved" className={location.pathname === "/saved" ? "nav-link active" : "nav-link"}>
              Saved
            </Link>
          </li>  
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;