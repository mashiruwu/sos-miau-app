import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import MenuItem from "../MenuItem/MenuItem";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useAuth } from "../../context/AuthProvider";
import { useEffect, useState } from "react";

export default function Dropdown() {
    const { t } = useTranslation();
    const { user, ong, signOut } = useAuth();

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

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton
                    className="inline-flex w-full justify-center gap-x-1.5 text-sm font-semibold text-gray-900 cursor-pointer hover:bg-primary-hover rounded-md"
                    aria-label="menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        color="#153151"
                        className="size-10 dark:text-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute left-0 mt-2 w-52 origin-top-left rounded-md bg-white dark:bg-secondary ring-1 ring-primary shadow-lg z-50 focus:outline-none"
            >
                <div className="py-2 text-sm text-black dark:text-white flex flex-col gap-1">
                    <MenuItem to="/">
                        <b>{t("homepage.home")}</b>
                    </MenuItem>
                    <MenuItem to="/about">{t("footer.about_us")}</MenuItem>
                    <MenuItem to="/adoption">{t("footer.want_adopt")}</MenuItem>
                    <MenuItem to="/help">{t("footer.help")}</MenuItem>
                    <MenuItem to="/rescue">{t("footer.rescue")}</MenuItem>
                    <MenuItem to="/adoptedcats">
                        {t("footer.adopted_cats")}
                    </MenuItem>
                    <MenuItem to="/transparency">
                        {t("footer.transparency")}
                    </MenuItem>

                    <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />

                    {/* Mobile Auth & Dark Mode Section */}
                    {user || ong ? (
                        <>
                            <span className="px-4 font-bold">
                                {user?.name || ong?.name}
                            </span>
                            {user && (
                                <>
                                    <MenuItem to="/usersettings">
                                        {t("likes.config")}
                                    </MenuItem>
                                    <MenuItem to="/likes">
                                        {t("likes.like")}
                                    </MenuItem>
                                </>
                            )}
                            {ong && (
                                <>
                                    <MenuItem to="/interest">
                                        {t("table_registeredcats.analysis")}
                                    </MenuItem>
                                    <MenuItem to="/registeredcats">
                                        {t("table_registeredcats.title")}
                                    </MenuItem>
                                    <MenuItem to="/catregister">
                                        {t("table_registeredcats.add_cat")}
                                    </MenuItem>
                                    <MenuItem to="/registeredusers">
                                        {t(
                                            "table_registeredcats.registered_users"
                                        )}
                                    </MenuItem>
                                    <MenuItem to="/matches">Matches</MenuItem>
                                    <MenuItem to="/usersettings">
                                        {t("likes.config")}
                                    </MenuItem>
                                </>
                            )}
                            <button
                                onClick={signOut}
                                className="text-left px-4 py-1 hover:bg-primary/10 dark:hover:bg-white/10"
                            >
                                {t("sign_out")}
                            </button>
                        </>
                    ) : (
                        <>
                            <MenuItem to="/login">
                                <b>{t("login")}</b>
                            </MenuItem>
                            <MenuItem to="/signup">
                                <b>{t("sign_up")}</b>
                            </MenuItem>
                            <MenuItem to="/loginOng">
                                <b>{t("ong_login")}</b>
                            </MenuItem>
                        </>
                    )}

                    <button
                        onClick={toggleDarkMode}
                        className="flex items-center gap-2 px-4 py-1 hover:bg-primary/10 dark:hover:bg-white/10"
                    >
                        {darkMode ? (
                            <>
                                <MdOutlineLightMode size={18} />
                                {t("light_mode")}
                            </>
                        ) : (
                            <>
                                <MdDarkMode size={18} />
                                {t("dark_mode")}
                            </>
                        )}
                    </button>
                </div>
            </MenuItems>
        </Menu>
    );
}
