interface ButtonProps {
    children: React.ReactNode;
}

const SubmitButton: React.FC<ButtonProps> = ({ children }) => {
    return (
        <button
            type="submit"
            className="col-span-2 mt-6 w-full bg-[#153151] text-white py-2 rounded-lg hover:bg-[#0f2533] transition-colors duration-300"
        >
            {children}
        </button>
    );
};

export default SubmitButton;
