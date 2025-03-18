export function TransparencyPage(){

    return (
        <>
            <h1 className="text-3xl text-center mb-10">TRANSPARÊNCIA</h1>

            <div className="flex justify-between items-center xs:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row mb-15">
                <div className="w-60 h-60 bg-amber-300 rounded-full">

                </div>
                <div className="w-3/5">
                    <h2 className="text-xl">VALOR ARRECADADO EM FEV/25: R$ 22.579,43</h2>
                    <br></br>
                    <h3>💰 Distribuição dos Recursos:</h3>
                    <p>🐾 45% – Cuidados Veterinários (consultas, vacinas, castrações, exames e emergências)</p>
                    <p>🐾 30% – Alimentação e Insumos (ração, leite para filhotes, areia higiênica e medicamentos)</p>
                    <p>🐾 15% – Manutenção do Abrigo (limpeza, infraestrutura e bem-estar dos resgatados)</p>
                    <p>🐾 10% – Campanhas de Adoção e Conscientização (eventos, materiais informativos e redes sociais)</p>
                </div>
            </div>

            <h1 className="text-3xl mb-5">RELATÓRIOS</h1>
            
            <div className="grid grid-cols-3 gap-x-15 gap-y-5 mb-15">
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d]">FINANCEIRO JAN/25</button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d]">ATIVIDADES JAN/25</button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d]">IMPACTO DA ONG</button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d]">FINANCEIRO FEV/25</button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d]">ATIVIDADES FEV/25</button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d]">cAMPANHAS</button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d]">FINANCEIRO MAR/25</button>
                <button className="rounded-md h-13 text-white bg-[#153151] hover:bg-[#1a4964] active:bg-[#102d3d]">ATIVIDADES MAR/25</button>

            </div>

            <h1 className="text-3xl mb-5">PARCERIAS</h1>
            
            <p className="p-5">Na SOS Miau, acreditamos que a união faz a força! Contamos com o apoio de empresas, clínicas veterinárias e pessoas incríveis que compartilham nosso compromisso de proteger e cuidar dos gatinhos em situação de vulnerabilidade.
                Graças às nossas parcerias, conseguimos oferecer tratamentos veterinários, garantir alimentação de qualidade, promover eventos de adoção e conscientizar mais pessoas sobre a importância do bem-estar animal.
                💙 Quer se tornar um parceiro da SOS Miau? Entre em contato e venha fazer a diferença na vida de muitos gatinhos! 🐾</p>
        </>
    )
}