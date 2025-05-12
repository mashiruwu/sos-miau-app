import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/adopter/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage("Um link de recuperação foi enviado para o seu e-mail.");
            } else {
                setMessage("Erro ao enviar o e-mail. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro:", error);
            setMessage("Erro ao processar a solicitação.");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            <h1 className="text-2xl mb-4">Recuperar Senha</h1>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">E-mail</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Digite seu e-mail"
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Enviar link de recuperação
                </button>
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
};

export default ForgotPassword;