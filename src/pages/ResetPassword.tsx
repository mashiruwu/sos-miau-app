import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 
import { getAuth, confirmPasswordReset  } from "firebase/auth";
import SubmitButton from "../components/SubmitButton/SubmitButton";
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

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode") || "";
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage("");
    try {
    console.log('Nova senha:', newPassword);
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Senha atualizada com sucesso!");
    } catch (error: any) {
      setMessage("Erro ao atualizar senha: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!oobCode) {
    return <p>Link inválido ou expirado.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <form className="w-full max-w-md" onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
        <h1 className="text-2xl text-[#153151] mb-4 text-center">Redefinir senha</h1>

        <label htmlFor="new-password" className="block mb-2 text-[#153151]">Nova senha:</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Digite sua nova senha"
          required
          minLength={6}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <SubmitButton
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Atualizando..." : "Atualizar senha"}
        </SubmitButton>

        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
