import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const DefaultLayout = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isHelp = location.pathname === "/help";
    return (
        <>
            <Header />
            <main
                className={isHome || isHelp ? "" : "mt-16 lg:px-[20%] px-[10%]"}
            >
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
