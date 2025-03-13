import CatAbout from "../assets/gato_about.png";
import CatAbout2 from "../assets/gato_about2.png";

const About = () => {
    return (
        <>
            <section className="bg-primary w-full mx-auto text-white rounded-md lg:px-10 px-4 py-10 flex lg:flex-row flex-col-reverse">
                <div>
                    <img
                        src={CatAbout}
                        className="lg:visible lg:mb-0 mt-4 mx-auto"
                    />
                </div>
                <div className="flex flex-col gap-5 lg:text-left text-center font-afacad text-lg">
                    <div className="flex flex-col gap-2 lg:w-[800px]">
                        <h1 className="font-tiny text-3xl">SOBRE NÓS</h1>
                        <p>
                            A SOS Miau é uma ONG dedicada ao resgate,
                            reabilitação e adoção responsável de gatinhos em
                            situação de vulnerabilidade. Nosso compromisso é
                            oferecer uma segunda chance a felinos abandonados,
                            vítimas de maus-tratos ou em condições de risco.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[800px]">
                        <h1 className="font-tiny text-3xl">NOSSA MISSÃO</h1>
                        <p>
                            Nosso principal objetivo é garantir que cada gatinho
                            tenha acesso a cuidados médicos, alimentação
                            adequada e, principalmente, um lar seguro e amoroso.
                            Atuamos no resgate de gatos de rua, promovemos
                            campanhas de castração para o controle populacional
                            e realizamos adoções responsáveis, conectando cada
                            felino à família ideal.
                        </p>
                    </div>
                </div>
            </section>
            <h1 className="font-tiny text-primary text-4xl text-center mt-10">
                O QUE FAZEMOS?
            </h1>
            <section className="flex lg:flex-row flex-col justify-evenly my-10 items-center">
                <ul className="lg:w-[65%] w-full font-afacad text-xl flex flex-col gap-5 ">
                    <li>
                        ✅ Resgate e acolhimento: Salvamos gatinhos em situações
                        críticas e proporcionamos um ambiente seguro para sua
                        recuperação.
                    </li>
                    <li>
                        ✅ Cuidados veterinários: Oferecemos atendimento
                        veterinário, vacinação, castração e reabilitação para
                        garantir a saúde dos nossos resgatados.
                    </li>
                    <li>
                        ✅ Adoção responsável: Selecionamos adotantes
                        comprometidos em oferecer amor e segurança para toda a
                        vida do animal.
                    </li>
                    <li>
                        ✅ Conscientização e educação: Promovemos campanhas
                        sobre posse responsável, importância da castração e
                        combate ao abandono.
                    </li>
                </ul>
                <img src={CatAbout2} alt="" className="w-[350px]" />
            </section>
            <h1 className="font-tiny text-primary text-4xl text-center mt-10">
                COMO AJUDAR?
            </h1>
            <section className="my-10">
                <ul className="font-afacad text-xl text-center flex flex-col gap-2">
                    <li>
                        🐾 Divulgando nosso trabalho e ajudando mais gatinhos a
                        encontrarem um lar.
                    </li>
                    <li>
                        🐾 Adotando um gatinho e dando a ele uma nova chance de
                        ser feliz.
                    </li>
                    <li>
                        🐾 Apadrinhando um resgatado e ajudando com seus
                        cuidados.
                    </li>
                    <li>
                        🐾 Doando ração, medicamentos ou qualquer valor para
                        mantermos nossas ações
                    </li>
                    <li>
                        🐾 Divulgando nosso trabalho e ajudando mais gatinhos a
                        encontrarem um lar.
                    </li>
                </ul>
            </section>
            <section className="bg-primary w-full text-white rounded-md p-10 my-20 flex font-afacad text-xl">
                <p className="mx-auto">
                    Junte-se a nós nessa missão! Todo gatinho merece amor,
                    segurança e um lar para chamar de seu. 🏡💙🐾
                </p>
            </section>
        </>
    );
};

export default About;
