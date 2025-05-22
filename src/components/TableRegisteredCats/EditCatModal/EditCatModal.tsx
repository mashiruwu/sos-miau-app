import { useState } from "react";
import { Gato } from "../../../types/types";

interface EditCatModalProps {
    gato: Gato | null;
    onClose: () => void;
    onSave?: (gatoAtualizado: Gato) => void;
}

const EditCatModal = ({ gato, onClose, onSave }: EditCatModalProps) => {
    if (!gato) return null;

    const [isDisabled, setIsDisabled] = useState(true);
    const [formData, setFormData] = useState<Gato>({ ...gato });

    const onEditClick = () => {
        setIsDisabled(!isDisabled);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await fetch(
                `http://localhost:3000/cat/${gato.id}`,
                {
                    method: "PUT",
                    headers,
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                const updatedGato = await response.json();
                onSave?.(updatedGato);
                setIsDisabled(true);
                onClose();
            } else {
                console.error("Erro ao salvar as alterações.");
            }
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
        } finally {
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50 text-primary">
            <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl relative">
                <h2 className="text-xl font-semibold mb-4 text-primary">
                    Editar Gato
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700">
                            Nome:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            className={`w-full border border-gray-300 rounded px-3 py-2 ${
                                isDisabled ? "bg-zinc-200" : ""
                            }`}
                            disabled={isDisabled}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700">
                            Raça:
                        </label>
                        <input
                            type="text"
                            name="race"
                            value={formData.race}
                            onChange={onChange}
                            className={`w-full border border-gray-300 rounded px-3 py-2 ${
                                isDisabled ? "bg-zinc-200" : ""
                            }`}
                            disabled={isDisabled}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700">
                            Data de nascimento:
                        </label>
                        <input
                            type="text"
                            name="birthday"
                            value={formData.birthday}
                            onChange={onChange}
                            className={`w-full border border-gray-300 rounded px-3 py-2 ${
                                isDisabled ? "bg-zinc-200" : ""
                            }`}
                            disabled={isDisabled}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700">
                            Gênero:
                        </label>
                        <input
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={onChange}
                            className={`w-full border border-gray-300 rounded px-3 py-2 ${
                                isDisabled ? "bg-zinc-200" : ""
                            }`}
                            disabled={isDisabled}
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition duration-200"
                            onClick={onEditClick}
                        >
                            {isDisabled ? "EDITAR" : "CANCELAR"}
                        </button>

                        {!isDisabled && (
                            <button
                                className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 transition duration-200"
                                onClick={handleSave}
                            >
                                SALVAR
                            </button>
                        )}
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default EditCatModal;
