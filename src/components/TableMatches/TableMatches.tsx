import catIcon from "../../assets/cat_icon_registered.png";
import { useTranslation } from "react-i18next";

const gatos = [
    {
        nome: "Gato 1",
        adopter_name: "Adotante 1",
        match: "21/03/2025"
    },
    {
        nome: "Gato 2",
        adopter_name: "Adotante 1",
        match: "21/03/2025"
    },
    {
        nome: "Gato 3",
        adopter_name: "Adotante 1",
        match: "21/03/2025"
    },
    {
        nome: "Gato 4",
        adopter_name: "Adotante 1",
        match: "21/03/2025"
    },
    {
        nome: "Gato 5",
        adopter_name: "Adotante 1",
        match: "21/03/2025"
    },
];

const TableMatches = () => {
    const { t } = useTranslation();

    return (
        <div className="p-8 font-afacad">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-tiny text-secondary mb-4">
                    Matches
                </h1>

                <div className="relative mb-4 w-full max-w-md ">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full rounded-full pl-6 pr-10 py-2 shadow-inner border focus:outline-none border-secondary"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400 dark:text-secondary">
                        🔍
                    </span>
                </div>
            </div>

            <table className="w-full table-auto border-collapse overflow-hidden text-sm">
                <thead>
                    <tr className="text-left text-lg dark:text-secondary">
                        <th className="p-3"> </th>
                        <th className="p-3">{t("matches.name")}</th>
                        <th className="p-3">{t("matches.adopter_name")}</th>
                        <th className="p-3">{t("matches.match_date")}</th>
                    </tr>
                </thead>
                <tbody>
                    {gatos.map((gato, index) => (
                        <tr
                            key={index}
                            className="border-t hover:bg-gray-50 text-lg dark:text-secondary"
                        >
                            <td className="p-3">
                                <img
                                    src={catIcon}
                                    alt="avatar"
                                    className="rounded-full w-10 h-10"
                                />
                            </td>
                            <td className="p-3">{gato.nome}</td>
                            <td className="p-3">{gato.adopter_name}</td>
                            <td className="p-3">{gato.match}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableMatches;
