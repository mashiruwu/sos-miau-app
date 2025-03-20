import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const DefaultLayout = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isHelp = location.pathname === "/help";
    const isSignupPage = location.pathname === "/Signup";

    return (
        <>
            <Header />
            {/* Remove as classes de margem/padding apenas para a página de Signup */}
            <main className={isSignupPage ? "" : isHome || isHelp ? "" : "mt-16 lg:px-[20%] px-[10%]"}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};