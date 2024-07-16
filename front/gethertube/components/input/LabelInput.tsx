import { Input } from "../index";

interface TypeLabelInputProps {
  label: string;
}

const LabelInput = ({ label }: TypeLabelInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs-normal text-content-white">{label}</span>
      <Input />
    </div>
  );
};

export default LabelInput;
