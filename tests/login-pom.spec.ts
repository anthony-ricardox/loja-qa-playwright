import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { test as authTest, expect as authExpect, USUARIOS } from '../fixtures/auth.fixture';

test.describe('LojaQA - Login (Page Object Model)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Cenário 1 (Caminho Feliz): cliente válido é redirecionado para o painel', async ({ page }) => {
    await loginPage.login(USUARIOS.cliente.email, USUARIOS.cliente.password);

    await expect(page).not.toHaveURL(/login\.html/);
    await expect(loginPage.error).toBeHidden();
  });

  test('Cenário 2 (Caminho Triste): senha incorreta exibe mensagem de erro', async ({ page }) => {
    await loginPage.login(USUARIOS.cliente.email, 'SenhaErrada!999');

    await expect(loginPage.error).toBeVisible();
    await expect(loginPage.error).not.toBeEmpty();
    await expect(page).toHaveURL(/login\.html/);
  });

  test('Cenário 3 (Regra de Negócio): botão Entrar inicia desabilitado', async () => {
    await expect(loginPage.submitButton).toBeDisabled();
  });
});

// Demonstração do uso da fixture customizada (base.extend) -> Requisito 3
authTest.describe('LojaQA - Login (com Fixtures)', () => {
  authTest('fixture clienteLogado entrega o cliente já autenticado fora da tela de login', async ({ page, clienteLogado }) => {
    await authExpect(page).not.toHaveURL(/login\.html/);
    await authExpect(clienteLogado.error).toBeHidden();
  });

  authTest('fixture loginPage entrega a tela de login pronta e com botão desabilitado', async ({ loginPage }) => {
    await authExpect(loginPage.email).toBeVisible();
    await authExpect(loginPage.submitButton).toBeDisabled();
  });
});
