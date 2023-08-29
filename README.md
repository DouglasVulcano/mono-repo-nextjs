## Trabalhando com Mono-repo no Next.js

Este guia tem como objetivo fornecer instruções para configurar e trabalhar com um mono-repo utilizando o framework Next.js. Um mono-repo é uma abordagem em que múltiplos projetos ou pacotes são mantidos dentro de um único repositório.

# 1 Configurações iniciais

Antes de começar, siga estas etapas nos repositórios individuais do seu mono-repo:

### Comandos iniciais para cada repo:

1. Inicie um novo projeto Yarn:

```
yarn init -y
```

2. Crie um arquivo .gitignore para Node.js:

```
npx gitignore node
```

3. Adicione as dependências essenciais do Next.js:

```
yarn add next react react-dom
```

4. Adicione dependências de desenvolvimento para suporte ao TypeScript e tipos do React/Node:

```
yarn add --dev typescript @types/react @types/node
```

5. Adicione os seguintes scripts ao arquivo package.json para habilitar comandos do Next.js:

```
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
}
```

# 2 Trabalhando com Workspaces

Para gerenciar múltiplos projetos e pacotes de forma eficiente, você pode configurar os Workspaces do Yarn. Siga estas etapas:

1. Na raiz do repositório, crie um arquivo package.json e adicione as configurações dos Workspaces:

```
{
    "private": true,
    "workspaces": {
        "packages": [
            "packages/*",
            "projects/*",
            "setup/*"
        ]
    }
}
```

2. A configuração acima permitirá que o node_modules seja colocado na raiz do projeto, permitindo um gerenciamento global das bibliotecas compartilhadas. Isso também garante que os projetos individuais contenham apenas as bibliotecas necessárias no escopo local, evitando conflitos.
3. Dentro das pastas packages, projects e setup, você pode organizar seus projetos e pacotes de acordo com a estrutura desejada.

Com essas configurações, você terá um ambiente de mono-repo eficiente com Workspaces do Yarn, permitindo compartilhamento de código e bibliotecas de forma mais simplificada entre os projetos dentro do repositório.

## Referências:

https://classic.yarnpkg.com/lang/en/docs/workspaces/
