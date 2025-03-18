import { InfoCarousel } from "../components/InfoCarousel/InfoCarousel";
import Divulgue from "../assets/divulgue.png";
import QrCode from "../assets/qrcode.png";
import PadrinhoMadrinhaImg from "../assets/padrinho_madrinha.png";
import AdoteImg from "../assets/adoteImg.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HelpPage = () => {
    const { t } = useTranslation();

    const infoSlides = [
        {
            id: 1,
            title: `${t("want_help.make_donation.title")}`,
            image: QrCode,
            alt: `${t("want_help.make_donation.alt")}`,
            content: (
                <>
                    <p>{t("want_help.make_donation.content._1")}</p>
                    <p>{t("want_help.make_donation.content._2")}</p>
                    <p>{t("want_help.make_donation.content._3")}</p>
                    <p>{t("want_help.make_donation.content._4")}</p>
                    <p>{t("want_help.make_donation.donation_details.title")}</p>
                    <p>{t("want_help.make_donation.donation_details.pix")}</p>
                    <p>
                        {t(
                            "want_help.make_donation.donation_details.bank_account"
                        )}
                    </p>
                    <p>
                        {t(
                            "want_help.make_donation.donation_details.contact_us"
                        )}
                    </p>
                </>
            ),
        },
        {
            id: 2,
            title: `${t("want_help.share_our_work.title")}`,
            image: Divulgue,
            content: (
                <>
                    <p>{t("want_help.share_our_work.content._1")}</p>
                    <p>{t("want_help.share_our_work.content._2")}</p>
                    <p>
                        {t("want_help.share_our_work.social_media.instagram")}
                    </p>
                    <p>{t("want_help.share_our_work.social_media.facebook")}</p>
                    <p>{t("want_help.share_our_work.social_media.whatsapp")}</p>
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

    return (
        <>
            <section className="mb-30 flex flex-col gap-10">
                <img
                    src="https://jpimg.com.br/uploads/2023/06/10-dicas-para-cuidar-de-um-gato-filhote.jpg"
                    className="w-full h-[500px] object-cover"
                />
                <InfoCarousel slides={infoSlides} />
            </section>
        </>
    );
};

export default HelpPage;
