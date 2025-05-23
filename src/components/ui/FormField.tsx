import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder = "",
  required = true,
}) => {
  return (
    <div className="space-y-1">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === "textarea" ? (
        <textarea
          id={name}
          {...register(name)}
          placeholder={placeholder}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }`}
          rows={3}
        />
      ) : (
        <input
          type={type}
          id={name}
          {...register(name)}
          placeholder={placeholder}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }`}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default FormField;