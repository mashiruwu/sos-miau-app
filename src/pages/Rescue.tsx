import { InfoCarousel } from "../components/InfoCarousel/InfoCarousel";
import RescueCat from "../assets/rescue_cat.png";
import Polenta from "../assets/polenta.png";
import { useTranslation } from "react-i18next";

const Rescue = () => {
    const { t } = useTranslation();

    const infoSlides = [
        {
            id: 1,
            title: "Luna",
            image: RescueCat,
            content: (
                <>
                    <p>{t("rescue.slides.luna")}</p>
                </>
            ),
        },
        {
            id: 2,
            title: "Polenta",
            image: Polenta,
            content: (
                <>
                    <p>{t("rescue.slides.polenta")}</p>
                </>
            ),
        },
        {
            id: 3,
            title: "Ragnar",
            image: RescueCat,
            content: (
                <>
                    <p>{t("rescue.slides.ragnar")}</p>
                </>
            ),
        },
        {
            id: 4,
            title: "Billy",
            image: RescueCat,
            content: (
                <>
                    <p>{t("rescue.slides.billy")}</p>
                </>
            ),
        },
        {
            id: 5,
            title: "Lily",
            image: RescueCat,
            content: (
                <>
                    <p>{t("rescue.slides.lily")}</p>
                </>
            ),
        },
        {
            id: 6,
            title: "Amora",
            image: RescueCat,
            content: (
                <>
                    <p>{t("rescue.slides.amora")}</p>
                </>
            ),
        },
    ];

    return (
        <section className="mb-30 flex flex-col gap-10">
            <img
                src="https://jpimg.com.br/uploads/2023/06/10-dicas-para-cuidar-de-um-gato-filhote.jpg"
                className="w-full h-[500px] object-cover"
            />
            <h1 className="text-center text-5xl font-tiny uppercase text-secondary ">
                Resgates
            </h1>
            <InfoCarousel slides={infoSlides} />
        </section>
    );
};

export default Rescue;
