"use client";

import React from "react";

export interface TypeInputProps {
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (data: string) => void;
}

const Input = ({
  type = "text",
  value,
  placeholder,
  required = false,
  maxLength = 100,
  className = "",
  onChange,
  onKeyDown,
}: TypeInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) onKeyDown(e);
  };
  return (
    <input
      type={type}
      className={`input-common ${className} shadow-sm placeholder-gray-400 focus:outline-none`}
      maxLength={maxLength}
      value={value}
      placeholder={placeholder}
      onChange={(e) => handleChange(e)}
      required={required}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Input;
