import { Input } from "../index";

interface TypeLabelInputProps {
  label: string;
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  maxLength?: number;
  onChange?: (data: string) => void;
}

const LabelInput = ({
  label,
  value,
  type,
  required = false,
  maxLength,
  onChange,
}: TypeLabelInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs-normal text-content-white">{label}</span>
      <Input
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        type={type}
        required={required}
      />
    </div>
  );
};

export default LabelInput;
