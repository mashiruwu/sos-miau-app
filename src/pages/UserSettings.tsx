import { use, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../components/InputField/InputField";
import RadioButton from "../components/RadioButton/RadioButton";
import Label from "../components/Label/Label";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const UserSettings = () => {
    const { t } = useTranslation();

    const { signOut } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phone: "",
        email: "",
        address: "",
        complement: "",
        hasProtectionScreen: "",
        foundation_date: "",
        description: "",
        website: "",
        cnpj: "",
    });

    const [loading, setLoading] = useState(true);

    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            const API = import.meta.env.VITE_API_URL;

            const urls = [
                {
                    url: `${API}/donorOng/${userId}`,
                    role: "donorOng",
                },
                {
                    url: `${API}/adopter/${userId}`,
                    role: "adopter",
                },
            ];

            try {
                const results = await Promise.allSettled(
                    urls.map((entry) =>
                        fetch(entry.url).then((res) => {
                            if (!res.ok) throw new Error("Not found");
                            return res.json();
                        })
                    )
                );

                const fulfilledIndex = results.findIndex(
                    (result) => result.status === "fulfilled"
                );

                if (fulfilledIndex === -1) {
                    throw new Error(
                        "Failed to fetch user data from all sources."
                    );
                }

                const userRole = urls[fulfilledIndex].role;
                const userData = (
                    results[fulfilledIndex] as PromiseFulfilledResult<any>
                ).value;

                setFormData({
                    name: userData.name || "",
                    surname: userData.surname || "",
                    phone: userData.phone || "",
                    email: userData.email || "",
                    address: userData.address || "",
                    complement: userData.complement || "",
                    hasProtectionScreen:
                        userData.hasProtectionScreen === true ||
                        userData.hasProtectionScreen === "Sim"
                            ? "Sim"
                            : "Não",
                    foundation_date: userData.foundation_date || "",
                    description: userData.description || "",
                    website: userData.website || "",
                    cnpj: userData.cnpj || "",
                });

                sessionStorage.setItem("userRole", userRole);
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    const navigate = useNavigate();

    const userRole = sessionStorage.getItem("userRole");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userId = sessionStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        const requests = [];
        const API = import.meta.env.VITE_API_URL;

        if (userRole === "adopter") {
            requests.push(
                fetch(`${API}/adopter/${userId}`, {
                    method: "PUT",
                    headers,
                    body: JSON.stringify(formData),
                })
            );
        } else if (userRole === "donorOng") {
            requests.push(
                fetch(`${API}/donorOng/${userId}`, {
                    method: "PUT",
                    headers,
                    body: JSON.stringify(formData),
                })
            );
        }

        try {
            const results = await Promise.allSettled(requests);

            const allSuccessful = results.every(
                (result) => result.status === "fulfilled" && result.value.ok
            );

            if (allSuccessful) {
                const responseBodies = await Promise.all(
                    results.map((r: any) => r.value.json())
                );
                console.log("Atualizações realizadas:", responseBodies);
                alert("Informações atualizadas com sucesso!");
            } else {
                console.error("Algumas atualizações falharam:", results);
                alert("Erro ao atualizar algumas informações.");
            }
        } catch (error) {
            console.error("Erro inesperado:", error);
            alert("Erro inesperado ao atualizar informações.");
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita."
        );
        if (!confirmDelete) return;

        try {
            const API = import.meta.env.VITE_API_URL;
            if (userRole === "adopter") {
                await fetch(`${API}/adopter/${userId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });
            } else if (userRole === "donorOng") {
                await fetch(`${API}/donorOng/${userId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });
            }
            signOut();
            if (userRole === "adopter") {
                navigate("/login");
            } else {
                navigate("/loginOng");
            }
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            alert("Erro ao deletar usuário.");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center w-full h-full bg-gray-40 lg:pb-30">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10">
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <ClipLoader color="#4F46E5" size={50} />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="w-full">
                        <h1 className="text-3xl font-bold text-[#153151] mb-6 text-center lg:text-left">
                            {t("user_settings.title")}
                        </h1>
                        <p className="mb-8 text-gray-600 text-center lg:text-left">
                            {t("user_settings.description")}
                        </p>
                        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                            {userRole === "adopter" && (
                                <>
                                    <div className="sm:col-span-2 lg:col-span-1">
                                        <Label>{t("user_settings.name")}</Label>
                                        <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <InputField
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder={t(
                                                    "user_settings.placeholders.name"
                                                )}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 lg:col-span-1">
                                        <Label>
                                            {t("user_settings.surname")}
                                        </Label>
                                        <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <InputField
                                                type="text"
                                                name="surname"
                                                value={formData.surname}
                                                onChange={handleChange}
                                                placeholder={t(
                                                    "user_settings.placeholders.surname"
                                                )}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <Label>
                                            {t("user_settings.phone")}
                                        </Label>
                                        <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <InputField
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="(XX) XXXXX-XXXX"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <Label>
                                            {t("user_settings.email")}
                                        </Label>
                                        <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <InputField
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder={t(
                                                    "user_settings.placeholders.email"
                                                )}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <Label>
                                            {t("user_settings.address")}
                                        </Label>
                                        <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <InputField
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder={t(
                                                    "user_settings.placeholders.address"
                                                )}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <Label>
                                            {t("user_settings.complement")}
                                        </Label>
                                        <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <InputField
                                                type="text"
                                                name="complement"
                                                value={formData.complement}
                                                onChange={handleChange}
                                                placeholder={t(
                                                    "user_settings.placeholders.complement"
                                                )}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-6 col-span-2">
                                        <span className="block text-[#153151] font-medium mb-2">
                                            {t(
                                                "user_settings.has_protection_screen"
                                            )}
                                        </span>
                                        <div className="flex items-center gap-4">
                                            <Label>
                                                <RadioButton
                                                    type="radio"
                                                    name="hasProtectionScreen"
                                                    value={"Sim"}
                                                    checked={
                                                        formData.hasProtectionScreen ===
                                                        "Sim"
                                                    }
                                                    onChange={handleChange}
                                                />
                                                {t("user_settings.yes")}
                                            </Label>
                                            <Label>
                                                <RadioButton
                                                    type="radio"
                                                    name="hasProtectionScreen"
                                                    value={"Não"}
                                                    checked={
                                                        formData.hasProtectionScreen ===
                                                        "Não"
                                                    }
                                                    onChange={handleChange}
                                                />
                                                {t("user_settings.no")}
                                            </Label>
                                        </div>
                                    </div>
                                    <div className="col-span-2 mt-1">
                                        <SubmitButton>
                                            {t("user_settings.submit")}
                                        </SubmitButton>
                                    </div>
                                    <div className="col-span-2 mt-4 flex justify-center lg:justify-start">
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
                                        >
                                            {t("user_settings.delete_account")}
                                        </button>
                                    </div>
                                </>
                            )}

                            {userRole === "donorOng" && (
                                <>
                                    <div className="sm:col-span-2 lg:col-span-1">
                                        <Label>{t("user_settings.name")}</Label>
                                        <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <InputField
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder={t(
                                                    "user_settings.placeholders.name"
                                                )}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 lg:col-span-1">
                                        <Label>
                                            {t("user_settings.email")}
                                        </Label>
                                        <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <InputField
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder={t(
                                                    "user_settings.placeholders.email"
                                                )}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <Label>
                                            {t("user_settings.description_ong")}
                                        </Label>
                                        <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <InputField
                                                type="text"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                placeholder={t(
                                                    "user_settings.placeholders.description"
                                                )}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <Label>
                                            {t("user_settings.foundation_date")}
                                        </Label>
                                        <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <InputField
                                                type="date"
                                                name="foundation_date"
                                                value={formData.foundation_date}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <Label>
                                            {t("user_settings.phone")}
                                        </Label>
                                        <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <InputField
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="(XX) XXXXX-XXXX"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <Label>
                                            {t("user_settings.website")}
                                        </Label>
                                        <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <InputField
                                                type="text"
                                                name="website"
                                                value={formData.website}
                                                onChange={handleChange}
                                                placeholder={t(
                                                    "user_settings.placeholders.website"
                                                )}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <Label>{t("user_settings.cnpj")}</Label>
                                        <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <InputField
                                                type="text"
                                                name="cnpj"
                                                value={formData.cnpj}
                                                onChange={handleChange}
                                                placeholder={t(
                                                    "user_settings.placeholders.cnpj"
                                                )}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 mt-1">
                                        <SubmitButton>
                                            {t("user_settings.submit")}
                                        </SubmitButton>
                                    </div>
                                    <div className="col-span-2 mt-4 flex justify-center lg:justify-start">
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                                        >
                                            {t("user_settings.delete_account")}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserSettings;
