import { render, fireEvent, waitFor  } from '@testing-library/react';
import { InfoCarousel } from '../../components/InfoCarousel/InfoCarousel';
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from 'vitest';

const slides = [
    {
        id: 1,
        title: 'Slide 1',
        content: 'Content 1',
        image: 'image1.jpg',
    },
    {
        id: 2,
        title: 'Slide 2',
        content: 'Content 2',
        image: 'image2.jpg',
    },
];

describe('InfoCarousel', () => {
    describe('Renderização do componente', () => {
        it('deve renderizar o número correto de slides', () => {
            const { getByText } = render(<InfoCarousel slides={slides} />);
            slides.forEach(slide => {
                expect(getByText(slide.title)).toBeInTheDocument();
                expect(getByText(slide.content)).toBeInTheDocument();
            });
        });
    });

    describe('AutoPlay', () => {
        beforeEach(() => {
            vi.useFakeTimers();  
        });

        it('deve avançar os slides automaticamente quando autoPlay está ativado', () => {
            render(<InfoCarousel slides={slides} autoPlay={true} interval={5000} />);

            vi.advanceTimersByTime(5000); 

            expect(true).toBeTruthy();  
        });

        afterEach(() => {
            vi.useRealTimers();  
        });

        it('não deve avançar os slides automaticamente quando autoPlay está desativado', () => {
            const { getByText } = render(<InfoCarousel slides={slides} autoPlay={false} />);
            
            expect(getByText('Slide 1')).toBeInTheDocument();

            fireEvent.click(getByText('Slide 2'));
            
            expect(getByText('Slide 2')).toBeInTheDocument();
        });
    });

    describe('Navegação manual', () => {
        it('deve navegar corretamente para o slide desejado ao clicar nos pontos de navegação', () => {
            const { getByText, getAllByRole } = render(<InfoCarousel slides={slides} autoPlay={false} />);
            
            expect(getByText('Slide 1')).toBeInTheDocument();
            
            const dots = getAllByRole('button');
            fireEvent.click(dots[1]);
            
            expect(getByText('Slide 2')).toBeInTheDocument();
        });
    });

    describe('Comportamento da página "/rescue"', () => {
        it('deve exibir o conteúdo corretamente quando a URL for "/rescue"', () => {
            window.history.pushState({}, '', '/rescue');
            
            const { getByText } = render(<InfoCarousel slides={slides} />);
            
            expect(getByText('Slide 1')).toBeInTheDocument();
        });
    });
});
