import React from "react";
import { Gato } from "../../../types/types";

interface DeleteCatModalProps {
    gato: Gato;
    onClose: () => void;
    onDelete: (gato: Gato) => void;
}




const DeleteCatModal: React.FC<DeleteCatModalProps> = ({
    gato,
    onClose,
    onDelete,
}) => {
    return (
        <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50 text-primary">
            <div className="bg-white rounded-xl p-6 shadow-xl w-96 text-center">
                <h2 className="text-2xl font-semibold text-red-600 mb-4">
                    Excluir Gato
                </h2>
                <p className="text-gray-700 mb-6">
                    Tem certeza que deseja excluir <strong>{gato.name}</strong>?
                </p>
                <div className="flex justify-around">
                    <button
                        onClick={() => onDelete(gato)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCatModal;
