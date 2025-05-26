import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import UserDropdown from "../UserDropdown/UserDropdown";
import HeaderLink from "./HeaderLink/HeaderLink";
import { useTranslation } from "react-i18next";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import OngDropdown from "../OngDropdown/OngDropdown";
import { useAuth } from "../../context/AuthProvider";

const Header = () => {
    const { t } = useTranslation();
    const { user, ong, signOut } = useAuth();

    const [darkMode, setDarkMode] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    console.log(showDropdown)
    
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut();
        setShowDropdown(false);
        navigate("/");
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        document.documentElement.classList.toggle("dark", newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");
    };

    return (
        <div className="header sticky h-26 top-0 w-full flex items-center lg:justify-between px-2 lg:px-10 bg-primary text-[#153151] dark:bg-secondary dark:hover:bg-[#0f2533] transition-colors duration-300 dark:text-white z-50">
            <Dropdown />
            <Link
                to="/"
                className="font-tiny absolute left-1/2 transform -translate-x-1/2 lg:text-5xl text-4xl text-center lg:w-fit w-full"
            >
                SOS Miau
            </Link>

            {user || ong ? (
                <div className="lg:flex items-center gap-6 text-md uppercase lg:visible hidden">
                    {ong ? (
                        <OngDropdown
                            ongName={ong.name}
                            onSignOut={handleSignOut}
                        />
                    ) : (
                        <UserDropdown
                            userName={user?.name}
                            onSignOut={handleSignOut}
                        />
                    )}
                    <button onClick={toggleDarkMode} className="ml-2">
                        {darkMode ? (
                            <MdOutlineLightMode size={28} />
                        ) : (
                            <MdDarkMode size={28} />
                        )}
                    </button>
                </div>
            ) : (
                <div className="lg:flex items-center gap-6 text-md uppercase lg:visible hidden">
                    <HeaderLink to="/login">{t("login")}</HeaderLink>
                    <HeaderLink to="/signup">{t("sign_up")}</HeaderLink>
                    <span>|</span>
                    <HeaderLink to="/loginOng">{t("ong_login")}</HeaderLink>

                    <button onClick={toggleDarkMode} className="ml-2">
                        {darkMode ? (
                            <MdOutlineLightMode size={28} />
                        ) : (
                            <MdDarkMode size={28} />
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
