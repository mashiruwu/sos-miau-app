const About = () => {
    return (
        <>
            <section className="bg-primary w-full text-white rounded-md px-10 py-5">
                <div>
                    <img />
                </div>
                <div>
                    <div className="flex flex-col gap-5 w-[600px]">
                        <h1 className="font-tiny text-3xl">SOBRE NÓS</h1>
                        <p>
                            A SOS Miau é uma ONG dedicada ao resgate,
                            reabilitação e adoção responsável de gatinhos em
                            situação de vulnerabilidade. Nosso compromisso é
                            oferecer uma segunda chance a felinos abandonados,
                            vítimas de maus-tratos ou em condições de risco.
                        </p>
                    </div>
                    <div>
                        <h1 className="font-tiny text-3xl">NOSSA MISSÃO</h1>
                        <p className="flex flex-col gap-5 w-[600px]">
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
        </>
    );
};

export default About;
