import { useTranslation } from "react-i18next";
import CatCard from "../components/CatCard/CatCard";

const AvailableCats = () => {
    const { t } = useTranslation();

    return (
        <div className="px-4">
            <h1 className="font-tiny text-primary text-3xl md:text-5xl text-center pb-6">
                {t("cats_page.title")}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                <CatCard />
                <CatCard />
                <CatCard />
                <CatCard />
            </div>
        </div>
    );
};

export default AvailableCats;
