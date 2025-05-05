import { useState } from "react";
import { useTranslation } from "react-i18next";
import SignupImage from "../assets/signup_image2.png";
import InputField from "../components/InputField/InputField";
import RadioButton from "../components/RadioButton/RadioButton";
import Label from "../components/Label/Label";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { useNavigate } from "react-router-dom";

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

    const [error, setError] = useState({
        weakpassword: "",
        passwordmissmatch: "",
        email: "",
        cpf: "",
        phone: "",
        birthday: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError({
            weakpassword: "",
            passwordmissmatch: "",
            email: "",
            cpf: "",
            phone: "",
            birthday: "",
        })
      
        if (formData.password !== formData.confirmPassword) {
          //alert(t("signup.password_mismatch"));
            setError((prev) => ({
            ...prev,
            passwordmissmatch: "senhas não são iguais"
            }));
          return;
        }
      
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            //alert(t("signup.weak_password"));
            setError((prev) => ({
                ...prev,
                weakpassword: "senha fraca"
            }));
            return;
        }
        
        try {
          const signupRes = await fetch("http://localhost:3000/adopter/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          const result = await signupRes.json();

          if (!signupRes.ok) {
            console.error("Signup failed:", signupRes.status);
            setError((prev) => ({
                ...prev,
                ...result.errors
            }));
            console.log(result.errors)
            return;
          }
      
          const newUser = await signupRes.json();
          console.log("Signup successful:", newUser);
      
          const loginRes = await fetch("http://localhost:3000/adopter/login", {
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
          console.error("Erro no handleSubmit:", error);
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
                                // required
                            />
                        <p className={"text-red-400 " + (error.cpf ? "" : "hidden")}>❗{error.cpf} </p>
                        </div>
                        <div className="col-span-2">
                            <Label>{t("Birthday")}</Label>
                            <InputField
                                type="text"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                                placeholder="__/__/____"
                                // required
                            />
                        <p className={"text-red-400 " + (error.birthday ? "" : "hidden")}>❗{error.birthday} </p>
                        </div>

                        <div className="col-span-2">
                            <Label>{t("signup.address")}</Label>
                            <InputField
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Digite seu endereço"
                                // required
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
                                // required
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
                                // required
                            />
                            <p className={"text-red-400 " + (error.phone ? "" : "hidden")}>❗{error.phone}</p>
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
                            <p className={"text-red-400 " + (error.email ? "" : "hidden")}>❗{error.email}</p>
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
                            <p className={"text-red-400 " + (error.weakpassword ? "" : "hidden")}>❗{error.weakpassword}</p>
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
                            <p className={"text-red-400 " + (error.passwordmissmatch ? "" : "hidden")}>❗{error.passwordmissmatch}</p>
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
        </div>
    );
};


export default Signup;