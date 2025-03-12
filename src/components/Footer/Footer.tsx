import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize); // Atualiza quando a tela muda

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <>
            {!isMobile && (
                <footer className="mt-auto h-fit bg-primary py-5 px-18 flex justify-between font-afacad text-white">
                    <div className="w-[45%] flex flex-col gap-2">
                        <h1 className="text-2xl font-tiny">SOS MIAU</h1>
                        <p className="text-md">
                            Somos a SOS MIAU, uma ONG dedicada ao resgate,
                            cuidado e adoção responsável de gatos em situação de
                            abandono. Nosso trabalho inclui resgatar felinos em
                            risco, oferecer cuidados veterinários e encontrar
                            lares amorosos para cada um deles. Acreditamos que
                            todo gatinho merece carinho, segurança e uma segunda
                            chance.
                        </p>
                        <p className="mt-2 text-lg">
                            📍 Ajude-nos a transformar vidas! 🐱💙
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                        <h1 className="text-2xl font-tiny">MENU</h1>
                        <div className="uppercase flex flex-col">
                            <a className="hover:underline cursor-pointer">
                                Sobre nós
                            </a>
                            <a className="hover:underline cursor-pointer">
                                Quero adotar
                            </a>
                            <a className="hover:underline cursor-pointer">
                                Quero ajudar
                            </a>
                            <a className="hover:underline cursor-pointer">
                                Resgate
                            </a>
                            <a className="hover:underline cursor-pointer">
                                Gatos Adotados
                            </a>
                            <a className="hover:underline cursor-pointer">
                                Transparência
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-tiny">ACOMPANHE-NOS</h1>
                        <div className="flex justify-evenly">
                            <FaFacebook size={48} />
                            <FaInstagram size={48} />
                            <FaSquareXTwitter size={48} />
                        </div>
                    </div>
                </footer>
            )}
            {isMobile && (
                <footer className="mt-auto h-fit bg-primary py-5 lg:px-20 px-10 flex justify-between gap-5 font-afacad text-white items-center">
                    <h1 className="font-tiny">
                        <span className="font-afacad">©</span> SOS Miau
                    </h1>
                    <div className="flex gap-4">
                        <FaFacebook size={20} />
                        <FaInstagram size={20} />
                        <FaSquareXTwitter size={20} />
                    </div>
                </footer>
            )}
        </>
    );
};

export default Footer;
