import { useTranslation } from "react-i18next";
import LandingCarousel from "../components/LandingCarousel/LandingCarousel";
import { Slider } from "../components/Slider/Slider";

const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            <LandingCarousel />
            <div className="py-20 px-4">
                <h1 className="font-tiny text-6xl text-center text-primary">
                    {t("homepage.match")}
                </h1>
                <p className="font-afacad text-xl text-primary text-center">
                    {t("homepage.match_description")}
                </p>
                <Slider></Slider>
            </div>
        </>
    );
};

export default Home;
