import catIcon from "../../assets/cat_icon_registered.png";
import { useTranslation } from "react-i18next";
import { TbTableShortcut } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const gatos = [
    {
        nome: "Gato 1",
        genero: "F",
        castrado: "Sim",
        nascimento: "21/03/2013",
        interested: "2",
    },
    {
        nome: "Gato 2",
        genero: "F",
        castrado: "Sim",
        nascimento: "21/03/2013",
        interested: "1",
    },
    {
        nome: "Gato 3",
        genero: "F",
        castrado: "Sim",
        nascimento: "21/03/2013",
        interested: "3",
    },
    {
        nome: "Gato 4",
        genero: "F",
        castrado: "Não",
        nascimento: "21/03/2013",
        interested: "2",
    },
    {
        nome: "Gato 5",
        genero: "F",
        castrado: "Sim",
        nascimento: "21/03/2013",
        interested: "3",
    },
    {
        nome: "Gato 6",
        genero: "F",
        castrado: "Não",
        nascimento: "21/03/2013",
        interested: "1",
    },
    {
        nome: "Gato 7",
        genero: "F",
        castrado: "Sim",
        nascimento: "21/03/2013",
        interested: "1",
    },
    {
        nome: "Gato 8",
        genero: "F",
        castrado: "Não",
        nascimento: "21/03/2013",
        interested: "1",
    },
];

const TableCatsWithInterest = () => {
    const navigate = useNavigate();

    //trocar destino por página de perfil do gatinho
    const handleClick = () => {
      navigate("/destino"); 
    };
  
    const { t } = useTranslation();

    return (
        <div className="p-8 font-afacad">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-tiny text-secondary mb-4">
                    {t("cats_interest.title")}
                </h1>

                <div className="relative mb-4 w-full max-w-md ">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full rounded-full pl-6 pr-10 py-2 shadow-inner border border-black focus:outline-none"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400">
                        🔍
                    </span>
                </div>
            </div>

            <table className="w-full table-auto border-collapse overflow-hidden text-sm">
                <thead>
                    <tr className="text-left text-secondary text-lg">
                        <th className="p-3"> </th>
                        <th className="p-3">{t("cats_interest.name")}</th>
                        <th className="p-3">{t("cats_interest.gender")}</th>
                        <th className="p-3">{t("cats_interest.neutered")}</th>
                        <th className="p-3">{t("cats_interest.birthdate")}</th>
                        <th className="p-3">{t("cats_interest.number")}</th>
                        <th className="p-3">{t("cats_interest.analysis")}</th>
                    </tr>
                </thead>
                <tbody>
                    {gatos.map((gato, index) => (
                        <tr
                            key={index}
                            className="border-t hover:bg-gray-50 text-lg text-secondary"
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
                            <td className="p-3">{gato.castrado}</td>
                            <td className="p-3">{gato.nascimento}</td>
                            <td className="p-3">{gato.interested}</td>
                            <td onClick={handleClick} className="p-3"><TbTableShortcut /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableCatsWithInterest;
