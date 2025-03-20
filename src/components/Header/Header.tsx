import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import HeaderLink from "./HeaderLink/HeaderLink";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation();

    return (
        <div className="header h-26 top-0 w-full flex items-center lg:justify-between px-2 lg:px-10 bg-primary text-white">
            <Dropdown />
            <Link
                to="/"
                className="font-tiny lg:text-5xl text-4xl text-center lg:w-fit w-full"
            >
                SOS Miau
            </Link>
            <div className="lg:flex items-center gap-6 text-md uppercase lg:visible hidden">
                <HeaderLink to="/login">{t("login")}</HeaderLink>
                <HeaderLink to="/signup">{t("sign_up")}</HeaderLink>
            </div>
        </div>
    );
};

export default Header;
