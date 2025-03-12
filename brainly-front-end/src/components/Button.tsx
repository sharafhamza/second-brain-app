import { ReactElement } from "react";

interface buttonTypes {
  title: string;
  variant: "primary" | "secondary";
  icon?: ReactElement;
  className?: string;
  onClick?: () => void;
}
const variantStyles = {
  primary: "text-white bg-primary",
  secondary: "text-primary bg-secondary",
};

const Button = ({ title, variant, icon, className, onClick }: buttonTypes) => {
  return (
    <button
      onClick={onClick}
      className={
        variantStyles[variant] +
        " py-2 px-6 rounded-md ml-4  my-5 flex items-center justify-center text-base cursor-pointer font-medium " +
        className
      }
    >
      {icon ? <div className="mr-2">{icon}</div> : null}
      {title}
    </button>
  );
};

export default Button;
