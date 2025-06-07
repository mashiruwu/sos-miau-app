import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const { t } = useTranslation();

    return (
        <>
            {!isMobile && (
                <footer className="mt-auto h-fit bg-primary py-5 px-18 flex justify-between font-afacad text-[#153151] dark:bg-secondary dark:hover:bg-[#0f2533] transition-colors duration-300 dark:text-white">
                    <div className="w-[45%] flex flex-col gap-2">
                        <h1 className="text-2xl font-tiny">SOS MIAU</h1>
                        <p className="text-md">{t("footer.description")}</p>
                        <p className="mt-2 text-lg">{t("footer.help_us")}</p>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                        <h1 className="text-2xl font-tiny">MENU</h1>
                        <div className="uppercase flex flex-col">
                            <Link
                                to={"/about"}
                                className="hover:underline cursor-pointer"
                            >
                                {t("footer.about_us")}
                            </Link>
                            <Link
                                to={"/adoption"}
                                className="hover:underline cursor-pointer"
                            >
                                {t("footer.want_adopt")}
                            </Link>
                            <Link
                                to={"/help"}
                                className="hover:underline cursor-pointer"
                            >
                                {t("footer.help")}
                            </Link>
                            <Link
                                to={"/rescue"}
                                className="hover:underline cursor-pointer"
                            >
                                {t("footer.rescue")}
                            </Link>
                            <Link
                                to={"/adoptedcats"}
                                className="hover:underline cursor-pointer"
                            >
                                {t("footer.adopted_cats")}
                            </Link>
                            <Link
                                to={"/transparency"}
                                className="hover:underline cursor-pointer"
                            >
                                {t("footer.transparency")}
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-tiny">
                            {t("footer.follow_us")}
                        </h1>
                        <div className="flex gap-4">
                            <FaFacebook size={48} />
                            <FaInstagram size={48} />
                            <FaSquareXTwitter size={48} />
                        </div>
                    </div>
                    <LanguageSwitcher />
                </footer>
            )}
            {isMobile && (
                <footer className="mt-auto h-fit bg-primary py-5 lg:px-20 px-10 flex justify-between gap-5 font-afacad text-white items-center dark:bg-secondary">
                    <h1 className="font-tiny">
                        <span className="font-afacad text-sm">©</span> SOS Miau
                    </h1>
                    <div className="flex justify-evenly gap-4">
                        <FaFacebook data-testid="facebook-icon" size={20} />
                        <FaInstagram data-testid="instagram-icon" size={20} />
                        <FaSquareXTwitter data-testid="twitter-icon" size={20} />
                    </div>
                    <LanguageSwitcher />
                </footer>
            )}
        </>
    );
};

export default Footer;
