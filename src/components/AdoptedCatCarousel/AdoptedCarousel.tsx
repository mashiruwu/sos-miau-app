import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AdoptedCarousel({ cats = [], loading = false }) {
    if (loading) {
        return <div className="text-center py-10">Carregando...</div>;
    }
    if (!cats.length) {
        return <div className="text-center font-bold  py-10">Nenhum gatinho adotado encontrado.</div>;
    }
    return (
        <div className="w-full py-16 ">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4">
                <button
                    className="image-swiper-button-prev hidden md:flex items-center justify-center bg-black/60 hover:bg-black/80 text-white rounded-full p-2 cursor-pointer transition disabled:opacity-50"
                    aria-label="Anterior"
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="w-full max-w-5xl">
                    <Swiper
                        modules={[Navigation]}
                        loop={true}
                        spaceBetween={30}
                        slidesPerView={1}
                        centeredSlides
                        navigation={{
                            nextEl: ".image-swiper-button-next",
                            prevEl: ".image-swiper-button-prev",
                        }}
                        className="rounded-2xl"
                    >
                        {cats.map((cat, index) => (
                            <SwiperSlide key={cat.id || index}>
                                <div className="relative group">
                                    <img
                                        src={cat.photo_url}
                                        alt={cat.name}
                                        className="w-full h-64 md:h-[28rem] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
                                        <h3 className="text-white text-2xl font-semibold drop-shadow-md">
                                            {cat.name}
                                        </h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <button
                    className="image-swiper-button-next hidden md:flex items-center justify-center bg-black/60 hover:bg-black/80 text-white rounded-full p-2 cursor-pointer transition disabled:opacity-50"
                    aria-label="Próximo"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}