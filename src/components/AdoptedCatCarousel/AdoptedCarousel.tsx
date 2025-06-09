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
    <div className="w-full py-16 bg-white dark:bg-gray-900">
      {/* Container Flex para alinhar os botões e o carrossel lado a lado.
        'items-center' garante o alinhamento vertical.
      */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4">
        
        {/* Botão Anterior*/}
        <button
          className="image-swiper-button-prev hidden md:flex items-center justify-center bg-black/60 hover:bg-black/80 text-white rounded-full w-14 h-14 transition disabled:opacity-50"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Wrapper do Swiper */}
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
            {images.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative group">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-64 md:h-[28rem] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
                    <h3 className="text-white text-2xl font-semibold drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Botão Próximo*/}
        <button
          className="image-swiper-button-next hidden md:flex items-center justify-center bg-black/60 hover:bg-black/80 text-white rounded-full w-14 h-14 transition disabled:opacity-50"
          aria-label="Próximo"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}