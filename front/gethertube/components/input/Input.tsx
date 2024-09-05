"use client";

import React, { forwardRef } from "react";

export interface TypeInputProps {
  ref?: any;
  name: string;
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (data: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input = forwardRef<HTMLInputElement, TypeInputProps>(
  (
    {
      type = "text",
      name,
      value,
      placeholder,
      required = false,
      maxLength = 100,
      className = "",
      disabled = false,
      onChange,
      onKeyDown,
      onFocus,
      onBlur,
    },
    ref?
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDown) onKeyDown(e);
    };

    const handleFocus = () => {
      if (onFocus) onFocus();
    };

    const handleBlur = () => {
      if (onBlur) onBlur();
    };

    return (
      <input
        ref={ref}
        type={type}
        name={name}
        className={`input-common shadow-sm placeholder-gray-400 focus:outline-none ${className}`}
        maxLength={maxLength}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        required={required}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
