## Trabalhando com mono-repo no NextJS

### Comandos iniciais para cada repo:

```
-   yarn init -y
-   npx gitignore node
-   yarn add next react react-dom
-   yarn add --dev typescript @types/react @types/node
```

### Adicionar ao package.json

```
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
}

```
