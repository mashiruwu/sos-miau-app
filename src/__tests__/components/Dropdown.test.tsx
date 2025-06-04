import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '../../components/Dropdown/Dropdown';
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  
  function renderWithProviders(ui: React.ReactElement) {
    return render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </I18nextProvider>
    );
  }

  describe("Dropdown", () => {
    it('renderiza o botão do menu', () => {
      renderWithProviders(<Dropdown />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  
    it('exibe o menu ao clicar no botão', () => {
      renderWithProviders(<Dropdown />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
    });
  
    it('verifica se os links no menu estão corretos', () => {
      renderWithProviders(<Dropdown />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
  
      const homeLink = screen.getByText('Início');
      expect(homeLink).toBeInTheDocument();
      fireEvent.click(homeLink);
    });
  
    it('verifica se a transição de exibição do menu funciona', () => {
      renderWithProviders(<Dropdown />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
  
      const menu = screen.getByRole('menu');
      expect(menu).toHaveClass('transition');
    });
  });
  