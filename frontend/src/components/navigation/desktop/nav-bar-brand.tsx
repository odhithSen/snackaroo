import React from "react";
import { NavLink } from "react-router-dom";

export const NavBarBrand: React.FC = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <img
          className="nav-bar__logo"
          src="https://consumer-component-library.roocdn.com/30.40.0/static/images/logo-teal.svg"
          alt="Deliveroo  logo"
          width="122"
          height="36"
        />
      </NavLink>
    </div>
  );
};
