import { Link } from "react-router-dom";

interface MenuItemProps {
    children: React.ReactNode;
    to: string;
}

const MenuItem = ({ children, to }: MenuItemProps) => {
    return (
        <Link
            to={to}
            className="block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden font-afacad uppercase text-primary hover:bg-gray-100"
        >
            {children}
        </Link>
    );
};

export default MenuItem;
