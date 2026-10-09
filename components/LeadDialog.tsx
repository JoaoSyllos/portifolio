"use client";

import { useRef, useState } from "react";
import type { FormEvent, MouseEvent, ReactNode } from "react";
import { leadForm, whatsappLink, whatsappUrl } from "@/data/content";
import styles from "./LeadDialog.module.css";

type Lead = { nome: string; whatsapp: string; tipo: string };

/** Formata como (11) 91234-5678 enquanto a pessoa digita. */
function maskPhone(value: string) {
  let d = value.replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2); // colado com +55
  d = d.slice(0, 11);
  if (d.length <= 2) return d && `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  const split = d.length === 11 ? 7 : 6;
  return `(${d.slice(0, 2)}) ${d.slice(2, split)}-${d.slice(split)}`;
}

/** Envia o pedido para a planilha sem esperar resposta. */
function save(lead: Lead) {
  if (!leadForm.endpoint) return;
  fetch(leadForm.endpoint, {
    method: "POST",
    // text/plain + no-cors: o Apps Script não responde ao preflight de CORS,
    // então o pedido vai como requisição simples e a resposta não é lida.
    mode: "no-cors",
    // continua enviando mesmo se a pessoa sair da página em seguida
    keepalive: true,
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...lead, pagina: location.href }),
  }).catch(() => {});
}

type Props = { className?: string; children: ReactNode };

/**
 * Botão do WhatsApp que, antes de abrir a conversa, pede nome, WhatsApp e tipo de site,
 * salva o pedido e monta a mensagem. Sem JavaScript, o link leva direto ao WhatsApp.
 */
export default function LeadDialog({ className, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [phone, setPhone] = useState("");
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const open = (e: MouseEvent<HTMLAnchorElement>) => {
    // ctrl/cmd+clique continua abrindo o link normalmente
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    dialogRef.current?.showModal();
    // no celular o teclado subiria na hora e cobriria o formulário
    if (matchMedia("(pointer: fine)").matches) nameRef.current?.focus();
  };

  const close = () => dialogRef.current?.close();

  const onClose = () => {
    if (!sentUrl) return;
    setSentUrl(null);
    setPhone("");
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lead = {
      nome: String(data.get("nome")).trim(),
      whatsapp: phone,
      tipo: String(data.get("tipo")),
    };
    // o campo "site" é invisível: só robôs o preenchem
    if (!data.get("site")) save(lead);
    const url = whatsappLink(leadForm.message(lead));
    // abre ainda dentro do clique; se esperasse o salvamento, o navegador bloquearia a nova aba
    window.open(url, "_blank", "noopener");
    setSentUrl(url);
  };

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-haspopup="dialog"
        className={className}
        onClick={open}
      >
        {children}
      </a>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="lead-title"
        onClose={onClose}
        // clique no fundo escurecido fecha
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className={styles.body}>
          <button
            type="button"
            className={styles.close}
            onClick={close}
            aria-label="Fechar"
          >
            ×
          </button>

          {sentUrl ? (
            <div className={styles.done} role="status">
              <h2 id="lead-title" className={styles.title}>
                {leadForm.doneTitle}
              </h2>
              <p className={styles.intro}>{leadForm.doneText}</p>
              <a
                href={sentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.textLink}
              >
                {leadForm.doneRetry} ↗
              </a>
            </div>
          ) : (
            <form className={styles.form} onSubmit={submit}>
              <div>
                <h2 id="lead-title" className={styles.title}>
                  {leadForm.title}
                </h2>
                <p className={styles.intro}>{leadForm.intro}</p>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>Seu nome</span>
                <input
                  ref={nameRef}
                  name="nome"
                  className={styles.input}
                  required
                  pattern=".*\S.*"
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Como posso te chamar?"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Seu número de telefone</span>
                <input
                  name="whatsapp"
                  type="tel"
                  inputMode="tel"
                  className={styles.input}
                  required
                  pattern="\(\d{2}\) \d{4,5}-\d{4}"
                  title="DDD e número, por exemplo (11) 91234-5678"
                  autoComplete="tel-national"
                  placeholder="(11) 91234-5678"
                  value={phone}
                  onChange={(e) => setPhone(maskPhone(e.target.value))}
                />
              </label>

              <fieldset className={styles.types}>
                <legend className={styles.label}>Tipo de site</legend>
                {leadForm.types.map((tipo) => (
                  <label key={tipo} className={styles.chip}>
                    <input type="radio" name="tipo" value={tipo} required />
                    <span>{tipo}</span>
                  </label>
                ))}
              </fieldset>

              <input
                name="site"
                className={styles.trap}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />

              <button type="submit" className={styles.submit}>
                {leadForm.submit} <span aria-hidden>↗</span>
              </button>
              <p className={styles.privacy}>{leadForm.privacy}</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.textLink}
                onClick={close}
              >
                {leadForm.skip}
              </a>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
