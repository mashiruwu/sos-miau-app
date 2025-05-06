import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import MenuItem from "../MenuItem/MenuItem";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface UserDropdownProps {
  userName: string;
  onSignOut: () => void;
}

export default function UserDropdown({ userName, onSignOut }: UserDropdownProps) {
  const { t } = useTranslation();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 text-sm font-semibold text-gray-900 cursor-pointer hover:bg-primary-hover rounded-md" aria-label="user-menu">
          <span className="uppercase dark:text-white">{userName}</span>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 mt-2 w-42 origin-top-right rounded-md bg-white ring-1 ring-primary transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem to="/usersettings">
            {t("Configurações")}
          </MenuItem>
          <MenuItem to="/likes">
            {t("likes.like")}
          </MenuItem>
          <button
            onClick={onSignOut}
            className="block w-full text-left px-4 py-2 text-sm font-afacad uppercase text-secondary dark:text-primary hover:bg-gray-100"
          >
            {t("Sign Out")}
          </button>
        </div>
      </MenuItems>
    </Menu>
  );
}
