import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const DefaultLayout = () => {
    const location = useLocation();

    // Verifica se a rota atual é "/signup"
    const isSignupPage = location.pathname === "/Signup";

    return (
        <>
            <Header />
            <main className={isSignupPage ? "" : "mt-16 lg:px-[20%] px-[10%]"}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};