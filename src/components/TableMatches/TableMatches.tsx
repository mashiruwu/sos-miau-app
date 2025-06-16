import { useEffect, useState } from "react";
import catIcon from "../../assets/cat_icon_registered.png";
import { useTranslation } from "react-i18next";

const TableMatches = (props: { data: [{ cat_name: string, adopter_name: string, date: string }] }) => {

    const { t } = useTranslation();

    const formatDate = (utcString: string) => {
        const date = new Date(utcString);
        
        // Format to local date and time
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        
        const formatted = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return formatted;
    }

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
                    {props.data.map((gato, index) => (
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
                            <td className="p-3">{gato.cat_name}</td>
                            <td className="p-3">{gato.adopter_name}</td>
                            <td className="p-3">{formatDate(gato.matchData.date)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableMatches;
