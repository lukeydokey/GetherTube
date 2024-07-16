export interface TypeButtonProps {
  children: React.ReactNode;
  type?: "default" | "primary";
  className?: string;
}
const Button = ({ children, type = "default", className }: TypeButtonProps) => {
  return (
    <button
      className={`button h-5 text-sm-normal rounded ${type} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
