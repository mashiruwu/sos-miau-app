import { ReactNode } from "react";

interface ParagraphProps {
    children: ReactNode | ReactNode[];
    text_size?: string;
    text_color?: string;
}

const Paragraph = ({ children }: ParagraphProps) => {
    return <p>{children}</p>;
};

export default Paragraph;
