import { useState } from "react";
import { useTranslation } from "react-i18next";
import SignupImage from "../assets/signup_image2.png";
import InputField from "../components/InputField/InputField";
import Label from "../components/Label/Label";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import ErrorModal from "../components/ErrorModal/ErrorModal";
import { auth } from "../../api/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        cnpj: "",
        address: "",
        phone: "",
        website: "",
        foundation_date: "",
        description: "",
        socials: [""],
        cats_available: [""],
        cats_adopted: [""],
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    function isValidPhone(phone: string): boolean {
        const cleaned = phone.replace(/\D/g, "");
        return /^(\d{10}|\d{11})$/.test(cleaned);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError(t("signup.password_mismatch"));
            setShowErrorModal(true);
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError(t("signup.weak_password"));
            setShowErrorModal(true);
            return;
        }

        if (!isValidPhone(formData.phone)) {
            setError(t("signup.invalid_phone"));
            setShowErrorModal(true);
            return;
        }

        const cnpjRegex = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;
        if (!cnpjRegex.test(formData.cnpj)) {
            setError(t("signup.invalid_cnpj"));
            setShowErrorModal(true);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const firebaseUid = userCredential.user.uid;

            const backendResponse = await fetch(
                "http://localhost:3000/donorOng/",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData, firebaseUid }), // adiciona o uid do Firebase
                }
            );

            const result = await backendResponse.json();

            if (!backendResponse.ok) {
                setError(result.errors || "Erro no cadastro backend");
                setShowErrorModal(true);
                return;
            }

            console.log("Signup successful:", result);

            const loginRes = await fetch(
                "http://localhost:3000/donorOng/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                }
            );

            if (!loginRes.ok) {
                console.error("Login failed:", loginRes.status);
                return;
            }

            const loginData = await loginRes.json();
            console.log("Login response:", loginData);

            if (!loginData.token || !loginData.user?.id) {
                console.error("Resposta de login inválida", loginData);
                return;
            }

            localStorage.setItem("token", loginData.token);
            sessionStorage.setItem("userId", loginData.user.id);

            window.location.href = "/";
        } catch (error: any) {
            setError(error.message || "Erro desconhecido no Firebase");
            setShowErrorModal(true);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center w-full h-full lg:pb-30">
            {/* Form Section */}
            <div className="w-full lg:w-2/4 p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="lg:w-1/2 lg:mx-auto">
                    <h1 className="text-2xl text-[#153151] mb-4 text-center lg:text-left">
                        {t("signup.title")}
                    </h1>
                    <p className="mb-6 text-[#153151] text-center lg:text-left">
                        {t("signup.description")}
                    </p>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Label>{t("signup.name")}</Label>
                            <InputField
                                type="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Digite o nome da ONG"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>CNPJ</Label>
                            <InputField
                                type="text"
                                name="cnpj"
                                value={formData.cnpj}
                                onChange={handleChange}
                                placeholder="___.___.___-__"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>{t("signup.address")}</Label>
                            <InputField
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Digite o endereço"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>{t("signup.phone")}</Label>
                            <InputField
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="(XX) XXXXX-XXXX"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>{t("signup.email")}</Label>
                            <InputField
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Digite o email"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>{t("signup.foundation_date")}</Label>
                            <InputField
                                type="text"
                                name="foundation_date"
                                value={formData.foundation_date}
                                onChange={handleChange}
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                                placeholder="__/__/____"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>{t("signup.descriptionOng")}</Label>
                            <InputField
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Fale sobre a ONG"
                                required
                            />
                        </div>
                        <div>
                            <Label>{t("signup.password")}</Label>
                            <InputField
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Digite sua senha"
                                required
                            />
                        </div>
                        <div>
                            <Label>{t("signup.confirm_password")}</Label>
                            <InputField
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirme sua senha"
                                required
                            />
                        </div>
                        <SubmitButton>{t("signup.submit")}</SubmitButton>
                    </div>
                </form>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/3">
                <img
                    src={SignupImage}
                    alt={t("signup.image_alt")}
                    className="w-full h-auto"
                />
            </div>

            <ErrorModal
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                message={error || ""}
            />
        </div>
    );
};

export default Signup;
