import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Adotante, Gato } from "../../../types/types";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export const CatProfile = () => {
    const { t } = useTranslation();

    const [cat, setCat] = useState<Gato | null>(null);
    const [adotantes, setAdotantes] = useState<Adotante[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const { id: IdCat } = useParams();
    const IdOng = sessionStorage.getItem("ongId");


    const API = import.meta.env.VITE_API_URL

    const handleEvaluate = async (value: boolean, adopterId: string) => {
        try {
            const response = await fetch(API + "/donorOng/evaluateAdopter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idAdopter: adopterId,
                    idCat: IdCat,
                    like: value
                })
            });
    
            if (!response.ok) {
                console.error("Erro ao avaliar adotante.");
                return;
            }
            console.log(adotantes)
            // ✅ Remove o adotante avaliado da lista local
            setAdotantes(prev => prev.filter(adotante => adotante.id !== adopterId));
        } catch (err) {
            console.error("Erro na requisição:", err);
        }
    };
    

    const navigate = useNavigate();

    const calcularIdade = (dataNascimento: string): string => {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);

        let anos = hoje.getFullYear() - nascimento.getFullYear();
        let meses = hoje.getMonth() - nascimento.getMonth();
        let dias = hoje.getDate() - nascimento.getDate();

        if (dias < 0) meses--;
        if (meses < 0) {
            anos--;
            meses += 12;
        }

        if (anos < 0 || (anos === 0 && meses === 0)) {
            return "menos de 1 mês";
        }

        if (anos === 0) {
            return `${meses} ${meses === 1 ? "mês" : "meses"}`;
        }

        if (meses === 0) {
            return `${anos} ${anos === 1 ? "ano" : "anos"}`;
        }

        return `${anos} ${anos === 1 ? "ano" : "anos"} e ${meses} ${
            meses === 1 ? "mês" : "meses"
        }`;
    };

    useEffect(() => {
        if (!IdOng) {
            navigate("/loginOng");
        }
        const fetchCat = async () => {
            const API = import.meta.env.VITE_API_URL;

            try {
                const response = await fetch(API + `/cat/${IdCat}`);
                if (!response.ok) throw new Error("Erro ao buscar gato");
                const data = await response.json();
                setCat(data);
            } catch (err) {
                console.error("Erro ao buscar dados do gato:", err);
                setError(true);
            } finally {
            }
        };

        if (IdCat) fetchCat();
    }, [IdCat, navigate]);

    useEffect(() => {
        const fetchAdotantes = async () => {
            try {
                const API = import.meta.env.VITE_API_URL;

                const response = await fetch(
                    API + "/donorOng/avaliableAdopters",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            IdOng,
                            IdCat,
                        }),
                    }
                );

                if (!response.ok) throw new Error("Erro ao buscar adotantes");
                const data = await response.json();
                const adotantesList = data.avaliableAdopters.map(
                    (item) => item[0]
                );
                setAdotantes(adotantesList);
            } catch (error) {
                console.error("Erro ao carregar adotantes:", error);
            } finally {
                setLoading(false);
            }
        };

        if (IdOng && IdCat) fetchAdotantes();
    }, [IdCat, IdOng]);

    return (
        <div>
            {loading ? (
                <div className="fixed inset-0 z-50  flex justify-center items-center">
                    <ClipLoader color="#4F46E5" size={35} />
                </div>
            ) : error ? (
                <div className="flex justify-center items-center h-64 text-red-600">
                    <AlertTriangle className="mr-2" /> Erro ao carregar os
                    dados.
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-6 text-primary-hover font-afacad">
                        <img
                            src={cat?.photo_url}
                            alt="Foto do gato"
                            className="rounded-full w-30 h-30"
                        />
                        <div className="flex flex-col ">
                            <h1 className="text-3xl">{cat?.name}</h1>
                            <h2 className="text-xl">
                                {cat?.race},{" "}
                                {cat?.neutered === "Sim" ? (
                                    <> {t("cat_profile.neutered")}</>
                                ) : (
                                    <> {t("cat_profile.non_neutered")}</>
                                )}
                                , {cat?.birthday && calcularIdade(cat.birthday)}
                            </h2>
                        </div>
                    </div>
                    <hr className="border border-gray-300 mt-5" />
                    <div>
                        <h1 className="text-4xl font-tiny text-primary-hover my-5">
                            {t("cat_profile.title")}
                        </h1>
                        <table className="w-full table-auto border-collapse overflow-hidden text-sm">
                            <thead>
                                <tr className="text-left text-secondary text-lg font-afacad">
                                    <th className="p-3"></th>
                                    <th className="p-3">
                                        {t("cat_profile.name")}
                                    </th>
                                    <th className="p-3">
                                        {t("cat_profile.protectionNet")}
                                    </th>
                                    <th className="p-3">
                                        {t("cat_profile.email")}
                                    </th>
                                    <th className="p-3">CPF</th>
                                    <th className="p-3">
                                        {t("cat_profile.birthdate")}
                                    </th>
                                    <th className="p-3">
                                        {t("cat_profile.address")}
                                    </th>
                                    <th className="p-3">
                                        {t("cat_profile.approval")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {adotantes && adotantes.length > 0 ? (
                                    adotantes.map((adotante, index) => (
                                        <tr
                                            key={index}
                                            className="border-t hover:bg-gray-50 text-md text-secondary"
                                        >
                                            <td>{""}</td>
                                            <td className="p-3">
                                                {adotante.name}{" "}
                                                {adotante.surname}
                                            </td>
                                            <td className="p-3">
                                                {adotante.hasProtectionScreen ===
                                                "Sim" ? (
                                                    <p className="text-green-800 font-bold ">
                                                        {t(
                                                            "cat_profile.yesProtection"
                                                        )}
                                                    </p>
                                                ) : (
                                                    <p className="text-red-600 font-bold ">
                                                        {t(
                                                            "cat_profile.noProtection"
                                                        )}
                                                    </p>
                                                )}
                                            </td>{" "}
                                            <td className="p-3">
                                                {adotante.email}
                                            </td>
                                            <td className="p-3">
                                                {adotante.cpf}
                                            </td>
                                            <td className="p-3">
                                                {adotante.birthday}
                                            </td>
                                            <td className="p-3">
                                                {adotante.address}
                                            </td>
                                            <td className="flex gap-2 ">
                                                <button className="bg-green-800 p-2 mt-1 rounded-md text-white font-bold hover:bg-green-900 cursor-pointer" onClick={() => {handleEvaluate(true, adotante.id)}}>
                                                    {t("cat_profile.yes")}
                                                </button>
                                                <button className="bg-red-800 p-2 mt-1 rounded-md text-white font-bold hover:bg-red-900 cursor-pointer" onClick={() => {handleEvaluate(false, adotante.id)}}>
                                                    {t("cat_profile.no")}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="text-center p-4"
                                        >
                                            Nenhum adotante interessado
                                            encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};
