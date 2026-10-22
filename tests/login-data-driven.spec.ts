import { test, expect } from '../fixtures/auth.fixture';
import { USUARIOS } from '../fixtures/auth.fixture';

interface CenarioLogin {
  nome: string;
  email: string;
  senha: string;
  sucesso: boolean;
}

const cenarios: CenarioLogin[] = [
  { nome: 'cliente válido',            email: USUARIOS.cliente.email,   senha: USUARIOS.cliente.password,   sucesso: true  },
  { nome: 'admin válido',              email: USUARIOS.admin.email,     senha: USUARIOS.admin.password,     sucesso: true  },
  { nome: 'lojista válido',            email: USUARIOS.lojista.email,   senha: USUARIOS.lojista.password,   sucesso: true  },
  { nome: 'senha incorreta',           email: USUARIOS.cliente.email,   senha: 'SenhaErrada!999',           sucesso: false },
  { nome: 'usuário bloqueado',         email: USUARIOS.bloqueado.email, senha: USUARIOS.bloqueado.password, sucesso: false },
];

test.describe('LojaQA - Login (Data-Driven)', () => {
  for (const cenario of cenarios) {
    test(`login: ${cenario.nome}`, async ({ page, loginPage }) => {
      await loginPage.login(cenario.email, cenario.senha);

      if (cenario.sucesso) {
        await expect(page).not.toHaveURL(/login\.html/);
        await expect(loginPage.error).toBeHidden();
      } else {
        await expect(loginPage.error).toBeVisible();
        await expect(page).toHaveURL(/login\.html/);
      }
    });
  }
});
