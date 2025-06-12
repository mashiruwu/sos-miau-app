import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CatCard from "../components/CatCard/CatCard";
import { Gato } from "../types/types";

const AvailableCats = () => {
    const { t } = useTranslation();
    const [cats, setCats] = useState<Gato[]>([]);
    const [loading, setLoading] = useState(true);
    const [showNoCatsModal, setShowNoCatsModal] = useState(false);

    useEffect(() => {
        const fetchCats = async () => {
            setLoading(true);
            try {
                const API = (import.meta as any).env.VITE_API_URL; 
                const response = await fetch(`${API}/cat`);
                if (response.status === 404) {
                    setShowNoCatsModal(true);
                    setCats([]);
                    return;
                }
                if (!response.ok) throw new Error("Erro ao buscar gatos");
                const data = await response.json();
                setCats(data.cats || data || []);
            } catch (error) {
                console.error("Erro ao buscar gatos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCats();
    }, []);

    return (
        <div className="px-4">
            <h1 className="font-tiny text-secondary text-3xl md:text-5xl text-center pb-6">
                {t("cats_page.title")}
            </h1>
            {loading ? (
                <div className="text-center py-10">Carregando...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-items-center">
                    {cats
                        .filter(
                            (cat) => cat.adopted !== "Sim"
                        )
                        .map((cat, idx) => (
                            <CatCard
                                key={cat.id ?? idx}
                                cat={{
                                    id: idx, // Garante um número para o id
                                    name: cat.name ?? "",
                                    gender: cat.gender ?? "",
                                    race: cat.race ?? "",
                                    birthday: cat.birthday ?? "",
                                    description: cat.description ?? "",
                                    behaviour: cat.behaviour ?? "",
                                    photo_url: cat.photo_url ?? "",
                                }}
                            />
                        ))}
                </div>
            )}

            {showNoCatsModal && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-xs w-full text-center">
                        <h2 className="text-xl font-bold text-secondary mb-2">
                            Nenhum gatinho disponível
                        </h2>
                        <p className="text-gray-700 mb-4">
                            No momento, não há gatinhos disponíveis para adoção.
                        </p>
                        <button
                            onClick={() => setShowNoCatsModal(false)}
                            className="mt-2 px-6 py-2 bg-[#254D70] text-white rounded-md hover:bg-[#21415c] cursor-pointer font-tiny uppercase"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvailableCats;