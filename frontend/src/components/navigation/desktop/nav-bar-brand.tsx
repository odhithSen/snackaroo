import React from "react";
import { NavLink } from "react-router-dom";
import { logo } from "src/assets";

export const NavBarBrand: React.FC = () => {
  return (
    <div>
      <NavLink to="/">
        <img src={logo} alt="Deliveroo logo" width="122" height="32" />
      </NavLink>
    </div>
  );
};
