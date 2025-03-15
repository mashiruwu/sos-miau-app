import CatAbout from "../assets/gato_about.png";
import CatAbout2 from "../assets/gato_about2.png";
import { useTranslation } from "react-i18next";

const About = () => {
    const { t } = useTranslation();

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
                        <h1 className="font-tiny text-3xl">
                            {t("about_page.about_us_title")}
                        </h1>
                        <p>{t("about_page.about_us_description")}</p>
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[800px]">
                        <h1 className="font-tiny text-3xl">
                            {t("about_page.our_mission_title")}
                        </h1>
                        <p>{t("about_page.our_mission_description")}</p>
                    </div>
                </div>
            </section>
            <h1 className="font-tiny text-primary text-4xl text-center mt-10">
                {t("about_page.what_do_we_do_title")}
            </h1>
            <section className="flex lg:flex-row flex-col justify-evenly my-10 items-center">
                <ul className="lg:w-[65%] w-full font-afacad text-xl flex flex-col gap-5 ">
                    <li>{t("about_page.what_do_we_do_content1")}</li>
                    <li>{t("about_page.what_do_we_do_content2")}</li>
                    <li>{t("about_page.what_do_we_do_content3")}</li>
                    <li>{t("about_page.what_do_we_do_content4")}</li>
                </ul>
                <img
                    src={CatAbout2}
                    alt=""
                    className="w-[350px] lg:mt-0 mt-5"
                />
            </section>
            <h1 className="font-tiny text-primary text-4xl text-center mt-10">
                {t("about_page.how_to_help_title")}
            </h1>
            <section className="my-10">
                <ul className="font-afacad text-xl text-center flex flex-col gap-2">
                    <li>{t("about_page.how_to_help_content1")}</li>
                    <li>{t("about_page.how_to_help_content2")}</li>
                    <li>{t("about_page.how_to_help_content3")}</li>
                    <li>{t("about_page.how_to_help_content4")}</li>
                </ul>
            </section>
            <section className="bg-primary w-full text-white rounded-md p-10 my-20 flex font-afacad text-xl">
                <p className="mx-auto">{t("about_page.join_our_mission")}</p>
            </section>
        </>
    );
};

export default About;
