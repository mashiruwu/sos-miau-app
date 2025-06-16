import { useState } from "react";
import { useTranslation } from "react-i18next";
import Cat1 from "../../assets/rescue_cat.png";
import { useAuth } from "../../context/AuthProvider"; 
import { useNavigate } from "react-router-dom"; 

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
    const { user } = useAuth(); 
    const navigate = useNavigate();

    return (
        <>
            <div className="p-4 w-full max-w-xs sm:max-w-sm">
                <div className="flex flex-col items-center p-4 w-full rounded-2xl bg-secondary border-gray-200 shadow-md">
                    <div className="w-full h-48 sm:h-64 flex justify-center items-center">
                        <img
                            src={cat.photo_url}
                            alt={`Foto de ${cat.name}`}
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                    <div className="w-full p-2 flex flex-col items-center gap-2">
                        <button
                            onClick={() => {
                                if (!user) {
                                    navigate("/login");
                                } else {
                                    setIsOpen(true);
                                    setAdopted(false);
                                }
                            }}
                            className="w-full px-4 py-2 text-lg font-medium text-white bg-[#254D70] hover:bg-[#21415c]  rounded-xl hover:bg- cursor-pointer focus:outline-none"
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
                            className="relative bg-white p-4 sm:p-6 rounded-2xl shadow-lg max-w-[95vw] sm:max-w-lg w-full dark:bg-primary-hover transition-transform transform scale-100"
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
                                    <h1 className="font-tiny text-[#EFE4D2] text-xl uppercase">
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
                                        onClick={async () => {
                                            setAdopted(true);
                                            try {
                                                // @ts-ignore
                                                const API = import.meta.env.VITE_API_URL;
                                                await fetch(`${API}/cat/${cat.id}`, {
                                                    method: "PUT",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ adopted: true }), //"Sim" ??
                                                });
                                            } catch (error) {
                                                console.error("Erro ao atualizar status de adoção:", error);
                                            }
                                        }}
                                        className="bg-white  px-6 py-2 rounded-md font-tiny text-[#254D70] cursor-pointer hover:bg-zinc-200 text-lg transition-all uppercase"
                                    >
                                        {t("cats_page.button_adopt")}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-[#5694c7] font-tiny">
                                    {t("cats_page.thanks_for_adopting")}
                                </h2>
                                <p className="dark:text-[#788ea1] text-[#788ea1] mt-2 font-afacad text-xl">
                                    {t(
                                        "cats_page.thanks_for_adopting_description"
                                    )}
                                </p>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="mt-4 px-6 py-2 bg-[#254D70] text-white rounded-md hover:bg-[#21415c] cursor-pointer font-tiny uppercase"
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
