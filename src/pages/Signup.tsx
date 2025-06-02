import { useState } from "react";
import { useTranslation } from "react-i18next";
import SignupImage from "../assets/signup_image2.png";
import InputField from "../components/InputField/InputField";
import RadioButton from "../components/RadioButton/RadioButton";
import Label from "../components/Label/Label";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import ErrorModal from "../components/ErrorModal/ErrorModal";
import { useNavigate } from "react-router-dom";
import { auth } from "../../api/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        cpf: "",
        phone: "",
        birthday: "",
        hasProtectionScreen: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        complement: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    function isValidCPF(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]+/g, '');
      
        if (cpf.length !== 11) return false;
      
        if (/^(\d)\1{10}$/.test(cpf)) return false;
      
        let sum = 0;
        let remainder;
      
        for (let i = 1; i <= 9; i++) {
          sum += parseInt(cpf[i - 1]) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf[9])) return false;
      
        sum = 0;
        for (let i = 1; i <= 10; i++) {
          sum += parseInt(cpf[i - 1]) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf[10])) return false;
      
        return true;
    }
      
    function isValidPhone(phone: string): boolean {
        const cleaned = phone.replace(/\D/g, "");
        return /^(\d{10}|\d{11})$/.test(cleaned); 
    }    

    function isValidBirthdate(birthdate: string): boolean {
        const date = new Date(birthdate);
        const now = new Date();
    
        if (isNaN(date.getTime())) return false; 
    
        const age = now.getFullYear() - date.getFullYear();
        const monthDiff = now.getMonth() - date.getMonth();
        const dayDiff = now.getDate() - date.getDate();
    
        const isOldEnough =
            age > 18 ||
            (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
    
        return isOldEnough && date < now;
    }
    
    function formatToBR(dateString: string): string {
        const [year, month, day] = dateString.split("-");
        if (!year || !month || !day) return dateString;
        return `${day}/${month}/${year}`;
    }
    
    function formatToISO(dateString: string): string {
        const [day, month, year] = dateString.split("/");
        if (!year || !month || !day) return dateString;
        return `${year}-${month}-${day}`;
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

        if (!isValidCPF(formData.cpf)) {
            setError(t("signup.invalid_cpf"));
            setShowErrorModal(true);
            return;
        }

        if (!isValidPhone(formData.phone)) {
            setError(t("signup.invalid_phone"));
            setShowErrorModal(true);
            return;
        }

        if (!isValidBirthdate(formData.birthday)) {
            setError(t("signup.age_error"));
            setShowErrorModal(true);
            return;
        }
        
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;
            console.log("Usuário criado no Firebase:", user.uid);
            const API = import.meta.env.VITE_API_URL
            const signupRes = await fetch(API + "/adopter/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    cpf: formData.cpf.replace(/[^\d]/g, ""),
                    firebaseUid: user.uid, 
                }),
            });
    

          const result = await signupRes.json();

          if (!signupRes.ok) {
            console.error("Signup failed:", signupRes.status);
            if (result.errors && typeof result.errors === "object") {
                const messages = Object.values(result.errors).join(" ");
                setError(messages);
            } else {
                setError(result.message || "Erro inesperado.");
            }
            setShowErrorModal(true);
            console.log(result.errors)
            return;
          }
      
          console.log("Signup successful:", result);

          const loginRes = await fetch(API + "/adopter/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });
      
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
        } catch (error) {
          console.error("Error submitting form:", error);
          setError("Erro ao enviar o formulário. Tente novamente.");
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
                        <div className="sm:col-span-2 lg:col-span-1">
                            <Label>{t("signup.name")}</Label>
                            <InputField
                                type="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Digite seu nome"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2 lg:col-span-1">
                            <Label>{t("signup.surname")}</Label>
                            <InputField
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                placeholder="Digite seu sobrenome"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>{t("signup.cpf")}</Label>
                            <InputField
                                type="text"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                                placeholder="___.___.___-__"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <Label>{t("signup.birthdate")}</Label>
                            <InputField
                                type="text"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                                onFocus={(e) => {
                                    e.target.type = "date";
                                    const iso = formatToISO(formData.birthday);
                                    setFormData({ ...formData, birthday: iso });
                                }}
                                onBlur={(e) => {
                                    e.target.type = "text";
                                    const br = formatToBR(formData.birthday);
                                    setFormData({ ...formData, birthday: br });
                                }}
                                placeholder="__/__/____"
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
                                placeholder="Digite seu endereço"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <Label>{t("signup.complement")}</Label>
                            <InputField
                                type="text"
                                name="complement"
                                value={formData.complement}
                                onChange={handleChange}
                                placeholder="Digite o complemento"
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
                                placeholder="Digite seu email"
                                required
                            />
                        </div>

                        <div className="mt-4 col-span-2">
                            <span className="block text-[#153151] mb-2">
                                {t("signup.has_protection_screen")}
                            </span>
                            <Label>
                                <RadioButton
                                    type="radio"
                                    name="hasProtectionScreen"
                                    value={"Sim"}
                                    checked={
                                        formData.hasProtectionScreen === "Sim"
                                    }
                                    onChange={handleChange}
                                />
                                {t("signup.yes")}
                            </Label>
                            <Label>
                                <RadioButton
                                    type="radio"
                                    name="hasProtectionScreen"
                                    value={"Não"}
                                    checked={
                                        formData.hasProtectionScreen === "Não"
                                    }
                                    onChange={handleChange}
                                />

                                {t("signup.no")}
                            </Label>
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