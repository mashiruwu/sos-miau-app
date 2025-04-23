import AdoptedCarousel from "../components/AdoptedCatCarousel/AdoptedCarousel"
import LandingCarousel from "../components/LandingCarousel/LandingCarousel"
import { useTranslation } from "react-i18next";


const AdoptedCats = () => {
    const { t } = useTranslation();
    
    return (
        <div>
            <LandingCarousel/>
            <div>       
                <h1 className="font-tiny text-secondary text-3xl md:text-5xl text-center pt-20">
                    {t("adopted_cats.title")}
                </h1>                   
                <div className="flex flex-wrap pr-15 pl-15 pt-15 justify-center text-center font-afacad text-xl">
                    <p className = "pb-5">{t("adopted_cats.text1")}</p>
                    <p>{t("adopted_cats.text2")}</p>
                </div>
                <AdoptedCarousel/>
                <div className="flex flex-wrap pb-20 justify-center text-center font-afacad text-xl">
                    <p>{t("adopted_cats.text3")}</p>
                    <p>{t("adopted_cats.text4")}</p>
                </div>

            </div>
        </div>
    )

    
}

export default AdoptedCats