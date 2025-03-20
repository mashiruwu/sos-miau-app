import { useState } from "react";
import { useTranslation } from "react-i18next";
import SignupImage from "../assets/signup_image2.png";

const Signup = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        cpf: "",
        phone: "",
        birthdate: "",
        hasProtectionScreen: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        complement: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert(t("signup.password_mismatch"));
            return;
        }
        console.log("Form data submitted:", formData);
    };

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-around w-full h-full">
            {/* Form Section */}
            <div className="w-full lg:w-2/4 p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="p-6">
                    <h1 className="text-2xl text-[#153151] mb-4 text-center lg:text-left">
                        {t("signup.title")}
                    </h1>
                    <p className="mb-6 text-[#153151] text-center lg:text-left">
                        {t("signup.description")}
                    </p>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="sm:col-span-2 lg:col-span-1">
                            <label className="text-[#153151]">{t("signup.name")}</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border-b-2 border-[#153151] w-full p-2"
                            />
                        </div>
                        <div className="sm:col-span-2 lg:col-span-1">
                            <label className="text-[#153151]">{t("signup.surname")}</label>
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                className="border-b-2 border-[#153151] w-full p-2"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="text-[#153151]">{t("signup.cpf")}</label>
                            <input
                                type="text"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                                className="border-b-2 border-[#153151] w-full p-2"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-[#153151]">{t("signup.birthdate")}</label>
                            <input
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleChange}
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                                className="border-b-2 border-[#153151] w-full p-2"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="text-[#153151]">{t("signup.address")}</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="border-b-2 border-[#153151] w-full p-2"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-[#153151]">{t("signup.complement")}</label>
                            <input
                                type="text"
                                name="complement"
                                value={formData.complement}
                                onChange={handleChange}
                                className="border-b-2 border-[#153151] w-full p-2"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="text-[#153151]">{t("signup.phone")}</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border-b-2 border-[#153151] w-full p-2"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-[#153151]">{t("signup.email")}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border-b-2 border-[#153151] w-full p-2"
                            />
                        </div>

                        <div className="mt-4 col-span-2">
                            <span className="block text-[#153151] mb-2">
                                {t("signup.has_protection_screen")}
                            </span>
                            <label className="text-[#153151] mr-4">
                                <input
                                    type="radio"
                                    name="hasProtectionScreen"
                                    value="Sim"
                                    checked={formData.hasProtectionScreen === "Sim"}
                                    onChange={handleChange}
                                    className="mr-1"
                                />
                                {t("signup.yes")}
                            </label>
                            <label className="text-[#153151]">
                                <input
                                    type="radio"
                                    name="hasProtectionScreen"
                                    value="Não"
                                    checked={formData.hasProtectionScreen === "Não"}
                                    onChange={handleChange}
                                    className="mr-1"
                                />
                                {t("signup.no")}
                            </label>
                        </div>

                        <div>
                            <label className="text-[#153151]">{t("signup.password")}</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border-b-2 border-[#153151] w-full p-2"
                            />
                        </div>
                        <div>
                            <label className="text-[#153151]">{t("signup.confirm_password")}</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="border-b-2 border-[#153151] w-full p-2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="col-span-2 mt-6 w-full bg-[#153151] text-white py-2 rounded-lg hover:bg-[#0f2533] transition-colors duration-300">
                            {t("signup.submit")}
                        </button>
                    </div>
                </form>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/3 ">
                <img
                    src={SignupImage}
                    alt={t("signup.image_alt")}
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
};

export default Signup;