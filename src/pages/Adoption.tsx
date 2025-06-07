import { useTranslation } from "react-i18next";
import CatAdoptionPage from "../assets/gato_adocao_page.png";
import { Link } from "react-router-dom";

const AdoptionPage = () => {
    const { t } = useTranslation();

    return (
        <section className="font-afacad">
            <h1 className="font-tiny text-secondary text-5xl text-center">
                {t("adoption_page.title")}
            </h1>

            <img
                src={CatAdoptionPage}
                alt=""
                className="mx-auto w-[800px] max-w-full my-10"
            />

            <p className="text-xl text-center mb-10">
                {t("adoption_page.description")}
            </p>

            <h2 className="font-tiny text-secondary text-4xl text-center">
                {t("adoption_page.requirements_title")}
            </h2>

            <ul className="text-center my-5 text-xl space-y-2">
                <li>{t("adoption_page.requirements_content1")}</li>
                <li>{t("adoption_page.requirements_content2")}</li>
                <li>{t("adoption_page.requirements_content3")}</li>
                <li>{t("adoption_page.requirements_content4")}</li>
            </ul>

            <Link
                to="/cats"
                className="block bg-primary dark:bg-secondary dark:text-white text-secondary w-full sm:w-fit mx-auto my-10 p-4 text-xl sm:text-2xl font-tiny rounded-md shadow-2xl cursor-pointer hover:bg-primary-hover text-center transition-colors"
            >
                {t("adoption_page.see_our_available_cats")}
            </Link>
        </section>
    );
};

export default AdoptionPage;
