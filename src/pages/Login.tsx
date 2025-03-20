import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginImage from "../assets/signup_image2.png";

const Login = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login data submitted:", formData);
    };

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-around w-full h-full">
            {/* Form Section */}
            <div className="w-full lg:w-2/4 p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="p-6">
                    <h1 className="text-2xl text-[#153151] mb-4 text-center lg:text-left">
                        {t("loginPage.title")}
                    </h1>
                    <p className="mb-6 text-[#153151] text-center lg:text-left">
                        {t("loginPage.description")}
                    </p>
                    <div className="grid sm:grid-cols-1 gap-4">
                        <div className="col-span-2">
                            <label className="text-[#153151]">{t("loginPage.email")}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border-b-2 border-[#153151] w-full p-2"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-[#153151]">{t("loginPage.password")}</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border-b-2 border-[#153151] w-full p-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="col-span-2 mt-6 w-full bg-[#153151] text-white py-2 rounded-lg hover:bg-[#0f2533] transition-colors duration-300">
                            {t("loginPage.submit")}
                        </button>
                    </div>
                </form>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/3">
                <img
                    src={LoginImage}
                    alt={t("loginPage.image_alt")}
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
};

export default Login;