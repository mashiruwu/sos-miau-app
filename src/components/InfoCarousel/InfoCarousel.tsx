"use client";

import { useState, useEffect, useRef } from "react";

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

export function InfoCarousel({
    slides,
    autoPlay = true,
    interval = 5000,
}: InfoCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideHeight, setSlideHeight] = useState<number | null>(null);
    const slideRef = useRef<HTMLDivElement>(null);

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

    // Corrige a altura após o slide atual ser renderizado
    useEffect(() => {
        const updateHeight = () => {
            if (slideRef.current) {
                setSlideHeight(slideRef.current.offsetHeight);
            }
        };

        const raf = requestAnimationFrame(updateHeight);
        return () => cancelAnimationFrame(raf);
    }, [currentSlide]);

    return (
        <div className="relative w-full max-w-4xl mx-auto flex flex-col font-afacad text-lg">
            <div
                className="relative transition-all duration-500"
                style={{ height: slideHeight ?? "auto" }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        ref={currentSlide === index ? slideRef : null}
                        className={`absolute top-0 left-0 w-full transition-all duration-500 transform text-center ${
                            currentSlide === index
                                ? "opacity-100 translate-x-0 z-10"
                                : index < currentSlide
                                ? "opacity-0 -translate-x-full z-0"
                                : "opacity-0 translate-x-full z-0"
                        }`}
                    >
                        <h1 className="lg:text-5xl text-3xl text-primary mb-8 uppercase font-tiny text-center">
                            {slide.title}
                        </h1>

                        <div className="flex lg:flex-row flex-col items-start justify-between mt-8 gap-6 px-4">
                            <div className="flex lg:flex-col flex-col-reverse items-center gap-2">
                                <img
                                    src={slide.image}
                                    className="w-full max-w-[200px] lg:max-w-[300px]"
                                    alt={slide.alt || ""}
                                />
                                <p>{slide.alt}</p>
                            </div>

                            <div className="lg:w-[500px] w-full text-left text-primary">
                                <p>{slide.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots Navigation */}
            <div className="flex items-center justify-center mx-auto gap-2 mt-6">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentSlide === index
                                ? "bg-primary scale-125"
                                : "bg-primary/40 hover:bg-primary/60"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
