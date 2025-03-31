import { InputHTMLAttributes } from "react";

interface InputFieldProps {
    type: InputHTMLAttributes<HTMLInputElement>["type"];
    name: string;
    value: InputHTMLAttributes<HTMLInputElement>["value"];
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}

const InputField = ({
    type,
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    required,
}: InputFieldProps) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className="border-b-2 border-[#153151] w-full p-2"
            required={required}
            placeholder={placeholder}
        />
    );
};

export default InputField;
