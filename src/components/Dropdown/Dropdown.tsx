import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import MenuItem from "../MenuItem/MenuItem";

export default function Dropdown() {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-gray-300 ring-inset cursor-pointer hover:bg-primary-hover rounded-md">
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
                className="absolute left-0 z-10 mt-2 w-42 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <div className="py-1">
                    <MenuItem to="#">Sobre nós</MenuItem>
                    <MenuItem to="#">Quero adotar</MenuItem>
                    <MenuItem to="#">Quero ajudar</MenuItem>
                    <MenuItem to="#">Resgate</MenuItem>
                    <MenuItem to="#">Gatos adotados</MenuItem>
                    <MenuItem to="#">Transparência</MenuItem>
                </div>
            </MenuItems>
        </Menu>
    );
}
