import { InfoCarousel } from "../components/InfoCarousel/InfoCarousel";
import RescueCat from "../assets/rescue_cat.png";
import Polenta from "../assets/polenta.png";

const Rescue = () => {
    const infoSlides = [
        {
            id: 1,
            title: "Luna",
            image: RescueCat,
            content: (
                <>
                    <p>
                        Luna foi encontrada em uma caixa de papelão, em um dia
                        frio e chuvoso. Frágil e assustada, ela mal conseguia
                        miar. Após receber os cuidados necessários, incluindo
                        alimentação, vacinação e muito amor, Luna mostrou seu
                        lado carinhoso e brincalhão. Hoje, vive em um lar cheio
                        de carinho, onde recebe tudo que sempre mereceu!
                    </p>
                </>
            ),
        },
        {
            id: 2,
            title: "Polenta",
            image: Polenta,
            content: (
                <>
                    <p>
                        Polenta foi resgatada em uma obra abandonada, onde vivia
                        entre entulhos e muito perigo. Extremamente magra e com
                        medo de humanos, ela surpreendeu todos com sua
                        recuperação rápida. Hoje, é uma gatinha gulosa e cheia
                        de energia, adora ficar no colo e brincar com bolinhas!
                    </p>
                </>
            ),
        },
        {
            id: 3,
            title: "Ragnar",
            image: RescueCat,
            content: (
                <>
                    <p>
                        Ragnar nasceu em uma ninhada de rua e era o menorzinho
                        de todos. Após ser acolhido ainda filhote, enfrentou uma
                        infecção grave, mas foi guerreiro e sobreviveu. Hoje, é
                        o dono do sofá da casa onde vive, e adora amassar
                        pãozinho no colo dos tutores.
                    </p>
                </>
            ),
        },
        {
            id: 4,
            title: "Billy",
            image: RescueCat,
            content: (
                <>
                    <p>
                        Encontrado preso em uma garagem abandonada, Billy passou
                        dias sem comida. Depois do resgate, recebeu atenção
                        veterinária e muito carinho. Hoje é um gato tranquilo,
                        adora dormir enrolado nas cobertas e ronrona com
                        facilidade.
                    </p>
                </>
            ),
        },
        {
            id: 5,
            title: "Lily",
            image: RescueCat,
            content: (
                <>
                    <p>
                        Lily foi salvo de uma área com risco de enchente. Estava
                        molhado, com frio e muita fome. Foi acolhido rapidamente
                        e se recuperou com o apoio da equipe de voluntários.
                        Hoje, tem um lar cheio de amor e gosta de acordar os
                        humanos com miados matinais pedindo petiscos.
                    </p>
                </>
            ),
        },
        {
            id: 6,
            title: "Amora",
            image: RescueCat,
            content: (
                <>
                    <p>
                        Amora vivia em um terreno baldio e foi avistada cuidando
                        de outros filhotes abandonados, mesmo não sendo sua mãe.
                        Com seu instinto protetor, conquistou todos no abrigo.
                        Hoje vive com outros gatinhos resgatados e continua
                        sendo uma mãezona amorosa.
                    </p>
                </>
            ),
        },
    ];

    return (
        <section className="mb-30 flex flex-col gap-10">
            <img
                src="https://jpimg.com.br/uploads/2023/06/10-dicas-para-cuidar-de-um-gato-filhote.jpg"
                className="w-full h-[500px] object-cover"
            />
            <InfoCarousel slides={infoSlides} />
        </section>
    );
};

export default Rescue;
