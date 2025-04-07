"use client";

import { useState, useEffect } from "react";

interface InfoSlide {
    id: number;
    title: string;
    description?: string;
    content: string | React.ReactNode;
    image: string;
    alt?: string;
}

interface InfoCarouselProps {
    slides: InfoSlide[];
    autoPlay?: boolean;
    interval?: number;
}

export function InfoCarouselRescue({
    slides,
    autoPlay = true,
    interval = 5000,
}: InfoCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        if (!autoPlay) return;

        const slideInterval = setInterval(nextSlide, interval);
        return () => clearInterval(slideInterval);
    }, [autoPlay, interval]);

    return (
        <div className="relative w-full max-w-6xl mx-auto px-4 py-12 font-afacad text-lg">
            <h1 className="text-center text-3xl lg:text-4xl font-bold font-mono tracking-wider text-primary mb-10">
                RESGATES
            </h1>

            <div className="relative">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
                            currentSlide === index
                                ? "opacity-100 translate-x-0 z-10"
                                : "opacity-0 scale-95 z-0"
                        }`}
                    >
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white rounded-xl p-6 shadow-md">
                            <img
                                src={slide.image}
                                alt={slide.alt}
                                className="w-[300px] h-[300px] object-cover rounded-lg"
                            />
                            <div className="flex-1 text-left space-y-2">
                                <h2 className="text-2xl lg:text-3xl font-bold uppercase font-mono text-primary">
                                    {slide.title}
                                </h2>
                                {slide.description && (
                                    <p className="text-sm text-gray-500 mb-2">
                                        {slide.description}
                                    </p>
                                )}
                                <div className="text-base leading-relaxed text-gray-800">
                                    {slide.content}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navegação (bolinhas) */}
            <div className="flex items-center justify-center mt-8 gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentSlide === index
                                ? "bg-primary scale-125"
                                : "bg-primary/30 hover:bg-primary/60"
                        }`}
                        aria-label={`Ir para slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
