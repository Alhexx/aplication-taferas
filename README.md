# Sistema de Gerenciamento de Tarefas

Este é um aplicativo de sistema de gerenciamento de tarefas desenvolvido com Spring Boot e Next.js.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- Java Development Kit (JDK) versão 8 ou superior

- Node.js e npm (Node Package Manager)

- Clone o repositório:

```bash
git clone https://github.com/Alhexx/aplication-taferas.git
```

## Configuração do Backend (Spring Boot)

### Comandos para a execução:

1. Execute o Docker compose para ter um container do postgres já configurado para a aplicação:

```bash
docker compose up -d
```

2. Navegue até a pasta do Backend

```bash
cd .\backend\
```

3. apos isso execute o seguinte comando:

```bash
mvn spring-boot:run
```

### Apos a inicialização do serviço:

- Abra no seu browser [http://localhost:8083/api/swagger-ui/index.html#/](http://localhost:8083/api/swagger-ui/index.html#/) para ter acesso a documentação e usabilidade das rotas existentes no backend.

## Configuração do FrontEnd (Next.js)

### Comandos para a execução:

1. Instale as depencias

```bash
npm i
# ou
yarn i
```

2. Execute a aplicação

```bash
npm run dev
# ou
yarn dev
```

### Apos a inicialização da aplicação

- Abra no seu browser [http://localhost:3000](http://localhost:3000) para ter acesso a aplicação.

## Uso da Aplicação

### Tela inicial da aplicação

- nela o usuário tem tanto a opção de login quanto de se registrar no sistema.
  ![Tela Inicial](./public/tela-inicial.png)

### Tela de registro de usuários na aplicação

- nela o usuário preenche com nome, email, senha, confirmação da senha e clica no botão <kbd>Registrar-se</kbd>. Qualquer erro ou sucesso que venha ocorrer é mostrado ao usuário através de toasts
  ![Tela de Registro](./public/tela-register.png)

### Tela de login de usuários na aplicação

- nela o usuário preenche com email, senha e clica no botão <kbd>Entrar</kbd>. Qualquer erro que venha ocorrer é mostrado ao usuário através de toasts
  ![Tela de Registro](./public/tela-login.png)

### Tela de Gerenciamento de Tarefas

- para visualizar essa tela o usuario tem que estar efetivamente logado, caso contrário ele não consiguirá acessar-la. (WORK IN PROGRESS)
  ![Tela de Tarefas](./public/tela-tarefas.png)
