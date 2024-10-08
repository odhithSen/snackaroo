import React from "react";
import { NavBar } from "./navigation/desktop/nav-bar";
import { PageFooter } from "./page-footer";

interface Props {
  children: JSX.Element;
}

export const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
      <PageFooter />
    </div>
  );
};
