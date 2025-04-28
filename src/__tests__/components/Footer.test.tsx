import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer/Footer';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router-dom';
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>{ui}</BrowserRouter>
    </I18nextProvider>
  );
}

describe('Footer', () => {
  beforeEach(() => {
    global.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));
  });

  it('renderiza o footer completo em tela grande', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('SOS MIAU')).toBeInTheDocument();
    expect(screen.getByText(i18n.t('footer.description'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('footer.help_us'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('footer.about_us'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('footer.want_adopt'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('footer.help'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('footer.rescue'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('footer.adopted_cats'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('footer.transparency'))).toBeInTheDocument();
  });

  it('renderiza os ícones de redes sociais em tela grande', () => {
    renderWithProviders(<Footer />);
    expect(document.querySelectorAll('svg').length).toBeGreaterThanOrEqual(3);
  });
  
  it('renderiza o LanguageSwitcher', () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <LanguageSwitcher />
        </I18nextProvider>
      </MemoryRouter>
    );
  
    const englishButton = screen.getByRole('button', { name: /english/i });
    const portugueseButton = screen.getByRole('button', { name: /portuguese/i });
  
    expect(englishButton).toBeInTheDocument();
    expect(portugueseButton).toBeInTheDocument();
  });

  it('renderiza o footer mobile corretamente em telas pequenas', () => {
    global.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
  
    renderWithProviders(<Footer />);
  
    expect(screen.getByText('SOS Miau')).toBeInTheDocument();
    
    expect(document.querySelectorAll('svg').length).toBeGreaterThanOrEqual(3);
  
    expect(screen.getByRole('button', { name: /english/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /portuguese/i })).toBeInTheDocument();
  });
  
  it('muda o layout do footer ao redimensionar a tela', async () => {
    renderWithProviders(<Footer />);

    expect(screen.queryByText('SOS MIAU')).toBeInTheDocument();

    global.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));

    expect(await screen.findByText('SOS Miau')).toBeInTheDocument();
  });
});
