"use client";

import React from "react";

interface TypeInputProps {
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (data: string) => void;
}

const Input = ({ type = "text", value, onChange }: TypeInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <input
      type={type}
      className="input-common"
      value={value}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default Input;
