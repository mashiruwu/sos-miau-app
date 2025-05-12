import { useState } from "react";
import { useParams } from "react-router-dom";
import catIcon from "../../../assets/cat_icon_registered.png";
import AdoptedCarousel from "../../AdoptedCatCarousel/AdoptedCarousel";

export const UserLikedCats = () => {
    const { id } = useParams(); // ID do usuário vindo da URL
    const [user, setUser] = useState<any>(null);
    const [likedCat, setLikedCat] = useState<any>(null);

    return (
        <div className="font-afacad text-primary-hover">
            <div className="flex items-center gap-6">
                <img src={catIcon} alt="" className="rounded-full w-30 h-30" />
                <div className="flex flex-col ">
                    <h1 className="text-3xl">Adopter name</h1>
                    <h2 className="text-xl">adopter@gmail.com</h2>
                </div>
            </div>
            <hr className="border border-gray-300 mt-5" />
            <div>
                <h1 className="text-center text-primary-hover font-tiny text-5xl mt-6">
                    Likes
                </h1>
                <AdoptedCarousel />
            </div>
        </div>
    );
};
