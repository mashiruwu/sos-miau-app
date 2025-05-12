import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import catIcon from "../../assets/cat_icon_registered.png";
import EditCatModal from "./EditCatModal/EditCatModal";
import { Gato } from "../../types/types";
import DeleteCatModal from "./DeleteCatModal/DeleteCatModal";

const initialGatos: Gato[] = [
    {
        nome: "Gato 1",
        genero: "F",
        cadastro: "Sim",
        nascimento: "21/03/2013",
        raca: "SRD",
        adotado: "Não",
    },
    {
        nome: "Gato 2",
        genero: "F",
        cadastro: "Sim",
        nascimento: "21/03/2013",
        raca: "American Curl",
        adotado: "Não",
    },
    {
        nome: "Gato 3",
        genero: "F",
        cadastro: "Sim",
        nascimento: "21/03/2013",
        raca: "Siames",
        adotado: "Sim",
    },
    {
        nome: "Gato 4",
        genero: "F",
        cadastro: "Não",
        nascimento: "21/03/2013",
        raca: "SRD",
        adotado: "Não",
    },
    {
        nome: "Gato 5",
        genero: "F",
        cadastro: "Sim",
        nascimento: "21/03/2013",
        raca: "SRD",
        adotado: "Não",
    },
    {
        nome: "Gato 6",
        genero: "F",
        cadastro: "Não",
        nascimento: "21/03/2013",
        raca: "Sphinx",
        adotado: "Sim",
    },
    {
        nome: "Gato 7",
        genero: "F",
        cadastro: "Sim",
        nascimento: "21/03/2013",
        raca: "SRD",
        adotado: "Não",
    },
    {
        nome: "Gato 8",
        genero: "F",
        cadastro: "Não",
        nascimento: "21/03/2013",
        raca: "SRD",
        adotado: "Não",
    },
];

const TableRegisteredCats = () => {
    const [gatos, setGatos] = useState<Gato[]>(initialGatos);
    const [selectedCat, setSelectedCat] = useState<Gato | null>(null);
    const [catToDelete, setCatToDelete] = useState<Gato | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleAdocaoChange = (index: number, value: string) => {
        const updatedGatos = [...gatos];
        updatedGatos[index].adotado = value;
        setGatos(updatedGatos);
    };

    const handleEditClick = (gato: Gato) => {
        setSelectedCat(gato);
    };

    const handleCloseModal = () => {
        setSelectedCat(null);
    };

    const handleDeleteClick = (gato: Gato) => {
        setCatToDelete(gato);
    };

    const handleConfirmDelete = (gato: Gato) => {
        setGatos((prev) => prev.filter((g) => g !== gato));
        setCatToDelete(null);
    };

    const filteredGatos = gatos.filter(
        (gato) =>
            gato.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gato.raca.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gato.adotado.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 font-afacad">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl text-primary mb-4">
                    Gatinhos Cadastrados
                </h1>

                <div className="relative mb-4 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Buscar por nome, raça ou adoção..."
                        className="w-full rounded-full pl-6 pr-10 py-2 shadow-inner border border-gray-300 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400">
                        🔍
                    </span>
                </div>
            </div>

            <table className="w-full table-auto border-collapse overflow-hidden text-sm">
                <thead>
                    <tr className="text-left text-primary text-lg">
                        <th className="p-3"> </th>
                        <th className="p-3">Nome</th>
                        <th className="p-3">Gênero</th>
                        <th className="p-3">Cadastro</th>
                        <th className="p-3">D. de Nascimento</th>
                        <th className="p-3">Raça</th>
                        <th className="p-3">Adotado</th>
                        <th className="p-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGatos.length > 0 ? (
                        filteredGatos.map((gato, index) => (
                            <tr
                                key={index}
                                className="border-t hover:bg-gray-50 text-lg text-primary"
                            >
                                <td className="p-3">
                                    <img
                                        src={catIcon}
                                        alt="avatar"
                                        className="rounded-full w-10 h-10"
                                    />
                                </td>
                                <td className="p-3">{gato.nome}</td>
                                <td className="p-3">{gato.genero}</td>
                                <td className="p-3">{gato.cadastro}</td>
                                <td className="p-3">{gato.nascimento}</td>
                                <td className="p-3">{gato.raca}</td>
                                <td className="p-3">
                                    <select
                                        value={gato.adotado}
                                        onChange={(e) =>
                                            handleAdocaoChange(
                                                index,
                                                e.target.value as "Sim" | "Não"
                                            )
                                        }
                                        className="bg-transparent border-none focus:outline-none"
                                    >
                                        <option value="Sim">Sim</option>
                                        <option value="Não">Não</option>
                                    </select>
                                </td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => handleEditClick(gato)}
                                    >
                                        <Pencil className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(gato)}
                                    >
                                        <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={8}
                                className="text-center p-4 text-gray-400"
                            >
                                Nenhum gatinho encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedCat && (
                <EditCatModal gato={selectedCat} onClose={handleCloseModal} />
            )}

            {catToDelete && (
                <DeleteCatModal
                    gato={catToDelete}
                    onClose={() => setCatToDelete(null)}
                    onDelete={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default TableRegisteredCats;
