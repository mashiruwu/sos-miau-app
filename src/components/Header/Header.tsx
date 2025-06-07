import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import UserDropdown from "../UserDropdown/UserDropdown";
import OngDropdown from "../OngDropdown/OngDropdown";
import HeaderLink from "./HeaderLink/HeaderLink";
import { useTranslation } from "react-i18next";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useAuth } from "../../context/AuthProvider";

const Header = () => {
    const { t } = useTranslation();
    const { user, ong, signOut } = useAuth();
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(false);

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

    const handleSignOut = () => {
        signOut();
        navigate("/");
    };

    return (
        <div className="header sticky top-0 w-full h-26 flex items-center justify-between px-4 lg:px-10 bg-primary text-[#153151] dark:bg-secondary dark:hover:bg-[#0f2533] transition-colors duration-300 dark:text-white z-50">
            
            {/* Hamburguer Menu - SEMPRE visível */}
            <Dropdown
                user={user}
                ong={ong}
                signOut={handleSignOut}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
            />

            {/* Logo centralizada */}
            <Link
                to="/"
                className="font-tiny absolute left-1/2 transform -translate-x-1/2 lg:text-5xl text-4xl text-center lg:w-fit"
            >
                SOS Miau
            </Link>

            {/* Botões do lado direito - apenas no desktop */}
            <div className="lg:flex items-center gap-6 text-md uppercase hidden">
                {user || ong ? (
                    ong ? (
                        <OngDropdown ongName={ong.name} onSignOut={handleSignOut} />
                    ) : (
                        <UserDropdown userName={user?.name} onSignOut={handleSignOut} />
                    )
                ) : (
                    <>
                        <HeaderLink to="/login">{t("login")}</HeaderLink>
                        <HeaderLink to="/signup">{t("sign_up")}</HeaderLink>
                        <span>|</span>
                        <HeaderLink to="/loginOng">{t("ong_login")}</HeaderLink>
                    </>
                )}
                <button onClick={toggleDarkMode} className="ml-2">
                    {darkMode ? (
                        <MdOutlineLightMode size={28} />
                    ) : (
                        <MdDarkMode size={28} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Header;
