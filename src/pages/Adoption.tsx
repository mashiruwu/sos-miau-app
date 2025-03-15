import { useTranslation } from "react-i18next";
import CatAdoptionPage from "../assets/gato_adocao_page.png";

const AdoptionPage = () => {
    const { t } = useTranslation();

    return (
        <section className="font-afacad">
            <h1 className="font-tiny text-primary text-5xl text-center">
                {t("adoption_page.title")}
            </h1>
            <img
                src={CatAdoptionPage}
                alt=""
                className="mx-auto w-[800px] my-10"
            />
            <p className="text-xl text-center mb-10">
                {t("adoption_page.description")}
            </p>
            <h1 className="font-tiny text-primary text-4xl text-center">
                {t("adoption_page.requirements_title")}
            </h1>
            <ul className="text-center my-5">
                <li>{t("adoption_page.requirements_content1")}</li>
                <li>{t("adoption_page.requirements_content2")}</li>
                <li>{t("adoption_page.requirements_content3")}</li>
                <li>{t("adoption_page.requirements_content4")}</li>
            </ul>
            <h1 className="bg-primary text-white mx-auto w-fit my-10 p-3 text-2xl font-tiny rounded-md ">
                {t("adoption_page.see_our_available_cats")}
            </h1>
        </section>
    );
};

export default AdoptionPage;
