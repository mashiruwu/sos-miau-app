import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const DefaultLayout = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    return (
        <>
            <Header />
            <main className="mt-16 lg:px-[10%] px-[10%]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
