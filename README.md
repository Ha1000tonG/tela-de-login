# Tela de Login com Cadastro e Recuperação de Senha

Projeto web de autenticação com interface em HTML, CSS e JavaScript puro, integrado ao Supabase para cadastro, login e recuperação de senha. A aplicação utiliza páginas estáticas no front-end e funções serverless da Vercel no back-end para processar autenticação e envio do fluxo de redefinição de senha.

## 🚀 Acesso ao projeto

- Produção: https://tela-de-login-two-sable.vercel.app/

## ✨ Funcionalidades

- Login com validação básica de e-mail no front-end.
- Cadastro de usuários com confirmação de senha e validação de tamanho mínimo.
- Recuperação de senha por e-mail.
- Redefinição de senha via Supabase após o clique no link enviado por e-mail.
- Opção **"Lembrar-me"** com persistência do e-mail em `localStorage`.
- Interface reutilizada entre as páginas com o mesmo CSS base.

## 🧱 Estrutura atual do projeto

```
.
├── api/
│   ├── esqueci-senha.js
│   ├── login.js
│   └── register.js
├── src/
│   ├── css/
│   │   └── estilo.css
│   ├── imagens/
│   │   ├── background3.jpg
│   │   ├── background5.jpg
│   │   └── background6.jpg
│   └── js/
│       ├── esqueci-senha.js
│       ├── registrar.js
│       ├── resetar-senha.js
│       └── script.js
├── esqueci-senha.html
├── home.html
├── index.html
├── registrar.html
├── resetar-senha.html
├── package.json
└── README.md
```

## 🖥️ Páginas do front-end

- `index.html`: tela principal de login.
- `registrar.html`: tela de criação de conta.
- `esqueci-senha.html`: tela para solicitar o envio do link de recuperação.
- `resetar-senha.html`: tela usada após o redirecionamento do e-mail para definir uma nova senha.
- `home.html`: página de destino após login bem-sucedido.

## ⚙️ Scripts do front-end

Todos os scripts de interface ficam em `src/js/`:

- `script.js`: controla a página de login, o botão de mostrar senha e o recurso de lembrar e-mail.
- `registrar.js`: faz as validações de cadastro e envia a requisição para `/api/register`.
- `esqueci-senha.js`: envia a solicitação de recuperação para `/api/esqueci-senha`.
- `resetar-senha.js`: usa o cliente do Supabase no navegador para atualizar a senha do usuário autenticado pelo link de recuperação.

## ☁️ Endpoints serverless

As funções da pasta `api/` são executadas pela Vercel:

- `api/login.js`: autentica o usuário com `signInWithPassword`.
- `api/register.js`: cria a conta com `signUp`.
- `api/esqueci-senha.js`: dispara o e-mail de recuperação com `resetPasswordForEmail`.

> Observação: atualmente não existe um arquivo `api/resetar-senha.js`. A redefinição final da senha acontece no front-end, em `src/js/resetar-senha.js`, usando o cliente do Supabase carregado no navegador.

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript puro
- Supabase
- Vercel Functions
- Bootstrap Icons

## 📦 Dependências

Instalada via `package.json`:

- `@supabase/supabase-js`

## 🔐 Variáveis de ambiente

Para executar as funções serverless localmente, crie um arquivo `.env` na raiz do projeto com:

```env
SUPABASE_URL="https://SEU-PROJETO.supabase.co"
SUPABASE_ANON_KEY="SUA_CHAVE_ANON"
```

As rotas em `api/` usam essas variáveis para inicializar o cliente do Supabase no servidor.

## ▶️ Como executar localmente

### 1. Instale as dependências

```bash
npm install
```

### 2. Instale a Vercel CLI, se necessário

```bash
npm install -g vercel
```

### 3. Configure o ambiente

Crie o arquivo `.env` com as variáveis mostradas acima.

### 4. Inicie o projeto

```bash
vercel dev
```

A aplicação costuma ficar disponível em `http://localhost:3000` durante o desenvolvimento.

## 🔄 Fluxo de autenticação

1. O usuário acessa `index.html` e envia e-mail e senha.
2. O front-end chama `/api/login`.
3. No cadastro, `registrar.html` envia os dados para `/api/register`.
4. Na recuperação, `esqueci-senha.html` chama `/api/esqueci-senha`.
5. O e-mail de recuperação redireciona o usuário para `resetar-senha.html`.
6. A página `resetar-senha.html` executa `src/js/resetar-senha.js` para atualizar a senha no Supabase.

## 🔒 Observações importantes

- O recurso de recuperar senha retorna mensagem genérica por segurança, evitando enumeração de e-mails.
- O projeto depende do Supabase configurado corretamente para autenticação por e-mail.
- O arquivo `src/js/resetar-senha.js` usa a biblioteca do Supabase via CDN no navegador.

## 📄 Licença

Este projeto está licenciado sob os termos definidos no arquivo `LICENSE`.
