import { useState } from "react";
import { useTranslation } from "react-i18next";
import Label from "../components/Label/Label";
import InputField from "../components/InputField/InputField";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCA6sFk_9q-z9NhsrlsE5D1o_FfFweDtrY",
  authDomain: "sos-miau-app.firebaseapp.com",
  projectId: "sos-miau-app",
  storageBucket: "sos-miau-app.firebasestorage.app",
  messagingSenderId: "795745556836",
  appId: "1:795745556836:web:815a58e15c1b61c52ec271",
  measurementId: "G-BS622408ZC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    setLoading(true);
    console.log("Enviando link para:", email);
    try {
    await sendPasswordResetEmail(auth, email);
    setMessage(t("forgot_password.forgot_password_success"));
    } catch (error: any) {
        setMessage(t("forgot_password.forgot_password_error", { error: error.message }));
        console.log("Erro ao enviar link: " + error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <form className="w-full max-w-md">
        <h1 className="text-2xl text-[#153151] mb-4 text-center">
          {t("loginPage.forgot_password")}
        </h1>
        <p className="mb-6 text-[#153151] text-center">
          {t("loginPage.description_forgotpassword")}
        </p>

        <Label>{t("loginPage.email")}</Label>
        <InputField
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("loginPage.email_forgotpassword")}
          required
        />

        <SubmitButton type="button" onClick={handlePasswordReset} disabled={loading}>
          {loading ? t("forgot_password.message") : t("forgot_password.button")}
        </SubmitButton>

        {message && (
          <p className="mt-4 text-sm text-center text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
