import { InfoCarousel } from "../components/InfoCarousel/InfoCarousel";
import Divulgue from "../assets/divulgue.png";
import QrCode from "../assets/qrcode.png";
import PadrinhoMadrinhaImg from "../assets/padrinho_madrinha.png";
import AdoteImg from "../assets/adoteImg.png";
import { Link } from "react-router-dom";

const HelpPage = () => {
    const infoSlides = [
        {
            id: 1,
            title: "Faça uma doação",
            image: QrCode,
            description: "What drives us forward",
            alt: "Chave PIX em QR Code",
            content: (
                <>
                    <p>
                        Somos uma ONG independente, e cada doação é fundamental
                        para manter nosso trabalho. Você pode contribuir de
                        diferentes formas:
                    </p>
                    <p>
                        💰 Doação financeira: Ajuda nos custos diários com
                        ração, medicamentos, castrações e atendimentos
                        veterinários. Qualquer valor faz a diferença!
                    </p>
                    <p>
                        📦 Doação de itens: Aceitamos ração, areia higiênica,
                        medicamentos, cobertores, brinquedos e outros itens
                        essenciais para nossos resgatados.
                    </p>
                    <p>
                        🏥 Parcerias com clínicas veterinárias: Se você é
                        veterinário ou tem uma clínica, pode oferecer consultas
                        ou descontos para nossos resgatados!
                    </p>
                    <p>
                        📌 Dados para doação:<br></br>🔹 PIX:
                        [chave@example.com]<br></br>🔹 Conta bancária: [Banco,
                        Agência, Conta] <br></br>Entre em contato para combinar
                        doações de itens ou oferecer ajuda de outras formas!
                    </p>
                </>
            ),
        },
        {
            id: 2,
            title: "Divulgue nosso trabalho",
            image: Divulgue,
            description: "What we believe in",
            content: (
                <>
                    <p>📣 Divulgue Nosso Trabalho</p>
                    <p>
                        Nem todo mundo pode adotar ou contribuir
                        financeiramente, mas a divulgação também é uma maneira
                        incrível de ajudar! Compartilhe nossos posts, convide
                        amigos para conhecer a SOS Miau e ajude mais gatinhos a
                        encontrarem um lar.
                    </p>
                    <p>
                        📲 Siga nossas redes sociais e compartilhe:
                        <br />
                        Instagram: @sosmiau
                        <br />
                        Facebook: SOS Miau Oficial
                        <br />
                        WhatsApp: [número para contato]
                    </p>
                </>
            ),
        },
        {
            id: 3,
            title: "SEJA UM PADRINHO/MADRINHA",
            description: "How we work",
            image: PadrinhoMadrinhaImg,
            content: (
                <>
                    <p>
                        Nem sempre podemos adotar, mas você pode mudar a vida de
                        um gatinho ao se tornar um padrinho ou madrinha! Com uma
                        contribuição mensal, você ajuda nos custos com
                        alimentação, cuidados veterinários e bem-estar dos
                        nossos resgatados.
                    </p>
                    <p>📦 Com seu apadrinhamento, garantimos:</p>
                    <p>
                        🩺 Consultas veterinárias e vacinas.
                        <br />
                        🍲 Alimentação de qualidade.
                        <br />
                        🏡 Manutenção do abrigo e itens de conforto para os
                        gatinhos.
                        <br />
                        Ao se tornar um padrinho, você recebe atualizações sobre
                        o gatinho apadrinhado e pode acompanhá-lo até que ele
                        encontre um lar definitivo!
                    </p>
                </>
            ),
        },
        {
            id: 4,
            title: "ADOTE UM GATINHO",
            description: "Who we are",
            image: AdoteImg,
            content: (
                <>
                    <p>
                        💙 O que você precisa para adotar?
                        <br />✅ Ser maior de idade e apresentar documento com
                        foto.
                        <br />✅ Ter um ambiente seguro para o gatinho (janelas
                        teladas são essenciais).
                        <br />✅ Compromisso em oferecer amor, cuidados
                        veterinários e alimentação adequada. Se você deseja
                        conhecer nossos gatinhos disponíveis para adoção,{" "}
                        <Link
                            to={"/"}
                            className="underline cursor-pointer text-primary shadow-2xl"
                        >
                            clique aqui!
                        </Link>
                    </p>
                </>
            ),
        },
    ];

    return (
        <>
            <section className="mb-30 flex flex-col gap-10">
                <img
                    src="https://jpimg.com.br/uploads/2023/06/10-dicas-para-cuidar-de-um-gato-filhote.jpg"
                    className="w-full h-[400px] object-cover"
                />
                <InfoCarousel slides={infoSlides} />
            </section>
        </>
    );
};

export default HelpPage;
