import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTranslation } from "react-i18next";

const data01 = [
    { name: 'Cuidados Veterinários (consultas, vacinas, castrações, exames e emergências)', value: 45 },
    { name: 'Alimentação e Insumos (ração, leite para filhotes, areia higiênica e medicamentos)', value: 30 },
    { name: 'Manutenção do Abrigo (limpeza, infraestrutura e bem-estar dos resgatados)', value: 15 },
    { name: 'Campanhas de Adoção e Conscientização (eventos, materiais informativos e redes sociais)', value: 10 },
];

const COLORS = ['#A6CEE3', '#FDBF6F', '#B2DF8A', '#FB9A99'];


export function TransparencyPage() {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="text-5xl text-center mb-10 font-tiny text-secondary uppercase">
                {t("transparency.title")}
            </h1>
            <div className="flex justify-between items-center max-sm:flex-col max-md:flex-row max-lg:flex-row max-xl:flex-row mb-15 font-afacad text-xl text-secondary">
                <div className="w-60 h-60 bg-amber-300 rounded-full"></div>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={100} height={100}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={true}
                            data={data01}
                            outerRadius="104%"
                            fill="#8884d8"
                        >
                            {data01.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-3/5">
                    <h2>VALOR ARRECADADO EM FEV/25: R$ 22.579,43</h2>
                    <br></br>
                    <h3>💰 Distribuição dos Recursos:</h3>
                    {data01.map((item, index) => (
                        <p key={index}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.0"
                                width="15pt"
                                height="15pt"
                                viewBox="0 0 1280 1254"
                                preserveAspectRatio="xMidYMid meet"
                                className="inline w-5 h-5 mr-2" // Tailwind color class             
                                style={{ color: COLORS[index] }}
                                >
                                <g
                                    transform="translate(0,1254) scale(0.1,-0.1)"
                                    fill="currentColor" // Use currentColor so Tailwind can control this
                                    stroke="none"
                                >
                                    <path d="M4269 12526c-178-51-302-126-434-260-225-228-364-546-411-941-34-290 2-542 111-772 53-113 91-170 169-251 141-147 296-222 463-222 93 0 159 18 263 70 363 182 619 590 686 1090 27 204 9 503-42 677-82 283-281 510-521 594-74 26-220 34-284 15z"/>
                                    <path d="M1880 12492c-243-80-444-319-520-618-11-41-25-142-32-224-40-492 129-992 441-1300 124-123 300-229 441-266 202-53 468 64 614 270 140 197 206 427 206 721 0 174-18 312-60 473-123 471-392 802-760 932-90 32-251 38-330 12z"/>
                                    <path d="M5740 10584c-232-49-469-211-630-428-160-218-257-463-300-758-24-167-25-233-5-358 32-197 112-366 230-485 82-83 160-131 258-156 222-59 511 39 740 251 148 136 306 390 377 607 66 199 98 454 80 629-16 156-78 330-159 448-28 41-113 127-161 164-114 88-274 120-430 86z"/>
                                    <path d="M565 10463c-255-39-448-205-515-443-50-180-62-371-34-559 49-332 194-631 414-852 151-151 290-238 480-301 225-73 424-20 586 155 138 149 191 302 201 582 4 125 2 171-16 274-55 323-194 594-420 822-152 153-328 268-464 303-60 16-187 26-232 19z"/>
                                    <path d="M3152 9180c-471-60-930-332-1219-725-245-332-434-677-557-1019-83-229-156-533-156-652 0-270 173-538 410-635 91-37 204-53 310-44 191 15 321 50 665 180 368 139 463 165 683 191 301 36 502-6 942-194 389-166 477-192 640-192 305 0 549 160 623 408 26 90 28 314 3 417-63 260-178 521-354 805-395 637-700 990-1067 1235-163 109-318 175-496 210-92 19-330 27-427 15z"/>
                                    <path d="M10565 6435c-399-108-703-492-810-1023-93-461-20-863 208-1151 158-199 414-307 615-260 75 18 222 93 308 157 233 175 408 451 490 772 45 176 57 297 51 500-8 275-37 412-124 582-86 168-202 292-342 366-130 68-277 89-396 57z"/>
                                    <path d="M8234 6415c-227-41-445-256-542-535-81-232-86-609-13-897 123-480 401-827 776-968 81-31 195-37 285-16 281 67 491 325 571 704 26 120 31 384 10 527-81 562-365 987-765 1146-65 26-211 58-244 53-4 0-39-7-78-14z"/>
                                    <path d="M12115 4509c-449-60-832-463-969-1019-38-157-57-345-46-463 21-222 99-412 225-545 151-160 307-214 515-178 425 74 799 495 919 1033 28 125 45 319 37 429-20 288-168 558-371 675-93 54-216 81-310 68z"/>
                                    <path d="M6810 4364c-167-35-326-155-403-302-101-192-130-507-72-788 42-203 152-448 271-607 247-328 640-529 914-466 91 21 171 70 260 159 159 158 220 336 222 640 1 321-101 628-300 900-74 101-230 253-326 317-213 144-380 187-566 147z"/>
                                    <path d="M9435 3089c-327-44-641-188-920-421-121-101-212-205-342-391-304-433-484-819-600-1287-41-162-47-199-47-295 0-88 4-125 23-185 73-235 227-400 434-465 65-21 98-25 201-25 211 0 333 30 745 185 375 140 454 162 676 186 296 32 498-12 962-210 387-164 475-188 653-177 186 11 321 67 436 181 127 125 171 258 161 480-15 319-176 683-551 1245-302 454-575 749-882 953-166 110-311 173-487 212-87 19-363 28-462 14z"/>
                                </g>
                            </svg>
                        {' '}
                        {item.value}% – {item.name}
                        </p>
                    ))}
                </div>
            </div>

            <h1 className="text-4xl mb-5 font-tiny text-secondary uppercase">
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

            <h1 className="text-4xl mb-5 font-tiny text-secondary uppercase">
                {t("transparency.partnerships.title")}
            </h1>

            <p className="font-afacad text-xl pb-10 text-secondary">
                {t("transparency.partnerships.description")}
            </p>
        </>
    );
}
