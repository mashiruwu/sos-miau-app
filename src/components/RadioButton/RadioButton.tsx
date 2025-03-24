import { InputHTMLAttributes } from "react";

interface RadioButtonProps {
    type: InputHTMLAttributes<HTMLInputElement>["type"];
    name: string;
    value: InputHTMLAttributes<HTMLInputElement>["value"];
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
}

const RadioButton = ({
    type,
    name,
    value,
    onFocus,
    onBlur,
    onChange,
    checked,
}: RadioButtonProps) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            checked={checked}
            className="mr-1"
        />
    );
};

export default RadioButton;
