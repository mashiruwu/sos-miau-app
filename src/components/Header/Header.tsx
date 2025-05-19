import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import UserDropdown from "../UserDropdown/UserDropdown.tsx";
import HeaderLink from "./HeaderLink/HeaderLink";
import { useTranslation } from "react-i18next";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/types";

const Header = () => {
    const { t } = useTranslation();
    const userId = sessionStorage.getItem("userId");
    const [darkMode, setDarkMode] = useState(false);

    const [user, setUser] = useState<User | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const getUser = async () => {
        if (!userId) return;

        const urls = [
            `http://localhost:3000/donorOng/${userId}`,
            `http://localhost:3000/adopter/${userId}`,
        ];

        try {
            const results = await Promise.allSettled(
                urls.map((url) =>
                    fetch(url).then((res) => {
                        if (!res.ok) throw new Error("Not found");
                        return res.json();
                    })
                )
            );

            const successfulResult = results.find(
                (r) => r.status === "fulfilled"
            );

            if (successfulResult && successfulResult.status === "fulfilled") {
                setUser(successfulResult.value);
            } else {
                console.warn("Nenhum usuário encontrado.");
                setUser(null);
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            setUser(null);
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
                className="font-tiny lg:text-5xl text-4xl text-center lg:w-fit w-full"
            >
                SOS Miau
            </Link>

            {user ? (
                <div className="lg:flex items-center gap-6 text-md uppercase lg:visible hidden">
                    <UserDropdown user={user} onSignOut={handleSignOut} />
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
