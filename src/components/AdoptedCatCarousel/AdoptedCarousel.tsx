import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../styles/swiper.css";


const images = [
  {
    src: "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/01-Cats.webp?w=1600&h=900",
    title: "Gato Curioso",
  },
  {
    src: "https://www.patasdacasa.com.br/sites/default/files/styles/article_detail_1200/public/2024-09/gato-preto.jpg.webp?itok=VI-YbRBa",
    title: "Gato Preto",
  },
  {
    src: "https://jpimg.com.br/uploads/2023/06/10-dicas-para-cuidar-de-um-gato-filhote.jpg",
    title: "Filhote Fofo",
  }
];

const maxSlides = 5;

export default function AdoptedCarousel() {
  return (
    <div className="flex justify-center items-center py-20 relative">
        <div className="absolute left-0 z-10">
            <button className="relative z-10 p-17 bg-gray-300 rounded-full hover:bg-gray-400 transition-all swiper-button-prev text-white"/>
        </div>
        <div className="flex justify-center items-center">
            <Swiper
                modules={[Navigation]}
                loop={true}
                spaceBetween={10}
                slidesPerView={1}
                centeredSlides={true}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                className="flex w-full max-w-md"
            >
                {images.slice(0, maxSlides).map((item, index) => (
                <SwiperSlide key={index} className="flex justify-center items-center">
                    <div
                    className={`dark:bg-gray-800 p-6 rounded-3xl transition-transform relative`}
                    >
                    <img
                        src={item.src}
                        alt={item.title}
                        className="flex max-w-full h-130 object-cover rounded-2xl justify-center items-center"
                    />

                    </div>
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
        <div>
            <button className="flex z-10 p-17 bg-emerald-300 rounded-full hover:bg-emerald-500 transition-all swiper-button-next"/>
        </div>

    </div>
  );
}