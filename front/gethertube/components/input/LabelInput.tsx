import { Input } from "../index";

interface TypeLabelInputProps {
  label: string;
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (data: string) => void;
}

const LabelInput = ({ label, value, type, onChange }: TypeLabelInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs-normal text-content-white">{label}</span>
      <Input value={value} onChange={onChange} type={type} />
    </div>
  );
};

export default LabelInput;
