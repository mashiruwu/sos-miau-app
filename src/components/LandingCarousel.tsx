import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/swiper-custom.css';

const images = [
  {src: "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/01-Cats.webp?w=1600&h=900", text1: "Sobre a ONG", text2: "Saiba mais sobre nós"},
  {src: "https://www.patasdacasa.com.br/sites/default/files/styles/article_detail_1200/public/2024-09/gato-preto.jpg.webp?itok=VI-YbRBa", text1: "Quero ajudar", text2: "Saiba como ajudar"},
  {src: "https://jpimg.com.br/uploads/2023/06/10-dicas-para-cuidar-de-um-gato-filhote.jpg", text1: "Adoção de Animais", text2: "Que tal um amigo peludinho para animar seus dias?"}
];

const maxSlides = 3;

function LandingCarousel() {
  return (
    <div className="w-full mx-auto p-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true}} 
        autoplay={{ delay: 5000, disableOnInteraction: false }} 
        loop={true} 
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-2xl shadow-lg"
      >
      {images.slice(0, maxSlides).map((item, index) => (
        <SwiperSlide key={index}>
          <img 
            src={item.src} 
            alt={`Gato ${index + 1}`} 
            className="w-full h-[500px] h-64 object-cover rounded-2xl" />
            <div className="absolute inset-0 bg-black opacity-70 rounded-2xl"></div> 
            <div className="absolute bottom-20 left-10 m-4 flex flex-col items-start justify-start">
              <p className="text-tiny5">{item.text1}</p>
              <p className="text-2">{item.text2}</p>
            </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
} 
  
export default LandingCarousel;