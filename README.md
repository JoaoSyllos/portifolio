# Portfólio — Next.js + React

Implementação do design `Portfolio.dc.html` (referência em `design-reference/`) em Next.js 15 (App Router), React 19, TypeScript e CSS Modules. Fidelidade: **hi-fi**.

## Rodar

```bash
npm install
npm run dev   # http://localhost:3000
```

## Estrutura

```
app/
  layout.tsx        # <html>, metadata, cursor e efeitos de scroll globais
  page.tsx          # composição das seções
  globals.css       # tokens (CSS vars), reset, reveal e reduced-motion
components/
  Section.tsx       # wrapper comum: borda, gutter, título h2 (+ contagem opcional)
  Nav / Hero / Marquee / Projects / Skills / Contact / Footer
  Crosshair.tsx     # marca "+" girando, usada no hero
  Cursor.tsx        # client: cursor com atraso suave
  ScrollEffects.tsx # client: link ativo da nav
  Spotlight.tsx     # client: grid do hero acende perto do ponteiro
data/content.ts     # todo o conteúdo (projetos, skills, contatos, faixa, ids das seções)
lib/format.ts       # pad(n) → "01"
lib/motion.ts       # stagger(i) → --i para escalonar entradas
```

## Como evitei redundância

- **Conteúdo num lugar só:** `data/content.ts`. Os ids e labels das seções alimentam a navegação e as âncoras, então renomear uma seção muda os dois.
- **Tokens em CSS vars** (`--navy`, `--blue`, `--lime`, `--gutter`…). Nenhum hex se repete nos componentes.
- **`<Section>`** concentra a borda superior, o gutter e o estilo do título. Cada seção define só o próprio padding vertical.
- **Cursor sem handlers espalhados:** um único listener `pointerover` detecta `a`, `button` e `[data-cursor="grow"]`. No protótipo havia `onMouseEnter`/`onMouseLeave` em cada link.
- Removido o código morto do protótipo (estado de drag, posições e cores dos cards antigos, tamanhos aleatórios das skills).
- Só `Cursor`, `ScrollEffects` e `Spotlight` são client components; o resto renderiza no servidor. A entrada do hero é CSS puro e roda antes da hidratação.

## Tokens

| Token | Valor | Uso |
|---|---|---|
| --navy | #13293D | fundo |
| --navy-deep | #0F2131 | fundo da seção Skills |
| --blue | #3E92CC | acentos, labels, bordas |
| --lime | #DCF763 | texto principal, cursor, hover das tags |
| --line / --line-strong | rgba(62,146,204,.25 / .35) | divisórias |
| --gutter | 5vw | margem lateral |

Tipografia: stack mono `'SF Mono', 'JetBrains Mono', Consolas, monospace`. H1 `clamp(56px, 11vw, 168px)` peso 900 · H2 `clamp(32px, 5vw, 64px)` · contato `clamp(40px, 9vw, 140px)`.

## Interações

- Cursor: círculo lime de 22px com `mix-blend-mode: difference` que segue o ponteiro com atraso suave. Escala 2.2× sobre elementos interativos e encolhe no clique. Fica oculto em touch.
- Hero: as linhas do H1 sobem de uma máscara em sequência; eyebrow, texto e decoração entram em fade. As cruzes giram 90° a cada 6s, o anel tem um tracejado girando, o "BUILD" tem um ponto pulsando e o grid acende em volta do ponteiro.
- Botão "Ver projetos": no hover/foco, fundo lime desce de cima, texto vira navy, ganha glow e a seta ↓ desce em loop.
- Faixa (marquee) lime entre o hero e os projetos, em loop contínuo; pausa no hover.
- Reveal no scroll (CSS puro, `animation-timeline: view()`): títulos, projetos, skills e contato sobem com fade ao entrar na tela. Sem suporte, aparecem direto.
- Nav: sublinhado que cresce no hover; o link da seção visível fica lime. Barra de progresso de leitura no topo (onde há `animation-timeline`).
- Projetos: no hover, `padding-left` 24px, fundo `rgba(62,146,204,.08)`, barra lime na esquerda e a seta ↗ num círculo que fica lime e gira para →.
- Skills: no hover, fundo lime, texto navy e a tag sobe 4px.
- Contato: o sublinhado sai pela direita e volta pela esquerda; a seta ↗ se desloca.
- Caret `_` do H1 pisca a cada 1s (`step-end`).
- `prefers-reduced-motion: reduce` desliga animações e o reveal; `:focus-visible` tem contorno lime.

## Ajustes em relação ao protótipo

- O espaço entre o título e a lista agora é de 60px nas duas seções (antes 76px em Projetos e 50px em Skills).
- Breakpoints novos: hero em coluna única abaixo de 900px; lista de projetos compacta abaixo de 760px.
- O cursor customizado foi reincluído. Ele tinha sido removido do protótipo, mas o `cursor: none` continuava ativo e o ponteiro sumia.

## Pendências

Projetos, contatos e links reais: editar `data/content.ts`.
