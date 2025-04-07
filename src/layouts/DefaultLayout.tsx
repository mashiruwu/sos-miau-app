import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const DefaultLayout = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isHelp = location.pathname === "/help";
    const isSignupPage = location.pathname === "/signup";
    const isLoginPage = location.pathname === "/login";
<<<<<<< HEAD
    const isRescuePage = location.pathname === "/rescue";
=======
    const isAdoptedCats = location.pathname === "/adoptedcats";
>>>>>>> cc10a1c9ed94d34819bdce146b421725abe9c36b

    return (
        <>
            <Header />
            <main
                className={
<<<<<<< HEAD
                    isLoginPage ||
                    isSignupPage ||
                    isHome ||
                    isHelp ||
                    isRescuePage
=======
                    isLoginPage || isSignupPage || isHome || isHelp || isAdoptedCats
>>>>>>> cc10a1c9ed94d34819bdce146b421725abe9c36b
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
