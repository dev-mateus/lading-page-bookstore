# Imagens da Landing Page

## Capas dos Livros

Esta pasta contém as capas dos livros utilizadas na landing page:

### Imagens JPG (Reais):
- `senhor-dos-aneis.jpg` - O Senhor dos Anéis
- `1984.jpg` - 1984
- `harry-potter.jpg` - Harry Potter e a Pedra Filosofal

### Imagens SVG (Placeholders):
- `pequeno-principe.svg` - O Pequeno Príncipe
- `revolucao-bichos.svg` - A Revolução dos Bichos
- `dom-casmurro.svg` - Dom Casmurro

## Notas

As imagens SVG são placeholders coloridos com gradientes que podem ser facilmente substituídas por capas reais posteriormente. Elas foram criadas para manter o design consistente enquanto funcionam perfeitamente na página.

## Substituir Placeholders

Para substituir os placeholders SVG por imagens reais:

1. Adicione a imagem JPG com o mesmo nome na pasta `images/`
2. Atualize a referência no `index.html` de `.svg` para `.jpg`
3. Atualize a referência no `script.js` na seção `booksData`

Exemplo:
```html
<!-- Antes -->
<img src="images/pequeno-principe.svg" alt="O Pequeno Príncipe">

<!-- Depois -->
<img src="images/pequeno-principe.jpg" alt="O Pequeno Príncipe">
```

## Dimensões Recomendadas

- Largura: 400px
- Altura: 600px
- Formato: JPG ou PNG
- Proporção: 2:3 (padrão de capa de livro)
