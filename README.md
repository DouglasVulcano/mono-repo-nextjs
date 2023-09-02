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

O módulo de design system de uma aplicação, é onde fica centralizado componentes visuais que serão comuns em toda a aplicação, ou entre aplicações, como no caso de mono-repo. Observe a pasta 'packages/design-system', lá foi criado a posta components, onde será armazenado esses componentes.

Para configurar esse módulo na aplicação, as seguintes configurações serão realizadas, tornando a aplicação cada vez mais completa.

1. Adicionando o workspace do design-system.

No arquivo package.json raiz do projeto:

```
    "scripts": {
        ...,
        "design-system": "yarn workspace @alura/design-system"
    }
```

Assim, quando for necessário adicionar pacotes para o módulo, basta rodar o comando começando por 'yarn design-system add'. Como para instalar o styled components que será utilizado.

```
yarn design-system add styled-components
```

2. Adicionar o pacote no package.json do projeto.

No projeto web-public, foi adicionado o pacote de design-system como uma dependencia

```
    "dependencies": {
        ...,
        "@alura/design-system": "*"
    },
```

Assim, temos a importação podendo ser realizada da seguinte dorma dentro dos componentes:

```
import { Text } from "@alura/design-system/components/Text";
```

3. Pré-compilação de Módulos no Next.js.

Para utilizar bibliotecas externas no Next.js, é necessário pré-compilar esses módulos para que possam ser incorporados ao código. Isso garante uma integração suave e eficiente. Neste guia, demonstraremos como adicionar e configurar duas bibliotecas, next-transpile-modules e next-compose-plugins, para alcançar esse objetivo.

```
yarn add next-transpile-modules
yarn add next-compose-plugins

Ou usando dos workspaces:

yarn web-public add -D next-compose-plugins next-transpile-modules
```

Com isso, será criado um arquivo next.config.js na raiz do projeto, que é o arquivo de configurações gerais do Next, onde será adicionado o seguinte código:

```
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
    "some-module",
    "and-another",
]);

module.exports = withPlugins([withTM], {
    // ...
});
```

Por fim, a configuração final do arquivo deve estar da seguinte forma, passando os módulos para serem compilados. No caso, '@alura/utils' e '@alura/design-system':

```
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
    "@alura/design-system",
    "@alura/utils",
]);

/**
 * @type {import('next').NextConfig}
 */
module.exports = withPlugins([withTM], {
    trailingSlash: true,
});
```

# 4 Configurações de teste compartilhadas.

Implementado o Jest para testes na aplicação, de forma compartilhada.

1. Adicionar comandos e dependências no package.json
```
    "scripts": {
        "test": "jest"
    },
    "devDependencies": {
        "@alura/test-commons": "*",
        "@alura/tsconfig-commons": "*"
    }
```

Em seguida, você deve adicionar os tipos do Jest ao seu package.json raiz do projeto como dependência:
```
    "@types/jest": "^29.5.4"

```
Isso garantirá que o TypeScript reconheça as tipagens do Jest.

2. Configurar o pacote 'jest-commons'
Agora, é hora de configurar o pacote 'jest-commons' em /setup/jest-commons.

Dentro do package.json do pacote 'jest-commons', adicione as seguintes dependências de desenvolvimento:
```
{
    "name": "@alura/test-commons",
    "version": "1.0.0",
    "private": true,
    "main": "index.js",
    "license": "MIT",
    "files": [
        "base.ts"
    ],
    "devDependencies": {
        "jest": "^29.6.4",
        "ts-node": "^10.9.1",
        "babel-jest": "^29.6.4",
        "@babel/code": "7.22.11",
        "@babel/preset-env": "7.22.14",
        "@babel/preset-react": "7.22.5",
        "@babel/preset-typescript": "7.22.11"
    },
    "scripts": {
        "test": "echo 'Not implemented'",
        "lint": "echo 'Not implemented'"
    }
}
```
Certifique-se de que estas dependências estão instaladas no pacote 'jest-commons'.

3. Criar arquivos de configuração
Agora, crie dois novos arquivos dentro do pacote 'jest-commons': 'base.ts' e '.babelrc', com as seguintes configurações:

- base.ts

```
import type { Config } from '@jest/types';
import path from 'path';

const config: Config.InitialOptions = {
    testEnvironment: 'jsdom',
    verbose: true,
    transform: {
        '\\.[jt]sx?$': ['babel-jest', {
            configFile: path.resolve(__dirname, '.babelrc'),
        }],
    },
};

export default config;

```

- .babelrc
```
{
    "presets": [
        [
            "@babel/preset-react",
            {
                "runtime": "automatic"
            }
        ],
        "@babel/preset-env",
        "@babel/preset-typescript"
    ]
}

```
Estas configurações vão garantir que o Jest seja configurado corretamente e que o Babel seja usado para transpilar seu código durante os testes.

4. Adicionar comandos no package.json raiz
Para executar os testes em módulos específicos, adicione os seguintes comandos no package.json raiz do projeto:

```
    "scripts": {
        ...
        "utils": "yarn workspace @alura/utils",
        "test:utils": "yarn utils test"
    }
```

5. Configurar jest.config.ts
Por último, para que o Jest use a configuração que definimos, crie um arquivo jest.config.ts com o seguinte conteúdo:

```
export { default } from "@alura/test-commons/base";
```

Para testar o módulo de utils, basta rodar o comando configurado:
```
yarn test:utils
```


## Referências:

https://classic.yarnpkg.com/lang/en/docs/workspaces/
