# Portifolio — versão estática

Mesma UI e mesmas animações do app Next.js, em HTML + CSS + JavaScript puro.
Sem React, sem Next, sem build step.

## Rodar

Precisa ser servido por HTTP (abrir o `index.html` direto pelo `file://`
quebra o WebGL e o carregamento dos scripts). Qualquer servidor estático serve:

```bash
npx serve .
# ou
python -m http.server 8000
```

## Estrutura

```
index.html          markup das três seções (hero, skills, projects)
css/
  globals.css       variáveis de tema, reset, fallback de fundo no mobile
  hero.css          seção hero
  skills.css        seção skills (.c1 / .c2)
  projects.css      seção projects (placeholder, como no original)
  needle-field.css  canvas do shader de fundo
  cursor-glow.css   brilho que segue o cursor
js/
  vendor/           gsap 3.15.0 + ScrollTrigger + ScrollSmoother
  needle-field.js   campo de agulhas em WebGL apontando pro cursor
  cursor-glow.js    brilho azulado seguindo o cursor
  hero.js           entrada em cascata dos elementos do hero
  skills.js         pin do .c1 + scroll forçado até o .c2
  main.js           registra plugins, cria a ScrollSmoother e inicializa tudo
```

## Notas

- O GSAP está versionado em `js/vendor/` (cópia do `node_modules`) em vez de
  vir de CDN, então o site funciona offline e não depende de terceiros.
- As animações pesadas (shader, glow, pin do skills) ficam desligadas em
  touch/telas pequenas e com `prefers-reduced-motion: reduce` — mesmas media
  queries do projeto original.
- Os `markers: true` do ScrollTrigger, que eram de debug, foram removidos.
