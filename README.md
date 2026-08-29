# Portifolio

Site estático em HTML + CSS + JavaScript puro. Sem framework, sem build step,
sem dependências instaladas.

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
animations.js   animações de conteúdo: entrada do hero + scroll do skills
favicon.ico
```

O GSAP (core + ScrollTrigger + ScrollSmoother, v3.15.0) vem de CDN, carregado
no `index.html` antes dos dois scripts.

## background.js — fundo do site

Puramente reativo ao cursor, sem relação com scroll (só usa `gsap` core, não
ScrollTrigger/ScrollSmoother):

- **needle field** — campo de agulhas em WebGL que aponta para o cursor
- **cursor glow** — brilho azulado seguindo o cursor com atraso suave

## animations.js — animações de conteúdo

Dependem de scroll (ScrollTrigger/ScrollSmoother):

- **hero** — entrada em cascata dos elementos do topo
- **skills** — o `.c1` fica pinado e "flutua" só enquanto o site desce; ao sair
  da seção, força o scroll até o `.c2`

Em ambos os arquivos, as animações pesadas (shader, glow, pin do skills) ficam
desligadas em touch/telas pequenas e com `prefers-reduced-motion: reduce`,
com um gradiente estático de fallback no fundo.
