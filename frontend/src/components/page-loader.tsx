import React from "react";
import { spinner } from "src/assets";

export const PageLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-20 w-20 animate-spin">
        <img src={spinner} alt="Loading..." />
      </div>
    </div>
  );
};
