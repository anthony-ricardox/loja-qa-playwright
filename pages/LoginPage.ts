import { Locator, Page } from '@playwright/test';

/**
 * Page Object da tela de Login da LojaQA.
 *
 * Regras:
 *  - Recebe a Page por injeção de dependência (construtor).
 *  - Encapsula TODOS os seletores; os testes nunca conhecem CSS.
 *  - Expõe ações (goto, login) e Locators para validação.
 *  - Não contém asserções: validar é responsabilidade do teste.
 */
export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly statusMessage: Locator;

  constructor(private page: Page) {
    this.emailInput = this.page.locator('#email');
    this.passwordInput = this.page.locator('#password');
    this.loginButton = this.page.locator('#loginBtn');
    this.errorMessage = this.page.locator('#errorMessage');
    this.statusMessage = this.page.locator('#statusMessage');
  }

  // ---------- Ações ----------

  async goto(): Promise<void> {
    await this.page.goto('/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // ---------- Locators expostos para validação nos testes ----------

  get email(): Locator {
    return this.emailInput;
  }

  get password(): Locator {
    return this.passwordInput;
  }

  get submitButton(): Locator {
    return this.loginButton;
  }

  get error(): Locator {
    return this.errorMessage;
  }

  get status(): Locator {
    return this.statusMessage;
  }
}
