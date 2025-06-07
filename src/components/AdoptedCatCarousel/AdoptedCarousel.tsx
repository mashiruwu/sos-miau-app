import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  },
];

export default function AdoptedCarousel() {
  return (
    <div className="relative w-full py-16 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Container central */}
      <div className="max-w-5xl mx-auto px-4 relative">
        {/* Swiper */}
        <Swiper
        modules={[Navigation]}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="rounded-2xl overflow-hidden"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative group">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-64 md:h-[28rem] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Título com gradiente escuro no rodapé */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
                <h3 className="text-white text-2xl font-semibold drop-shadow-md">
                  {item.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botão anterior */}
      <button
        className="swiper-button-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition"
        aria-label="Anterior"
      >
        <ChevronLeft className="" />
      </button>
      {/* Botão próximo */}
      <button
        className="swiper-button-next absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition"
        aria-label="Próximo"
      >
        <ChevronRight className="" />
      </button>
      </div>
    </div>
  );
}
