import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import styles from "./page.module.css";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Skills />
      <Projects />
    </main>
  );
}
