import { useEffect, useState } from "react";
import AdoptedCarousel from "../components/AdoptedCatCarousel/AdoptedCarousel";
import LandingCarousel from "../components/LandingCarousel/LandingCarousel";
import { useTranslation } from "react-i18next";
import { Cat } from "../components/AdoptedCatCarousel/AdoptedCarousel";

const AdoptedCats = () => {
    const { t } = useTranslation();
    const [adoptedCats, setAdoptedCats] = useState<Cat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdoptedCats = async () => {
            setLoading(true);
            try {
                const API = (import.meta as any).env.VITE_API_URL; 
                const response = await fetch(`${API}/cat`); 
                if (!response.ok) throw new Error("Erro ao buscar gatos");
                const data = await response.json();
                const adopted = (data as Cat[]).filter(
                    (cat) => cat.adopted === true || cat.adopted === "Sim"
                );
                setAdoptedCats(adopted);
            } catch (error) {
                setAdoptedCats([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAdoptedCats();
    }, []);

    return (
        <div>
            <LandingCarousel />
            <div className="lg:px-[20%] px-[10%]">
                <h1 className="font-tiny text-secondary text-3xl md:text-5xl text-center pt-10 md:pt-20">
                    {t("adopted_cats.title")}
                </h1>
                <div className="flex flex-wrap justify-center text-center font-afacad text-lg md:text-xl px-4 md:px-0 pt-6 md:pt-10">
                    <p className="pb-3 md:pb-5">{t("adopted_cats.text1")}</p>
                    <p>{t("adopted_cats.text2")}</p>
                </div>
                <AdoptedCarousel cats={adoptedCats} loading={loading} />
                <div className="flex flex-wrap justify-center text-center font-afacad text-lg md:text-xl px-4 md:px-0 pb-10 md:pb-20">
                    <p>{t("adopted_cats.text3")}</p>
                    <p>{t("adopted_cats.text4")}</p>
                </div>
            </div>
        </div>
    );
};

export default AdoptedCats;