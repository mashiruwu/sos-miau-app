import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CatCard from "../components/CatCard/CatCard";
import { Gato } from "../types/types";

const AvailableCats = () => {
    const { t } = useTranslation();
    const [cats, setCats] = useState<Gato[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCats = async () => {
            setLoading(true);
            try {
                const API = import.meta.env.VITE_API_URL;
                const ongId = sessionStorage.getItem("userId");
                const response = await fetch(`${API}/donorOng/0Uv4909AmvRNB4tVly2y`);
                if (!response.ok) throw new Error("Erro ao buscar gatos");
                const data = await response.json();
                setCats(data.cats_available || []);
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                    {cats.map((cat) => (
                        <CatCard key={cat.id} cat={cat} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AvailableCats;