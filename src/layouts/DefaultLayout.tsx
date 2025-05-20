import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const DefaultLayout = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isHelp = location.pathname === "/help";
    const isSignupPage = location.pathname === "/signup";
    const isLoginPage = location.pathname === "/login";
    const isRescuePage = location.pathname === "/rescue";
    const isAdoptedCats = location.pathname === "/adoptedcats";
    const isLoginOng = location.pathname === "/loginOng";
    const inSignUpOng = location.pathname === "/signupOng";

    return (
        <>
            <Header />
            <main
                className={
                    isLoginPage ||
                    isSignupPage ||
                    isHome ||
                    isHelp ||
                    isRescuePage ||
                    isAdoptedCats ||
                    isLoginOng ||
                    inSignUpOng
                        ? ""
                        : "mt-16 lg:px-[20%] px-[10%]"
                }
            >
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
