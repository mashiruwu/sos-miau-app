import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("As senhas não coincidem.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/adopter/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            });

            if (response.ok) {
                setMessage("Senha redefinida com sucesso!");
            } else {
                setMessage("Erro ao redefinir a senha.");
            }
        } catch (error) {
            console.error("Erro:", error);
            setMessage("Erro ao processar a solicitação.");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            <h1 className="text-2xl mb-4">Redefinir Senha</h1>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">Nova Senha</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Digite sua nova senha"
                    required
                />
                <label className="block mb-2">Confirmar Nova Senha</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Confirme sua nova senha"
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Redefinir Senha
                </button>
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
};

export default ResetPassword;