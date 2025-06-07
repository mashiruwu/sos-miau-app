import { useTranslation } from "react-i18next";
import LandingCarousel from "../components/LandingCarousel/LandingCarousel";
import { Slider } from "../components/Slider/Slider";
import { useEffect, useState } from "react";

const Home = () => {
    const { t } = useTranslation();

    const [avaliableCats, setAvaliableCats] = useState({ unratedCats: [] });
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        const submitForm = async () => {
            try {
                const API = import.meta.env.VITE_API_URL

                let id = sessionStorage.getItem("userId");
                if (!id) {
                    id = "ListarTodos"
                    setDisabled(true)
                }

                const response = await fetch(API + "/adopter/avaliableCats/" + id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    console.error("Failed to find Cats");
                    return;
                }
                const data = await response.json();

                console.log(data)
                setAvaliableCats(data)

            } catch (error) {
                console.error("Error submitting form:", error);
            }
        };

        submitForm();
    }, []);


    return (
        <>
            <LandingCarousel />
            <div className="py-20 px-4">
                <h1 className="font-tiny text-6xl text-center text-secondary">
                    {t("homepage.match")}
                </h1>
                <p className="font-afacad text-xl text-secondary text-center">
                    {
                        disabled ?
                            t("homepage.login_match_description")
                            :
                            t("homepage.match_description")
                    }
                </p>
                <Slider
                    data={avaliableCats.unratedCats}
                    disabled={disabled}
                    handleLike={async (id: string) => {
                        try {
                            const API = import.meta.env.VITE_API_URL
                            const response = await fetch(API + "/adopter/EvaluateCat", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    idAdopter: sessionStorage.getItem("userId"),
                                    idCat: id,
                                    like: "true"
                                })
                            });

                            if (!response.ok) {
                                console.error("Failed to find Cats");
                                return;
                            }

                        } catch (error) {
                            console.error("Error submitting form:", error);
                        }
                    }}
                    handleDislike={async (id: string) => {
                        try {
                            const API = import.meta.env.VITE_API_URL
                            const response = await fetch(API + "/adopter/EvaluateCat", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    idAdopter: sessionStorage.getItem("userId"),
                                    idCat: id,
                                    like: "false"
                                })
                            });

                            if (!response.ok) {
                                console.error("Failed to find Cats");
                                return;
                            }

                        } catch (error) {
                            console.error("Error submitting form:", error);
                        }
                    }}
                ></Slider>
            </div>
        </>
    );
};

export default Home;
