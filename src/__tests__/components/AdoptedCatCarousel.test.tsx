import { render, screen, fireEvent  } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AdoptedCarousel from "../../components/AdoptedCatCarousel/AdoptedCarousel";
import "@testing-library/jest-dom";

describe("AdoptedCarousel", () => {
  it("deve renderizar todas as imagens com seus títulos", () => {
    render(<AdoptedCarousel />);

    expect(screen.getByAltText("Gato Curioso")).toBeInTheDocument();
    expect(screen.getByAltText("Gato Preto")).toBeInTheDocument();
    expect(screen.getByAltText("Filhote Fofo")).toBeInTheDocument();
  });

  it("deve renderizar botões de navegação", () => {
    render(<AdoptedCarousel />);
  
    expect(screen.getByRole('button', { name: "Previous Slide" })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "Next Slide" })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Slide/ })).toHaveLength(2); 
  });
  
  it("deve reiniciar no primeiro slide após o último", () => {
    render(<AdoptedCarousel />);
  
    const nextButton = screen.getByRole('button', { name: "Next Slide" });
    
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    
    fireEvent.click(nextButton);
  
    expect(screen.getByAltText("Gato Curioso")).toBeInTheDocument();
  });  
});
