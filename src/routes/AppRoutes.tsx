import { Route, Routes } from "react-router-dom";
import { FullPageLayout } from "../layouts/FullPageLayout";
import Home from "../pages/Home";
import { DefaultLayout } from "../layouts/DefaultLayout";
import About from "../pages/About";
import AdoptionPage from "../pages/Adoption";
import { TransparencyPage } from "../pages/Transparency";
import AvailableCats from "../pages/AvailableCats";
import Signup from "../pages/Signup";
import HelpPage from "../pages/Help";
import Login from "../pages/Login";
import Rescue from "../pages/Rescue";
import AdoptedCats from "../pages/AdoptedCats";
import CatRegister from "../pages/CatRegister";
import UserSettings from "../pages/UserSettings";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<FullPageLayout />}>
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/adoption" element={<AdoptionPage />} />
                    <Route
                        path="/transparency"
                        element={<TransparencyPage />}
                    />
                    <Route path="/cats" element={<AvailableCats />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/rescue" element={<Rescue />} />
                    <Route path="/adoptedcats" element={<AdoptedCats />} />
                    <Route path="/catregister" element={<CatRegister />} />
                    <Route path="/usersettings" element={<UserSettings />} />
                </Route>
            </Route>
        </Routes>
    );
};
