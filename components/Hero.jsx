"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.css";

export default function Hero() {
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionsRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const targets = [
      badgeRef.current,
      titleRef.current,
      descriptionRef.current,
      actionsRef.current,
      labelRef.current,
    ];

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 16, filter: "blur(14px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.1,
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(targets, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.copy}>
          <span className={styles.badge} ref={badgeRef}>
            <span className={styles.badgeDot} />
            Aberto para novos projetos
          </span>
          <h1 className={styles.title} ref={titleRef}>
            Construo interfaces <br />
            com extremo cuidado,
            <br />
            <span className={styles.highlight}>feitas para durar.</span>
          </h1>
          <p className={styles.description} ref={descriptionRef}>
            Experiências criadas, projetadas para serem bonitas e construídas
            para durar. Cada decisão de design passa pela minha mão, do rascunho
            ao pixel final.
          </p>
          <div className={styles.actions} ref={actionsRef}>
            <a href="#contato" className={styles.primary}>
              Vamos conversar
              <svg
                className={styles.primaryIcon}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#projetos" className={styles.secondary}>
              Ver projetos
            </a>
          </div>
        </div>
      </div>
      <span className={styles.labelLink} ref={labelRef}>
        Me encontre no{" "}
        <Link
          href="https://github.com/JoaoSyllos"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          Github
        </Link>
      </span>
    </section>
  );
}
