import React from "react";

interface IButton {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactElement;
  disable?: boolean;
}

const Button: React.FC<IButton> = ({ children, className, onClick, icon, disable }) => {
  return (
    <button
      
      disabled={disable}
      className={`h-11 flex items-center justify-center gap-1 bg-secondary text-white p-2 rounded  ${className}`}
      onClick={onClick}
    >
      {" "}
      {icon}
      {children}
    </button>
  );
};

export default Button;
