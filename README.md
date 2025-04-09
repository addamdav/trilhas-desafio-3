# 📝 Formulário de Inscrição e Login Simples

## 1. O que é o projeto?

Este é um projeto simples que implementa um sistema básico de inscrição e login de usuários. Ele consiste em duas páginas principais:

1.  **Formulário de Inscrição:** Onde novos usuários podem cadastrar suas informações pessoais, de contato, áreas de interesse e criar um ID de usuário e senha.
2.  **Tela de Login:** Onde usuários já cadastrados podem entrar no sistema usando o ID de usuário e senha criados anteriormente.

O objetivo é demonstrar validação de formulários com JavaScript, armazenamento de dados simples no navegador (LocalStorage) e a criação de uma interface responsiva com HTML e CSS.

## 2. Como rodar localmente?

Como este projeto utiliza apenas tecnologias front-end (HTML, CSS, JavaScript), você não precisa de um servidor web complexo para executá-lo. Siga estes passos:

1.  **Baixe os arquivos:** Certifique-se de ter todos os arquivos do projeto:
    *   `index.html` (Formulário de Inscrição)
    *   `style.css` (Estilos para Inscrição)
    *   `script.js` (Lógica da Inscrição)
    *   `login.html` (Tela de Login)
    *   `login.css` (Estilos para Login)
    *   `login.js` (Lógica do Login)
2.  **Organize os arquivos:** Coloque **todos** esses arquivos na **mesma pasta** no seu computador.
3.  **Abra no Navegador:**
    *   Para acessar o formulário de inscrição, abra o arquivo `index.html` diretamente no seu navegador de internet preferido (Google Chrome, Firefox, Edge, etc.). Clique duas vezes no arquivo ou use a opção "Abrir com..." do seu sistema operacional.
    *   Para acessar a tela de login, abra o arquivo `login.html` da mesma forma. Você também pode navegar entre as telas usando os links "Faça Login" e "Inscreva-se" presentes nas páginas.

Pronto! Agora você pode interagir com o formulário, criar um usuário e tentar fazer o login.

## 3. Tecnologias Utilizadas

*   **HTML5:** Para a estrutura e conteúdo das páginas web.
*   **CSS3:** Para a estilização visual e layout responsivo das páginas.
*   **JavaScript:** Para a interatividade, validação dos campos do formulário, manipulação de eventos e interação com o armazenamento local.
*   **LocalStorage:** API do navegador utilizada para armazenar temporariamente (mas de forma persistente até ser limpo) os dados de ID de usuário e senha cadastrados.

## 4. Principais Funcionalidades

*   **Formulário de Inscrição:**
    *   Coleta de dados pessoais, contato e localização.
    *   Seleção de áreas de interesse (checkboxes).
    *   Criação de ID de usuário e senha.
*   **Validação de Campos (JavaScript):**
    *   Verifica se todos os campos obrigatórios (`required`) foram preenchidos.
    *   Valida o formato do e-mail.
    *   Verifica se a senha e a confirmação de senha são iguais.
    *   Verifica se a senha tem um comprimento mínimo.
    *   Impede o cadastro se um ID de usuário já existir.
    *   Exibe mensagens de erro claras abaixo dos campos inválidos.
*   **Armazenamento de Dados:**
    *   Salva o ID de usuário e a senha cadastrados no LocalStorage do navegador.
*   **Tela de Login:**
    *   Permite que o usuário insira seu ID e senha.
    *   Valida se os campos de login foram preenchidos.
*   **Autenticação:**
    *   Verifica se o ID de usuário e a senha informados no login correspondem a um usuário cadastrado no LocalStorage.
*   **Feedback ao Usuário:**
    *   Exibe alertas/mensagens informando sobre o sucesso da inscrição ou do login.
    *   Mostra mensagens de erro em caso de falha na validação ou autenticação.
*   **Responsividade:**
    *   O layout das páginas se adapta a diferentes tamanhos de tela (desktop, tablet, mobile).