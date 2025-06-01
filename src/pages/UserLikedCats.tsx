import { useEffect, useState } from "react";
import catIcon from "../assets/cat_icon_registered.png";
import { useAuth } from "../context/AuthProvider";
import CatCard from "../components/CatCard/CatCard";
import ClipLoader from "react-spinners/ClipLoader";

export const UserLikedCats = () => {
    const { user } = useAuth();
    const [likedCatIds, setLikedCatIds] = useState([]);
    const [catDetails, setCatDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLikedCats = async () => {
            try {
                const userId = sessionStorage.getItem("userId");
                const res = await fetch(
                    `http://localhost:3000/adopter/${userId}`
                );
                const data = await res.json();
                setLikedCatIds(data.likes || []);
            } catch (error) {
                console.error("Erro ao buscar likes:", error);
            }
        };

        fetchLikedCats();
    }, []);

    useEffect(() => {
        const fetchCatDetails = async () => {
            try {
                const promises = likedCatIds.map((id) =>
                    fetch(`http://localhost:3000/cat/${id}`).then((res) =>
                        res.json()
                    )
                );
                const cats = await Promise.all(promises);
                setCatDetails(cats);
            } catch (error) {
                console.error("Erro ao carregar detalhes dos gatos:", error);
            } finally {
                setLoading(false);
            }
        };

        if (likedCatIds.length > 0) {
            fetchCatDetails();
        } else {
            setLoading(false);
        }
    }, [likedCatIds]);

    return (
        <div className="font-afacad text-primary-hover">
            <div className="flex items-center gap-6">
                <img src={catIcon} alt="" className="rounded-full w-30 h-30" />
                <div className="flex flex-col">
                    <h1 className="text-3xl">{user?.name || "Adopter name"}</h1>
                    <h2 className="text-xl">
                        {user?.email || "adopter@gmail.com"}
                    </h2>
                </div>
            </div>

            <hr className="border border-gray-300 mt-5" />
            <div>
                <h1 className="text-center text-primary-hover font-tiny text-5xl mt-6">
                    Likes
                </h1>
                {loading ? (
                    <div className="flex justify-center mt-10">
                        <ClipLoader color="#4F46E5" size={50} />
                    </div>
                ) : catDetails.length > 0 ? (
                    <div className="flex flex-wrap ">
                        {catDetails.map((cat) => (
                            <CatCard key={cat.id} cat={cat} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center mt-4">Nenhum gato curtido.</p>
                )}
            </div>
        </div>
    );
};
