import { useState } from "react";
import { useTranslation } from "react-i18next";
import Cat1 from "../../assets/rescue_cat.png";

const defaultCat = {
    id: 1,
    name: "Margot",
    gender: "Fêmea",
    race: "SRD",
    birthday: "1 ano e 6 meses",
    description:
        "Demora um pouquinho para se acostumar com o ambiente, então precisa de um humano paciente!",
    behaviour: "Brincalhona",
    photo_url: Cat1,
};

const CatCard = ({ cat = defaultCat }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [adopted, setAdopted] = useState(false);

    return (
        <>
            <div className="p-4 w-fit max-w-sm">
                <div className="flex flex-col items-center p-4 w-[250px] rounded-2xl bg-primary dark:bg-secondary border-gray-200 shadow-md">
                    <div className="w-full h-64 flex justify-center items-center">
                        <img
                            src={cat.photo_url}
                            alt={`Foto de ${cat.name}`}
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                    <div className="w-full p-2 flex flex-col items-center gap-2">
                        <button
                            onClick={() => {
                                setIsOpen(true);
                                setAdopted(false);
                            }}
                            className="w-full px-4 py-2 text-lg font-medium text-white bg-secondary dark:bg-primary rounded-xl hover:bg-[#4E6988] cursor-pointer focus:outline-none"
                        >
                            {t("cats_page.interest")}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50 lg:px-0 px-4"
                    onClick={() => setIsOpen(false)}
                    role="dialog"
                >
                    <div
                        className="relative bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full dark:bg-primary-hover transition-transform transform scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-1 cursor-pointer right-2 text-gray-600 hover:text-gray-900"
                        >
                            ✖
                        </button>

                        {!adopted ? (
                            <div className="flex lg:flex-col flex-col gap-5 lg:items-start items-center">
                                <img
                                    src={cat.photo_url}
                                    alt={`Foto de ${cat.name}`}
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                                <div className="flex flex-col gap-4 w-full">
                                    <h1 className="font-tiny text-black dark:text-white text-xl uppercase">
                                        {cat.name}
                                    </h1>
                                    <ul className="text-black dark:text-white font-afacad">
                                        <li>• {cat.gender}</li>
                                        <li>• {cat.birthday}</li>
                                        <li>• {cat.race}</li>
                                        <li>• {cat.description}</li>
                                        <li>• {cat.behaviour}</li>
                                    </ul>
                                    <button
                                        onClick={() => setAdopted(true)}
                                        className="bg-secondary dark:bg-primary  px-6 py-2 rounded-md font-tiny text-white cursor-pointer hover:bg-[#4E6988] text-lg transition-all uppercase"
                                    >
                                        {t("cats_page.button_adopt")}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-black dark:text-white font-tiny">
                                    {t("cats_page.thanks_for_adopting")}
                                </h2>
                                <p className="dark:text-white text-black mt-2 font-afacad text-xl">
                                    {t(
                                        "cats_page.thanks_for_adopting_description"
                                    )}
                                </p>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="mt-4 px-6 py-2 bg-secondary dark:bg-primary text-white rounded-md hover:bg-[#4E6988] cursor-pointer font-tiny uppercase"
                                >
                                    {t(
                                        "cats_page.thanks_for_adopting_close_button"
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default CatCard;
