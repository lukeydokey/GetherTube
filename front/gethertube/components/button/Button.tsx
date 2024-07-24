"use client";
export interface TypeButtonProps {
  children: React.ReactNode;
  type?: "default" | "primary";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button = ({
  children,
  type = "default",
  className,
  onClick,
}: TypeButtonProps) => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };
  return (
    <button
      className={`${className} button text-xs-normal rounded ${type} `}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
};

export default Button;
