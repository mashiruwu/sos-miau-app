import { Link } from "react-router-dom";

interface HeaderLinkProps {
    children: React.ReactNode;
    to: string;
}

const HeaderLink = ({ to, children }: HeaderLinkProps) => {
    return (
        <Link
            to={to}
            className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full font-afacad"
        >
            {children}
        </Link>
    );
};

export default HeaderLink;
