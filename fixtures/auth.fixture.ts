import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/** Massa de dados oficial da LojaQA (exibida na própria tela de login). */
export const USUARIOS = {
  admin: { email: 'admin@system.com', password: 'AdminPassword123' },
  cliente: { email: 'user@system.com', password: 'UserPassword123' },
  lojista: { email: 'lojista@system.com', password: 'SellerPass123' },
  bloqueado: { email: 'blocked@system.com', password: 'Blocked123' },
} as const;

type AuthFixtures = {
  /** LoginPage já instanciada e com a tela de login aberta. */
  loginPage: LoginPage;
  /** LoginPage de um cliente já autenticado (após o login, a página está no painel). */
  clienteLogado: LoginPage;
};

export const test = base.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  clienteLogado: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USUARIOS.cliente.email, USUARIOS.cliente.password);
    // Garante que saímos da tela de login antes de entregar a fixture ao teste.
    await page.waitForURL((url) => !url.pathname.endsWith('login.html'));
    await use(loginPage);
  },
});

export { expect };
