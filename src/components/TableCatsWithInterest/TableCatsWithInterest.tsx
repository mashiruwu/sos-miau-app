import catIcon from "../../assets/cat_icon_registered.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Gato } from "../../types/types";
import ClipLoader from "react-spinners/ClipLoader";

const TableCatsWithInterest = () => {
    const { t } = useTranslation();

    const [gatos, setGatos] = useState<Gato[]>([]);
    const [loading, setLoading] = useState(true);

    const IdOng = sessionStorage.getItem("ongId");

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const API = import.meta.env.VITE_API_URL;

                const response = await fetch(
                    API + "/donorOng/catsWithInterest",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ IdOng }),
                    }
                );

                if (!response.ok)
                    throw new Error("Erro ao buscar gatos com interesse");

                const data = await response.json();
                setGatos(data.response);
            } catch (error) {
                console.error("Erro ao carregar gatos com interesse:", error);
            } finally {
                setLoading(false);
            }
        };

        if (IdOng) fetchCats();
        else console.warn("idOng não encontrado!");
    }, [IdOng]);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="p-8 font-afacad">
            <h1 className="text-4xl font-tiny text-secondary mb-4">
                {t("cats_interest.title")}
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <ClipLoader color="#4F46E5" size={35} />
                </div>
            ) : (
                <table className="w-full table-auto border-collapse overflow-hidden text-sm">
                    <thead>
                        <tr className="text-center text-secondary text-lg">
                            <th className="p-3"> </th>
                            <th className="p-3">{t("cats_interest.name")}</th>
                            <th className="p-3">{t("cats_interest.gender")}</th>
                            <th className="p-3">
                                {t("cats_interest.birthdate")}
                            </th>
                            <th className="p-3">Número de interessados</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="py-10 text-center">
                                    <ClipLoader color="#4F46E5" size={30} />
                                </td>
                            </tr>
                        ) : (
                            gatos.map((gato, index) => (
                                <tr
                                    key={index}
                                    className="border-t hover:bg-gray-50 text-lg text-secondary text-center"
                                >
                                    <td className="p-3">
                                        <img
                                            src={gato.photo_url || catIcon}
                                            alt=""
                                            className="rounded-full w-10 h-10 cursor-pointer hover:scale-105 transition-transform duration-200"
                                            onClick={() =>
                                                setSelectedImage(
                                                    gato.photo_url || catIcon
                                                )
                                            }
                                        />
                                    </td>
                                    <td className="p-3">{gato.name}</td>
                                    <td className="p-3">{gato.gender}</td>
                                    <td className="p-3">{gato.birthday}</td>
                                    <td className="p-3">
                                        {gato.interest_count}
                                    </td>
                                    <td className="p-3">
                                        <Link to={`/interest/cat/${gato.id}`}>
                                            <ExternalLink className="text-green-600 w-5 h-5 " />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
            {selectedImage && (
                <div
                    className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-white bg-primary-hover bg-opacity-50 rounded-full px-2 py-1 cursor-pointer hover:bg-opacity-80"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✖
                        </button>
                        <img
                            src={selectedImage}
                            alt="Foto ampliada"
                            className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableCatsWithInterest;
