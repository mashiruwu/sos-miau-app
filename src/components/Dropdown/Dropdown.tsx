import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import MenuItem from "../MenuItem/MenuItem";
import { useTranslation } from "react-i18next";

export default function Dropdown() {
    const { t } = useTranslation();

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 text-sm font-semibold text-gray-900  cursor-pointer hover:bg-primary-hover rounded-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        color="white"
                        className="size-10"
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
                className="absolute left-0 mt-2 w-42 origin-top-right rounded-md bg-white ring-1 ring-primary transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <div className="py-1">
                    <MenuItem to="/about">{t("footer.about_us")}</MenuItem>
                    <MenuItem to="/adoption">{t("footer.want_adopt")}</MenuItem>
                    <MenuItem to="#">{t("footer.help")}</MenuItem>
                    <MenuItem to="#">{t("footer.rescue")}</MenuItem>
                    <MenuItem to="#">{t("footer.adopted_cats")}</MenuItem>
                    <MenuItem to="#">{t("footer.transparency")}</MenuItem>
                    <div className="lg:hidden block">
                        <MenuItem to="#">
                            <b>{t("login")}</b>
                        </MenuItem>
                        <MenuItem to="#">
                            <b>{t("sign_up")}</b>
                        </MenuItem>
                    </div>
                </div>
            </MenuItems>
        </Menu>
    );
}
