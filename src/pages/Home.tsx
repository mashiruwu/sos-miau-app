import { useTranslation } from "react-i18next";
import LandingCarousel from "../components/LandingCarousel/LandingCarousel";
import { Slider } from "../components/Slider/Slider";
import { useEffect, useState } from "react";

const Home = () => {
    const { t } = useTranslation();

    const [avaliableCats, setAvaliableCats] = useState({unratedCats: []});

    useEffect(() => {
        const submitForm = async () => {
          try {
            const response = await fetch("http://localhost:3000/adopter/avaliableCats/" + sessionStorage.getItem("userId"), {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            if (!response.ok) {
              console.error("Failed to find Cats");
              alert("Unable to Find Avaliable Cats")
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
                <h1 className="font-tiny text-6xl text-center text-primary">
                    {t("homepage.match")}
                </h1>
                <p className="font-afacad text-xl text-primary text-center">
                    {t("homepage.match_description")}
                </p>
                <Slider 
                    data={avaliableCats.unratedCats}
                    handleLike={async (id: string)=> {
                        try {
                            const response = await fetch("http://localhost:3000/adopter/EvaluateCat", {
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
                              alert("Unable to Evaluate Cats")
                              return;
                            }
                
                          } catch (error) {
                            console.error("Error submitting form:", error);
                          }
                    }}
                    handleDislike={async (id: string)=> {
                        try {
                            const response = await fetch("http://localhost:3000/adopter/EvaluateCat", {
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
                              alert("Unable to Evaluate Cats")
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
