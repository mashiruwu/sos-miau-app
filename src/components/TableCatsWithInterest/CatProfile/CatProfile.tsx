import catIcon from "../../../assets/cat_icon_registered.png";
import { AlertTriangle, ExternalLink } from "lucide-react";

export const CatProfile = () => {
    return (
        <div>
            <div className="flex items-center gap-6 text-primary-hover font-afacad">
                <img src={catIcon} alt="" className="rounded-full w-30 h-30" />
                <div className="flex flex-col ">
                    <h1 className="text-3xl">Nome do gato</h1>
                    <h2 className="text-xl">SRD, Castrado, 12 anos</h2>
                </div>
            </div>
            <hr className="border border-gray-300 mt-5" />
            <div>
                <h1 className="text-4xl font-tiny text-primary-hover my-5">
                    Interessados
                </h1>
                <table className="w-full table-auto border-collapse overflow-hidden text-sm">
                    <thead>
                        <tr className="text-left text-primary text-lg">
                            <th className="p-3"></th>
                            <th className="p-3">Nome</th>
                            <th className="p-3">Rede de proteção</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Idade</th>
                            <th className="p-3">Filho(s)</th>
                            <th className="p-3">Outro(s) pet(s)</th>
                            <th className="p-3">Aprovação</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t hover:bg-gray-50 text-lg text-primary">
                            <td className="p-3">
                                <img
                                    src={catIcon}
                                    alt="avatar"
                                    className="rounded-full w-10 h-10"
                                />
                            </td>
                            <td className="p-3">Adopter 1</td>
                            <td className="p-3">
                                <AlertTriangle className="text-red-600 w-5 h-5 mx-auto" />
                            </td>
                            <td className="p-3">adopter@gmail.com</td>
                            <td className="p-3">24</td>
                            <td className="p-3">Sim</td>
                            <td className="p-3">Não</td>
                            <td className="p-3">
                                <select className="bg-transparent border-none focus:outline-none">
                                    <option value="Sim">Sim</option>
                                    <option value="Não">Não</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
