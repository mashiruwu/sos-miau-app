import { useState } from "react";
import SignupImage from "../assets/signup_image.png";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        cpf: "",
        phone: "",
        birthdate: "",
        hasProtectionScreen: "",
        email: "",
        password: "",
        address: "",
        complement: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
    };

    return (
        <div className="flex p-10">
            {/* Formulário */}
            <div className="bg-white rounded-lg w-full">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-4"
                >
                    <h1 className="text-2x1 font-bold mb-2 text-gray-800">
                        Pronto(a) para ajudar nossos gatinhos?
                    </h1>
                    <p className="text-sm text-gray-500">
                        Cadastre-se agora para poder adotar os miaus!
                    </p>

                    <div className="flex space-x-2">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-2 w-1/2 rounded-md"
                        />
                        <input
                            type="text"
                            name="surname"
                            placeholder="Sobrenome"
                            value={formData.surname}
                            onChange={handleChange}
                            className="border p-2 w-1/2 rounded-md"
                        />
                    </div>

                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF"
                        value={formData.cpf}
                        onChange={handleChange}
                        className="border p-2 rounded-md"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Celular"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-2 rounded-md"
                    />

                    <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        className="border p-2 rounded-md"
                    />

                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700">Sua residência possui tela de proteção?</span>
                        <label className="flex items-center space-x-1">
                            <input
                                type="radio"
                                name="hasProtectionScreen"
                                value="Sim"
                                checked={formData.hasProtectionScreen === "Sim"}
                                onChange={handleChange}
                            />
                            <span>Sim</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input
                                type="radio"
                                name="hasProtectionScreen"
                                value="Não"
                                checked={formData.hasProtectionScreen === "Não"}
                                onChange={handleChange}
                            />
                            <span>Não</span>
                        </label>
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 rounded-md"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleChange}
                        className="border p-2 rounded-md"
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Endereço"
                        value={formData.address}
                        onChange={handleChange}
                        className="border p-2 rounded-md"
                    />

                    <input
                        type="text"
                        name="complement"
                        placeholder="Complemento"
                        value={formData.complement}
                        onChange={handleChange}
                        className="border p-2 rounded-md"
                    />

                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                    >
                        Cadastrar-se
                    </button>
                </form>
            </div>

            {/* Ilustração */}
            <div className="w-1/2 flex justify-end items-start">
                <img
                    src={SignupImage}
                    alt="Ilustração"
                    className="w-3/4"
                />
            </div>
        </div>
    );
};

export default Signup;
