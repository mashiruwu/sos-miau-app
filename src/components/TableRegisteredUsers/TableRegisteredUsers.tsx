import { useState } from "react";
import { AlertTriangle, ExternalLink } from "lucide-react";
import catIcon from "../../assets/cat_icon_registered.png";
import { Link } from "react-router-dom";

const TableRegisteredUsers = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [usuarios, setUsuarios] = useState([
        {
            id: 1,
            nome: "João Silva",
            email: "joao@email.com",
            aniversario: "1990-06-15",
            redeProtecao: true,
            likes: 5,
        },
        {
            id: 2,
            nome: "Maria Oliveira",
            email: "maria@email.com",
            aniversario: "1988-03-22",
            redeProtecao: false,
            likes: 12,
        },
        {
            id: 3,
            nome: "Carlos da silva",
            email: "carlosdasilva@email.com",
            aniversario: "1988-03-22",
            redeProtecao: true,
            likes: 6,
        },
    ]);

    // const handleToggleProtecao = (index: number) => {
    //     const updated = [...usuarios];
    //     updated[index].redeProtecao = !updated[index].redeProtecao;
    //     setUsuarios(updated);
    // };

    const filteredUsers = usuarios.filter(
        (u) =>
            u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 font-afacad">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl text-primary mb-4">
                    Usuários Cadastrados
                </h1>

                <div className="relative mb-4 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Buscar por nome ou e-mail..."
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
                        <th className="p-3">Rede de Proteção</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Aniversário</th>
                        <th className="p-3">Likes</th>
                        <th className="p-3">Status</th>
                        <th className="p-3"></th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr
                            key={user.id}
                            className="border-t hover:bg-gray-50 text-lg text-primary"
                        >
                            <td className="p-3">
                                <img
                                    src={catIcon}
                                    alt="avatar"
                                    className="rounded-full w-10 h-10"
                                />
                            </td>
                            <td className="p-3">{user.nome}</td>
                            <td className="p-3">
                                {user.redeProtecao ? "Sim" : "Não"}
                            </td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.aniversario}</td>
                            <td className="p-3 text-center">{user.likes}</td>

                            {/* Nova coluna com ícone */}
                            <td className="p-3 text-center">
                                {user.redeProtecao ? (
                                    <Link to={"/userlikedcats/" + user.id}>
                                        <ExternalLink className="text-green-600 w-5 h-5 mx-auto" />
                                    </Link>
                                ) : (
                                    <AlertTriangle className="text-red-600 w-5 h-5 mx-auto" />
                                )}
                            </td>

                            {/* <td className="p-3 flex gap-2">
                                <button onClick={() => handleEditClick(user)}>
                                    <Pencil className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                                </button>
                                <button onClick={() => handleDeleteClick(user)}>
                                    <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
                                </button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableRegisteredUsers;
