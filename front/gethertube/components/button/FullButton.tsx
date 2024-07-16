import { Button } from "..";
import { TypeButtonProps } from "../types";
const FullButton = ({ children, className, type }: TypeButtonProps) => {
  return (
    <Button className={`h-8 ${className}`} type={type}>
      {children}
    </Button>
  );
};

export default FullButton;
