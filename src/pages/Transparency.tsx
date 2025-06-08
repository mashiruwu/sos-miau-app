import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import { useTranslation } from "react-i18next";

export interface ReportItem {
    name: string;
    value: number;
}

// Mapeamento não modificado
const CATEGORY_KEY_MAP: Record<string, string> = {
    "Cuidados Veterinários (consultas, vacinas, castrações, exames e emergências)": "Veterinary Care",
    "Campanhas de Adoção e Conscientização (eventos, materiais informativos e redes sociais)": "Adoption and Awareness Campaigns",
    "Manutenção do Abrigo (limpeza, infraestrutura e bem-estar dos resgatados)": "Shelter Maintenance",
    "Alimentação e Insumos (ração, leite para filhotes, areia higiênica e medicamentos)": "Food and Supplies"
};

function getCategoryKey(name: string) {
    return CATEGORY_KEY_MAP[name] || name;
}

const COLORS = ['#A6CEE3', '#FDBF6F', '#B2DF8A', '#FB9A99'];

function normalizeTo100(data: ReportItem[]): ReportItem[] {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return data;
    return data.map(item => ({
        ...item,
        value: parseFloat(((item.value / total) * 100).toFixed(2))
    }));
}

export function TransparencyPage() {
    const API = import.meta.env.VITE_API_URL
    const { lastMessage, readyState } = useWebSocket(API + '/report', {
        shouldReconnect: () => true,
        retryOnError: true,
    });
    const [data, setData] = useState<ReportItem[]>([]);

    useEffect(() => {
        if (lastMessage) {
            try {
                const parsed = JSON.parse(lastMessage.data);
                setData(normalizeTo100(parsed));
            } catch (err) {
                console.error('Invalid WS payload', err);
            }
        }
    }, [lastMessage]);

    useEffect(() => {
        if (readyState === WebSocket.CLOSED) {
            const API = import.meta.env.VITE_API_URL
            fetch(API + '/report')
                .then(r => r.json())
                .then(data => setData(normalizeTo100(data)))
                .catch(console.error);
        }
    }, [readyState]);

    const { t } = useTranslation();

    return (
        <>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center mb-10 font-tiny text-secondary uppercase">
                {t("transparency.title")}
            </h1>

            <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-15 font-afacad text-xl text-secondary">
                
                <div className="w-full max-w-xs md:w-1/3 aspect-square">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={true}
                                data={data}
                                outerRadius="100%" 
                                fill="#8884d8"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-full md:w-2/3">
                    <h2 className="text-base sm:text-2xl ">
                        {t("transparency.collected_value", { month: "FEV/25", value: "R$ 22.579,43" })}
                    </h2>
                    <br />
                    <h3>💰 {t("transparency.resources_distribution")}</h3>
                    {data.map((item, index) => (
                        <p key={index} className="flex items-center mt-2">
                            <span
                                className="inline-block w-4 h-4 rounded-full mr-3 shrink-0"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></span>
                            <span>
                                {item.value}% – {t('transparency.categories.' + getCategoryKey(item.name), item.name)}
                            </span>
                        </p>
                    ))}
                </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-5 font-tiny text-secondary uppercase">
                {t("transparency.reports.title")}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-15 font-afacad text-2xl">
                {/* Botões não precisam de alteração individual, apenas o contêiner pai */}
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    {t("transparency.reports.buttons.financial_jan")}
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    {t("transparency.reports.buttons.activities_jan")}
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    {t("transparency.reports.buttons.impact")}
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    {t("transparency.reports.buttons.financial_feb")}
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    {t("transparency.reports.buttons.activities_feb")}
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    {t("transparency.reports.buttons.campaigns")}
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    {t("transparency.reports.buttons.financial_mar")}
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    {t("transparency.reports.buttons.activities_mar")}
                </button>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-5 font-tiny text-secondary uppercase">
                {t("transparency.partnerships.title")}
            </h1>

            <p className="font-afacad text-xl pb-10 text-secondary">
                {t("transparency.partnerships.description")}
            </p>
        </>
    );
}