"use client";

import React from "react";

interface TypeInputProps {
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  onChange?: (data: string) => void;
}

const Input = ({
  type = "text",
  value,
  placeholder,
  className,
  onChange,
}: TypeInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <input
      type={type}
      className={`input-common ${className}`}
      value={value}
      placeholder={placeholder}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default Input;
