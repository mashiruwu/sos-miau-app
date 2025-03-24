import { useTranslation } from "react-i18next";
import Cat1 from "../../assets/adoption01.jpg";

const CatCard = () => {
    const { t } = useTranslation();

    return (
        <div className="p-4 w-full max-w-sm">
            <div className="flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-200 shadow-md dark:bg-blue-950 dark:border-gray-700">
                <div className="w-full h-64 flex justify-center items-center">
                    <img 
                        src={Cat1} 
                        alt="Gato para Adoção"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>
                <div className="w-full p-2">
                    <button className="w-full px-4 py-2 text-lg font-medium text-white bg-emerald-500 rounded-xl hover:bg-green-500 focus:outline-none dark:bg-emerald-500 dark:hover:bg-emerald-600">
                        {t("cats_page.interest")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CatCard;
