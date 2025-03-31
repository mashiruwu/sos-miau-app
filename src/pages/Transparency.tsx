import { useTranslation } from "react-i18next";

export function TransparencyPage() {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="text-5xl text-center mb-10 font-tiny text-primary uppercase">
                {t("transparency.title")}
            </h1>
            <div className="flex justify-between items-center max-sm:flex-col max-md:flex-row max-lg:flex-row max-xl:flex-row mb-15 font-afacad text-xl text-primary">
                <div className="w-60 h-60 bg-amber-300 rounded-full"></div>
                <div className="w-3/5">
                    <h2>VALOR ARRECADADO EM FEV/25: R$ 22.579,43</h2>
                    <br></br>
                    <h3>💰 Distribuição dos Recursos:</h3>
                    <p>
                        🐾 45% – Cuidados Veterinários (consultas, vacinas,
                        castrações, exames e emergências)
                    </p>
                    <p>
                        🐾 30% – Alimentação e Insumos (ração, leite para
                        filhotes, areia higiênica e medicamentos)
                    </p>
                    <p>
                        🐾 15% – Manutenção do Abrigo (limpeza, infraestrutura e
                        bem-estar dos resgatados)
                    </p>
                    <p>
                        🐾 10% – Campanhas de Adoção e Conscientização (eventos,
                        materiais informativos e redes sociais)
                    </p>
                </div>
            </div>

            <h1 className="text-4xl mb-5 font-tiny text-primary uppercase">
                {t("transparency.reports.title")}
            </h1>

            <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-x-15 gap-y-5 mb-15 font-afacad text-2xl">
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    FINANCEIRO JAN/25
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    ATIVIDADES JAN/25
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    IMPACTO DA ONG
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    FINANCEIRO FEV/25
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    ATIVIDADES FEV/25
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    CAMPANHAS
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    FINANCEIRO MAR/25
                </button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d] cursor-pointer">
                    ATIVIDADES MAR/25
                </button>
            </div>

            <h1 className="text-4xl mb-5 font-tiny text-primary uppercase">
                {t("transparency.partnerships.title")}
            </h1>

            <p className="font-afacad text-xl pb-10 text-primary">
                {t("transparency.partnerships.description")}
            </p>
        </>
    );
}
