# Sistema de Login e Cadastro Full-Stack

Este é um projeto completo de uma aplicação web para autenticação de usuários, construído com uma arquitetura moderna e segura. Ele inclui funcionalidades de cadastro, login e recuperação de senha, utilizando um front-end interativo e um back-end serverless.

## 🚀 Acesso ao Projeto

Você pode acessar a aplicação em produção através do seguinte link:

**[Acessar a Aplicação](https://tela-de-login-two-sable.vercel.app/)**

---

## ✨ Funcionalidades Principais

-   **Autenticação Completa**: Fluxo de ponta a ponta para o gerenciamento de usuários.
-   **Cadastro de Usuários**: Novos usuários podem se registrar com e-mail e senha. O sistema valida o formato do e-mail e exige a confirmação da senha.
-   **Login Seguro**: Autenticação de credenciais com comunicação segura com o back-end.
-   **Recuperação de Senha**: Funcionalidade "Esqueci minha senha" que envia um e-mail com um link seguro para o usuário redefinir sua senha.
-   **Interface Moderna**: Formulários com rótulos flutuantes que melhoram a experiência do usuário.
-   **Funcionalidade "Lembrar-me"**: Salva o e-mail do usuário no navegador (`localStorage`) para preencher automaticamente o campo no próximo acesso.
-   **Redirecionamento Inteligente**: Caso um usuário tente fazer login com credenciais inexistentes, o sistema o convida a se cadastrar.

---

## 🛠️ Arquitetura e Tecnologias Utilizadas

O projeto foi desenvolvido seguindo as melhores práticas, separando o front-end do back-end e utilizando serviços escaláveis.

-   **Front-end**:
    -   `HTML5`, `CSS3` e `JavaScript` puro.
    -   **Comunicação com API**: Utiliza a `Fetch API` para fazer requisições `POST` assíncronas ao back-end.
    -   **Estrutura**: Código organizado com separação de responsabilidades (HTML para estrutura, CSS para estilo e JS para lógica).

-   **Back-end (Serverless)**:
    -   **Hospedagem e Funções**: Vercel para o deploy e para a execução de funções serverless.
    -   **Endpoints de API**: A pasta `/api` contém as funções Node.js que atuam como nosso back-end:
        -   `api/register.js`: Endpoint para registrar novos usuários.
        -   `api/login.js`: Endpoint para autenticar usuários existentes.
        -   `api/esqueci-senha.js`: Endpoint para iniciar o processo de recuperação de senha.
        -   `api/resetar-senha.js`: Endpoint para definir uma nova senha a partir do token de recuperação.

-   **Banco de Dados e Autenticação**:
    -   **Plataforma**: Supabase como nosso BaaS (Backend as a Service).
    -   **Funcionalidades**:
        -   Gerencia o banco de dados de usuários.
        -   Oferece autenticação segura, incluindo a criptografia automática de senhas.
        -   Serviço de envio de e-mails para confirmação de cadastro e recuperação de senha.

---

## 🚀 Como Executar o Projeto Localmente

Para rodar esta aplicação em seu ambiente de desenvolvimento, você precisará ter o Node.js e a Vercel CLI instalados.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2.  **Instale a Vercel CLI:**
    ```bash
    npm i -g vercel
    ```

3.  **Crie o arquivo de variáveis de ambiente:**
    Na raiz do projeto, crie um arquivo chamado `.env` e adicione suas credenciais do Supabase. Você pode encontrá-las no painel do seu projeto em `Settings > API`.

    ```env
    # Arquivo .env
    SUPABASE_URL="https://bcigiymerelioipvmyrh.supabase.co"
    SUPABASE_ANON_KEY="SUA_SUPABASE_ANON_KEY"
    SUPABASE_KEY="SUA_SUPABASE_SERVICE_ROLE_KEY"
    ```
    > **Importante**: A `SUPABASE_KEY` é a chave `service_role`, que é secreta e usada apenas no back-end para operações de administrador, como a redefinição de senhas.

4.  **Inicie o servidor de desenvolvimento:**
    Execute o seguinte comando na raiz do projeto:
    ```bash
    vercel dev
    ```
    Este comando irá iniciar um servidor local que executa tanto o front-end quanto as funções serverless da pasta `/api`, simulando o ambiente de produção da Vercel.

5.  **Acesse a aplicação:**
    Abra seu navegador e acesse o endereço fornecido pelo `vercel dev` (geralmente `http://localhost:3000`).

---

## 🔒 Segurança

-   **Variáveis de Ambiente**: Todas as chaves e credenciais sensíveis são armazenadas em um arquivo `.env` e não são versionadas no Git, graças ao arquivo `.gitignore`.
-   **Criptografia de Senhas**: O Supabase gerencia automaticamente a criptografia das senhas, garantindo que elas nunca sejam armazenadas em texto plano.
-   **Prevenção de Enumeração de E-mail**: A API de recuperação de senha sempre retorna uma mensagem de sucesso genérica para evitar que um invasor descubra quais e-mails estão cadastrados no sistema.
