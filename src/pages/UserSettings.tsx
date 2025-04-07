import { useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../components/InputField/InputField";
import RadioButton from "../components/RadioButton/RadioButton";
import Label from "../components/Label/Label";
import SubmitButton from "../components/SubmitButton/SubmitButton";

const UserSettings = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phone: "",
        email: "",
        address: "",
        complement: "",
        hasProtectionScreen: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("User settings updated:", formData);
    };

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center w-full h-full bg-gray-40 lg:pb-30">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="w-full">
                    <h1 className="text-3xl font-bold text-[#153151] mb-6 text-center lg:text-left">
                        {t("user_settings.title")}
                    </h1>
                    <p className="mb-8 text-gray-600 text-center lg:text-left">
                        {t("user_settings.description")}
                    </p>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="sm:col-span-2 lg:col-span-1">
                            <Label>{t("user_settings.name")}</Label>
                            <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                <InputField
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t("user_settings.placeholders.name")}
                                    required
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2 lg:col-span-1">
                            <Label>{t("user_settings.surname")}</Label>
                            <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                <InputField
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    placeholder={t("user_settings.placeholders.surname")}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Label>{t("user_settings.phone")}</Label>
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
                            <Label>{t("user_settings.email")}</Label>
                            <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                <InputField
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t("user_settings.placeholders.email")}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Label>{t("user_settings.address")}</Label>
                            <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                <InputField
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder={t("user_settings.placeholders.address")}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Label>{t("user_settings.complement")}</Label>
                            <div className="w-full border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                                <InputField
                                    type="text"
                                    name="complement"
                                    value={formData.complement}
                                    onChange={handleChange}
                                    placeholder={t("user_settings.placeholders.complement")}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-6 col-span-2">
                            <span className="block text-[#153151] font-medium mb-2">
                                {t("user_settings.has_protection_screen")}
                            </span>
                            <div className="flex items-center gap-4">
                                <Label>
                                    <RadioButton
                                        type="radio"
                                        name="hasProtectionScreen"
                                        value={"Sim"}
                                        checked={formData.hasProtectionScreen === "Sim"}
                                        onChange={handleChange}
                                    />
                                    {t("user_settings.yes")}
                                </Label>
                                <Label>
                                    <RadioButton
                                        type="radio"
                                        name="hasProtectionScreen"
                                        value={"Não"}
                                        checked={formData.hasProtectionScreen === "Não"}
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
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserSettings;