import React from "react"

interface InputFieldProps {
  type: string
  placeholder: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border rounded-md p-2 mr-2 ${className}`}
    />
  )
}

export default InputField
