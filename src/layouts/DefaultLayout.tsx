import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const DefaultLayout = () => {
    return (
        <>
            <Header />
            <main className="mt-16 px-25">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
