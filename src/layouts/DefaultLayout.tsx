import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const DefaultLayout = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isHelp = location.pathname === "/help";
    const isSignupPage = location.pathname === "/Signup";
    const isLoginPage = location.pathname === "/login";
    const isAdoptedCats = location.pathname === "/adoptedcats";

    return (
        <>
            <Header />
            <main className={isLoginPage ? "" : isSignupPage ? "" : isHome || isHelp || isAdoptedCats ? "" : "mt-16 lg:px-[20%] px-[10%]"}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};