import { render, screen, fireEvent  } from "@testing-library/react";
import CatCard from "../../components/CatCard/CatCard";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import "@testing-library/jest-dom";

describe("AdoptedCarousel", () => {
  it("exibe o botão de interesse corretamente", () => {
    render(<CatCard />);
    const button = screen.getByRole("button", {
      name: /Tenho Interesse/i, 
    });
    expect(button).toBeInTheDocument();
  });

  it("abre o modal ao clicar no botão de interesse", () => {
    render(<CatCard />);
    
    const button = screen.getByRole("button", { name: /Tenho Interesse/i });
    fireEvent.click(button);
    
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
  });

  it("fecha o modal ao clicar no botão de fechar", () => {
    render(<CatCard />);
    
    const button = screen.getByRole("button", { name: /Tenho Interesse/i });
    fireEvent.click(button);

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    
    const closeButton = screen.getByRole("button", { name: /✖/ });
    fireEvent.click(closeButton);

    expect(modal).not.toBeInTheDocument();
  });

  it("altera o estado de adotado e exibe mensagem de agradecimento", () => {
    render(<CatCard />);
    
    const interestButton = screen.getByRole("button", { name: /Tenho Interesse/i });
    fireEvent.click(interestButton);
    
    const adoptButton = screen.getByRole("button", { name: /Adotar/i }); 
    fireEvent.click(adoptButton);
    
    const thanksTitle = screen.getByRole('heading', { name: /Obrigada/i });
    expect(thanksTitle).toBeInTheDocument();
  });

  it("testa a tradução do botão de interesse", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CatCard />
      </I18nextProvider>
    );
    
    const button = screen.getByRole("button", { name: /Tenho Interesse/i });
    expect(button).toBeInTheDocument();
  });

  it("carrega a imagem do gato corretamente", () => {
    render(<CatCard />);
    
    const image = screen.getByAltText("Gato para Adoção");
    expect(image).toBeInTheDocument();
  });
});