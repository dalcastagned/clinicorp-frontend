# Frontend para Gerenciamento de Tarefas

Este é o frontend para a aplicação de gerenciamento de tarefas. Ele interage com o [Servidor de Gerenciamento de Tarefas](https://github.com/dalcastagned/clinicorp-backend) (o backend correspondente) para permitir que os usuários visualizem, adicionem e gerenciem suas tarefas. A aplicação é construída com React, Vite, Material UI e utiliza Formik para gerenciamento de formulários.

## Funcionalidades

- **Visualização de Tarefas**: Lista as tarefas obtidas do backend, exibindo descrição, responsável, status e computador de origem.
- **Adição de Tarefas**: Permite adicionar uma ou mais tarefas em lote através de um modal, com validação de campos.
- **Feedback ao Usuário**: Exibe estados de carregamento ao buscar ou enviar dados e notificações de sucesso ou erro (usando `react-hot-toast`).
- **Customização de Tema**:
  - Suporte a modo Claro (Light) e Escuro (Dark).
  - Seleção de cor primária para o tema da aplicação.
- **Roteamento**:
  - Página principal para listagem e adição de tarefas.
  - Página "Não Encontrado" para rotas inválidas.
- **Layout Responsivo**: Interface adaptável a diferentes tamanhos de tela.

## Tecnologias Utilizadas

- **Core**: React 19, Vite, JavaScript
- **UI & Styling**:
  - Material UI (`@mui/material`)
  - Emotion (`@emotion/react`, `@emotion/styled`)
  - Fontsource Roboto (`@fontsource/roboto`)
- **Roteamento**: React Router DOM (`react-router-dom`)
- **Gerenciamento de Formulários e Validação**:
  - Formik
  - Yup
- **Comunicação com API**: Axios
- **Notificações**: React Hot Toast (`react-hot-toast`)
- **Ícones**: React Icons (`react-icons`)
- **Ferramentas de Desenvolvimento**:
  - ESLint
  - Prettier
- **Testes**:
  - Jest
  - React Testing Library (`@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/dom`)
  - SWC para Jest (`@swc/jest`)

## Pré-requisitos

- **Node.js**: Versão 20.x ou superior ([Instalar Node.js](https://nodejs.org/)).
- **Yarn**: Versão 1.22.x ou superior ([Instalar Yarn](https://classic.yarnpkg.com/en/docs/install/)).
- **Backend Configurado e Rodando**: O [Servidor de Gerenciamento de Tarefas](https://github.com/dalcastagned/clinicorp-backend) deve estar configurado e em execução para que o frontend possa buscar e enviar dados.

## Configuração do Ambiente

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio-frontend>
cd frontend
```

### 2. Configurar a URL da API Backend

O frontend se conecta ao backend utilizando uma URL base que é definida no código. Se você precisar alterar a porta ou o endereço completo para onde o frontend envia as requisições da API (por exemplo, se o seu [Servidor de Gerenciamento de Tarefas](https://github.com/dalcastagned/clinicorp-backend) estiver rodando em uma porta diferente da padrão `8085`), siga os passos abaixo:

1.  **Localize o Arquivo de Configuração da API:**
    No código-fonte do projeto frontend, encontre o arquivo onde a instância do cliente API é criada e configurada. Este arquivo está localizado no caminho `src/api/index.js`.

2.  **Modifique a `baseURL`:**
    Dentro do arquivo encontrado, procure pela linha onde `baseURL` é definida para o cliente Axios:

    ```javascript
    // Exemplo de conteúdo em src/api/index.js
    import axios from 'axios'

    const baseURL = 'http://localhost:8085/' // <-- MODIFIQUE ESTA LINHA

    const api = axios.create({
      baseURL,
    })

    export { api }
    ```

3.  **Altere a Porta (ou URL completa):**
    Edite a string da `baseURL` para refletir o endereço e a porta corretos do seu backend.

    - Por exemplo, se o seu backend estiver rodando na porta `3000`, altere a linha para:
      `baseURL: 'http://localhost:3000'`
    - Se o backend estiver em um host diferente, ajuste a URL completa:
      `baseURL: 'http://outro-host:porta_correta'`

4.  **Salve o Arquivo:**
    Após fazer a alteração, salve o arquivo. Se o servidor de desenvolvimento Vite (`yarn dev`) estiver em execução, ele geralmente irá recarregar automaticamente com a nova configuração. Caso contrário, reinicie o servidor de desenvolvimento.

Certifique-se de que a URL configurada corresponda exatamente ao endereço onde o seu backend está acessível.

### 3. Instalar Dependências

Use o Yarn para instalar todas as dependências listadas no `package.json`:

```bash
yarn install
```

ou simplesmente:

```bash
yarn
```

## Executando a Aplicação

Certifique-se de que o servidor backend esteja em execução e que a URL da API no frontend (conforme o item "Configurar a URL da API Backend" acima) esteja configurada corretamente.

- **Para Desenvolvimento (com Hot Reloading):**
  Inicia o servidor de desenvolvimento Vite.

  ```bash
  yarn dev
  ```

- **Para Build de Produção:**
  Compila e otimiza a aplicação para produção na pasta dist/.

  ```bash
  yarn build
  ```

- **Para Visualizar o Build de Produção Localmente:**
  Inicia um servidor estático para servir os arquivos da pasta dist/.
  ```bash
  yarn preview
  ```

## Executando os Testes

Este projeto utiliza Jest e React Testing Library para testes unitários e de integração.

- **Para rodar todos os testes uma vez:**

```bash
  yarn test
```

- **Para rodar os testes em modo de observação (watch mode), que re-executa ao salvar arquivos:**

```bash
  yarn test:watch
```

- **Para rodar os testes e gerar um relatório de cobertura:**
  O relatório será salvo na pasta coverage/.

```bash
  yarn test:coverage
```
