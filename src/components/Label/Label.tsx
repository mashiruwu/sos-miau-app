interface LabelProps {
    children: React.ReactNode;
}

const Label = ({ children }: LabelProps) => {
    return <label className="text-[#153151] mr-4">{children}</label>;
};

export default Label;
