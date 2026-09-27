# Portifolio

Site estático em HTML + CSS puro, com uma única animação em GSAP: o fundo
(shader de agulhas em WebGL + brilho do cursor). O resto do conteúdo (hero,
skills, projects) é estático de propósito, pronto pra receber animações
próprias.

## Rodar

Precisa ser servido por HTTP — abrir o `index.html` direto pelo `file://`
quebra o WebGL. Qualquer servidor estático serve:

```bash
npx serve .
# ou
python -m http.server 8000
```

No VS Code, a extensão Live Server também funciona (já configurada na porta
5501 em `.vscode/settings.json`).

## Arquivos

```
index.html      markup das três seções (hero, skills, projects)
style.css       tema, reset e estilo de todas as seções
background.js   fundo do site: shader de agulhas + brilho do cursor
favicon.ico
```

O GSAP (só o core, v3.15.0) vem de CDN, carregado no `index.html` antes do
`background.js`. `ScrollTrigger`/`ScrollSmoother` não são usados — o fundo é
puramente reativo ao cursor, sem relação com scroll.

O shader/glow fica desligado em touch/telas pequenas e com
`prefers-reduced-motion: reduce`, com um gradiente estático de fallback no
lugar.

## Estado atual

Hero, skills e projects estão sem nenhuma animação — todo o conteúdo já
aparece visível, sem JavaScript envolvido. Os atributos `data-hero-item` e os
ids `skills-contents` / `skills-c1` / `skills-c2` continuam no markup como
ganchos prontos, caso sirvam de ponto de partida pra próxima animação.

Uma versão anterior tinha animações em GSAP também no hero (entrada em
cascata) e na seção skills (scroll-jack). Esse histórico continua no git, no
commit `7ea4fcb`, caso valha a pena consultar como referência.
