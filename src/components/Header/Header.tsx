import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import UserDropdown from "../UserDropdown/UserDropdown";
import HeaderLink from "./HeaderLink/HeaderLink";
import { useTranslation } from "react-i18next";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { t } = useTranslation();
    const userId = sessionStorage.getItem("userId");
    const [darkMode, setDarkMode] = useState(false);

    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const getUser = async () => {
        if (!userId) return;
        console.log("Fetching user with ID:", userId);

        try {
            const response = await fetch(
                `http://localhost:3000/adopter/${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                console.error("Failed to fetch user");
                return;
            }

            const data = await response.json();
            console.log("User fetched successfully:", data);
            setUser(data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        getUser();
    }, [userId]);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const navigate = useNavigate();

    const handleSignOut = () => {
        sessionStorage.removeItem("userId");
        setUser(null);
        setShowDropdown(false);
        navigate("/");
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove("dark");
            setDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <div className="header sticky h-26 top-0 w-full flex items-center lg:justify-between px-2 lg:px-10 bg-primary text-[#153151] dark:bg-secondary dark:text-white z-50">
            <Dropdown />
            <Link
                to="/"
                className="font-tiny absolute left-1/2 transform -translate-x-1/2 lg:text-5xl text-4xl text-center lg:w-fit w-full"
            >
                SOS Miau
            </Link>

            {user ? (
                <div className="lg:flex items-center gap-6 text-md uppercase lg:visible hidden">
                    <UserDropdown
                        userName={user.name}
                        onSignOut={handleSignOut}
                    />
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
                    <HeaderLink to="/loginOng">É uma ONG?</HeaderLink>

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
