import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginImage from "../assets/signup_image2.png";
import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { Link } from "react-router-dom";

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login data submitted:", formData);

        try {
            const response = await fetch("http://localhost:3000/donorOng/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
        
            if (!response.ok) {
              // Handle error
              console.error("Failed to submit");
              return;
            }
            
            const data = await response.json();

            localStorage.setItem("token", data.token);
            sessionStorage.setItem('userId', data.user.id);

            console.log("Form data submitted successfully:", data);
            window.location.href = `/registeredcats`;


          } catch (error) {
            console.error("Error submitting form:", error);
          }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-center w-full h-full lg:pb-30">
            {/* Form Section */}
            <div className="w-full lg:w-2/4 p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="lg:w-1/2 lg:mx-auto">
                    <h1 className="text-2xl text-[#153151] mb-4 text-center lg:text-left">
                        {t("loginPage.title")}
                    </h1>
                    <p className="mb-6 text-[#153151] text-center lg:text-left">
                        {t("loginPage.description")}
                    </p>
                    <div className="grid sm:grid-cols-1 gap-4">
                        <div className="col-span-2">
                            <Label>{t("loginPage.email")}</Label>
                            <InputField
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Digite seu e-mail"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <Label>{t("loginPage.password")}</Label>
                            <InputField
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Digite sua senha"
                                required
                            />
                        </div>
                        <SubmitButton>{t("loginPage.submit")}</SubmitButton>
                    </div>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Não está cadastrado?
                        <Link
                        to="/signup"
                        className="text-[#153151] pl-2 font-medium hover:underline"
                        >
                        Crie uma conta
                        </Link>
                    </p>
                </form>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/3">
                <img
                    src={LoginImage}
                    alt={t("loginPage.image_alt")}
                    className="w-full h-auto "
                />
            </div>
        </div>
    );
};

export default Login;
