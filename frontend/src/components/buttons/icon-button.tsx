import React, { Children } from "react";
import { Home } from "lucide-react";

interface ResponsiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
}

export default function ResponsiveButton({
  icon = <Home className="h-4 w-4" />,
  className = "",
  children,
  ...props
}: ResponsiveButtonProps) {
  return (
    <button
      className={`flex items-center justify-center h-10 px-4 py-2 bg-white text-teal-500 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors duration-200 ${className}`}
      {...props}
    >
      {icon}
      <span className="text-black ml-2 hidden sm:inline overflow-ellipsis overflow-hidden whitespace-nowrap">
        {children}
      </span>
    </button>
  );
}
