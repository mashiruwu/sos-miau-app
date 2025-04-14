import { useState } from "react";
import { useTranslation } from "react-i18next";
import SignupImage from "../assets/signup_image2.png";
import InputField from "../components/InputField/InputField";
import RadioButton from "../components/RadioButton/RadioButton";
import Label from "../components/Label/Label";
import SubmitButton from "../components/SubmitButton/SubmitButton";

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

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitMessage, setSubmitMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case "email":
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Email inválido";
            case "password":
                return value.length >= 6 ? "" : "A senha deve ter pelo menos 6 caracteres";
            case "confirmPassword":
                return value === formData.password ? "" : "As senhas não coincidem";
            case "birthdate":
                const birth = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birth.getFullYear();
                const isBirthdayPassed = today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
                const finalAge = isBirthdayPassed ? age - 1 : age;
                return finalAge >= 18 ? "" : "Você precisa ter pelo menos 18 anos para se cadastrar";
            default:
                return value.trim() === "" ? "Campo obrigatório" : "";
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const hasErrors = Object.values(errors).some((err) => err !== "");
    const hasEmptyRequired = ["name", "surname", "email", "password", "confirmPassword"].some(
        (key) => formData[key as keyof typeof formData].trim() === ""
    );
    const isFormInvalid = hasErrors || hasEmptyRequired;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormInvalid) {
            setSubmitMessage("Por favor, corrija os erros antes de enviar.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:3000/adopter/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                setSubmitMessage("Erro ao enviar o formulário.");
                return;
            }

            setSubmitMessage("Formulário enviado com sucesso!");
            setFormData({
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
            setErrors({});
        } catch (error) {
            setSubmitMessage("Erro inesperado ao enviar.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center w-full h-full lg:pb-30">
            <div className="w-full lg:w-3/4 p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="lg:w-1/2 lg:mx-auto">
                    <h1 className="text-2xl text-[#153151] mb-4 text-center lg:text-left">
                        {t("signup.title")}
                    </h1>
                    <p className="mb-6 text-[#153151] text-center lg:text-left">
                        {t("signup.description")}
                    </p>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                        {[
                            { name: "name", label: t("signup.name") + " *", type: "text", required: true },
                            { name: "surname", label: t("signup.surname") + " *", type: "text", required: true },
                            { name: "cpf", label: t("signup.cpf"), type: "text" },
                            {
                                name: "birthdate",
                                label: t("signup.birthdate"),
                                type: "date",
                                required: true,
                            },
                            { name: "address", label: t("signup.address"), type: "text" },
                            { name: "complement", label: t("signup.complement"), type: "text" },
                            { name: "phone", label: t("signup.phone"), type: "text" },
                            { name: "email", label: t("signup.email") + " *", type: "email", required: true },
                            { name: "password", label: t("signup.password") + " *", type: "password", required: true },
                            {
                                name: "confirmPassword",
                                label: t("signup.confirm_password") + " *",
                                type: "password",
                                required: true,
                            },
                        ].map((field) => (
                            <div key={field.name} className="col-span-2">
                                <Label>{field.label}</Label>
                                <InputField
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name as keyof typeof formData]}
                                    onChange={handleChange}
                                    placeholder={field.label}
                                    required={field.required}
                                    className={errors[field.name] ? "border border-red-500" : ""}
                                />
                                {errors[field.name] && (
                                    <p className="text-red-500 text-sm">{errors[field.name]}</p>
                                )}
                            </div>
                        ))}

                        <div className="mt-4 col-span-2">
                            <span className="block text-[#153151] mb-2">
                                {t("signup.has_protection_screen")}
                            </span>
                            <Label>
                                <RadioButton
                                    type="radio"
                                    name="hasProtectionScreen"
                                    value={"Sim"}
                                    checked={formData.hasProtectionScreen === "Sim"}
                                    onChange={handleChange}
                                />
                                {t("signup.yes")}
                            </Label>
                            <Label>
                                <RadioButton
                                    type="radio"
                                    name="hasProtectionScreen"
                                    value={"Não"}
                                    checked={formData.hasProtectionScreen === "Não"}
                                    onChange={handleChange}
                                />
                                {t("signup.no")}
                            </Label>
                        </div>

                        <SubmitButton disabled={isFormInvalid || isSubmitting}>
                            {isSubmitting ? t("signup.submitting") : t("signup.submit")}
                        </SubmitButton>

                        {submitMessage && (
                            <p className="col-span-2 text-center text-sm mt-2 text-[#153151]">
                                {submitMessage}
                            </p>
                        )}
                    </div>
                </form>
            </div>
            <div className="w-full lg:w-1/3">
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
