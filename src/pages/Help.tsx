import { InfoCarousel } from "../components/InfoCarousel/InfoCarousel";
import Divulgue from "../assets/divulgue.png";
import Money from "../assets/Money.png";
import QrCode from "../assets/qrcode.png";
import PadrinhoMadrinhaImg from "../assets/padrinho_madrinha.png";
import AdoteImg from "../assets/adoteImg.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const HelpPage = () => {
    const { t } = useTranslation();

    const [openModal, setOpenModal] = useState(false)

    const infoSlides = [
        {
            id: 1,
            title: `${t("want_help.make_donation.title")}`,
            image: Money,
            alt: `${t("want_help.make_donation.alt")}`,
            content: (
                <>
                    <p>{t("want_help.make_donation.content._1")}</p>
                    <p>{t("want_help.make_donation.content._2")}</p>
                    <p>{t("want_help.make_donation.content._3")}</p>
                    <p>{t("want_help.make_donation.content._4")}</p>
                </>
            ),
        },
        {
            id: 2,
            title: `${t("want_help.share_our_work.title")}`,
            image: Divulgue,
            content: (
                <>
                    <br />
                    <p>{t("want_help.share_our_work.content._1")}</p><br />
                    <p>{t("want_help.share_our_work.content._2")}</p>
                    <p>
                        {t("want_help.share_our_work.social_media.instagram")}
                    </p>
                    <p>{t("want_help.share_our_work.social_media.facebook")}</p>
                    <p>{t("want_help.share_our_work.social_media.whatsapp")}</p>
                    <br />
                </>
            ),
        },
        {
            id: 3,
            title: `${t("want_help.become_sponsor.title")}`,
            image: PadrinhoMadrinhaImg,
            content: (
                <>
                    <p>{t("want_help.become_sponsor.content._1")}</p>
                    <p>{t("want_help.become_sponsor.content._2")}</p>
                    <p>{t("want_help.become_sponsor.content._3")}</p>
                    <p>{t("want_help.become_sponsor.content._4")}</p>
                    <p>{t("want_help.become_sponsor.content._5")}</p>
                    <p>{t("want_help.become_sponsor.content._6")}</p>
                </>
            ),
        },
        {
            id: 4,
            title: `${t("want_help.adopt_cat.title")}`,
            image: AdoteImg,
            content: (
                <>
                    <p>{t("want_help.adopt_cat.content._1")}</p>
                    <p>{t("want_help.adopt_cat.content._2")}</p>
                    <p>{t("want_help.adopt_cat.content._3")}</p>
                    <p>{t("want_help.adopt_cat.content._4")}</p>
                    <p>
                        {t("want_help.adopt_cat.content._5")}
                        <Link
                            to={"/"}
                            className="underline cursor-pointer text-primary shadow-2xl"
                        >
                            {t("want_help.adopt_cat.content.link")}
                        </Link>
                    </p>
                </>
            ),
        },
    ];

    const [donationIndex, setDonationIndex] = useState(0)

    const infoDonation = [
        {
            area: "Cuidados Veterinários",
            contribuicoes: ["consultas", "vacinas", "castrações", "exames", "emergências"]
        },
        {
            area: "Alimentação e Insumos",
            contribuicoes: ["ração", "leite para filhotes", "areia higiênica", "medicamentos"]
        },
        {
            area: "Manutenção do Abrigo",
            contribuicoes: ["limpeza", "infraestrutura", "bem-estar dos resgatados"]
        },
        {
            area: "Campanhas de Adoção e Conscientização",
            contribuicoes: ["eventos", "materiais informativos", "redes sociais"]
        },
    ]

    const [amount, setAmount] = useState(0.0);
    const [inputValue, setInputValue] = useState("R$ 0,00");

    const formatToCurrency = (value: string) => {
        const number = parseFloat(value.replace(/[^\d]/g, '')) / 100 || 0.00;
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const handleChange = (e: { target: { value: any; }; }) => {
        const raw = e.target.value;
        const cleaned = raw.replace(/[^\d]/g, ''); // Keep only digits
        const numeric = parseFloat(cleaned) / 100 || 0;
        setAmount(numeric);
        setInputValue(formatToCurrency(cleaned));
    };

    const handlePay = () => {
        const area = infoDonation[donationIndex]?.area;
        const userId = sessionStorage.getItem("userId");
        console.log(userId)

        if (!userId || !area) {
            return;
        }

        const report = {
            userId,
            userName: "user",
            amount,
            area
        };

        fetch('http://localhost:3000/report/donations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(report)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to submit donation");
                }
                return response.json();
            })
            .then(data => {
                console.log("Report submitted successfully:", data);
            })
            .catch(error => {
                console.error("Error submitting report:", error);
            }
            );
    }

    useEffect(() => {
        console.log(amount)
    }, [amount])
    return (
        <>
            <section className="flex flex-col gap-10">
                <img
                    src="https://jpimg.com.br/uploads/2023/06/10-dicas-para-cuidar-de-um-gato-filhote.jpg"
                    className="w-full h-[500px] object-cover"
                />
                <InfoCarousel slides={infoSlides} />

                <div className="flex justify-center items-center mt-5 py-20 bg-gray-100 pb-30">
                    <div className="mx-auto max-w-md w-100 p-15 bg-gradient-to-br from-white to-sky-50 rounded-lg shadow-2xl text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Deseja fazer uma doação?</h2>
                        <p className="text-gray-600 mb-4">Escolha uma área para doar</p>

                        <div className="flex flex-col gap-3">
                            {
                                infoDonation.map((val, idx) => (
                                    <button className="rounded-md py-2 px-4 mx-4 bg-primary dark:bg-secondary hover:brightness-110 active:brightness-90 text-secondary dark:text-gray-100 " onClick={() => { setOpenModal(true); setDonationIndex(idx); }}>
                                        {val.area}
                                    </button>
                                ))
                            }

                        </div>
                    </div>
                </div>

                <div className={`fixed inset-0 flex justify-center items-center backdrop-contrast-35 backdrop-blur-xs z-50 ${openModal ? '' : 'hidden'}`}>
                    <div className="relative text-center max-w-lg m-2 p-6 rounded-lg bg-white shadow-lg">
                        <button className="absolute top-2 right-2 p-1 rounded-md bg-primary dark:bg-secondary hover:brightness-110 active:brightness-90 text-secondary dark:text-gray-100 " onClick={() => { setOpenModal(false) }}>
                            Cancelar
                        </button>

                        <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-6">
                            {infoDonation[donationIndex].area}
                        </h3>

                        <div className="flex ">
                            <div className="flex flex-col justify-around items-center gap-1">
                                {[5, 10, 20, 50, 100].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => {
                                            setAmount(val);
                                            setInputValue(formatToCurrency((val * 100).toString()));
                                        }}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded w-full"
                                    >
                                        {formatToCurrency((val * 100).toString())}
                                    </button>
                                ))}

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="R$ 0,00"
                                    value={inputValue}
                                    onChange={handleChange}
                                    className="mt-2 rounded-sm border border-gray-300 w-32 text-center py-3"
                                />
                            </div>

                            <div className="flex flex-col px-2 min-h-full justify-between">
                                <div className="mt-3">
                                    <p>Ao escolher {infoDonation[donationIndex].area}, voce estará contribuindo com:</p>
                                    <ul className="text-start px-10 list-disc list-inside">
                                        {
                                            infoDonation[donationIndex].contribuicoes.map((val) => (
                                                <li>{val}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <button className="p-3 mt-4 rounded-md text-xl bg-primary dark:bg-secondary hover:brightness-110 active:brightness-90 text-secondary dark:text-gray-100" onClick={() => { setOpenModal(false); handlePay(); }}>
                                    Finalizar Pagamento
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
        </>
    );
};

export default HelpPage;
