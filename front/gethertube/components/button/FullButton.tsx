import { Button } from "..";
import { TypeButtonProps } from "../types";
const FullButton = (props: TypeButtonProps) => {
  const { className, children, ...others } = props;
  return (
    <Button className={`h-8 text-sm-normal ${className}`} {...others}>
      {children}
    </Button>
  );
};

export default FullButton;
