"use client";

import { useEffect, useRef } from "react";
import styles from "./About.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Apply perspective to the container for 3D effects
      gsap.set(containerRef.current, { perspective: 1000 });
      
      gsap.fromTo(
        textRefs.current,
        { y: 80, z: -100, opacity: 0, rotateX: -45, transformOrigin: "top center" },
        {
          y: 0,
          z: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLParagraphElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section id="about" className={styles.aboutSection} ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle} ref={addToRefs}>About Me</h2>
        <div className={styles.content}>
          <p className={styles.summary} ref={addToRefs}>
            I am a Computer Science undergraduate specializing in <span className={styles.highlight}>scalable backend architectures</span>, full-stack web applications, and <span className={styles.highlight}>AI-driven automation</span>. 
          </p>
          <p className={styles.summary} ref={addToRefs}>
            Proficient in React, Node.js, and PostgreSQL, I have hands-on experience drastically reducing API response times and engineering high-performance data extraction tools. 
          </p>
          <p className={styles.summary} ref={addToRefs}>
            My work is supported by strong algorithmic fundamentals and data structure proficiency, having solved over <span className={styles.highlight}>500+ problems across different platforms like LeetCode, CodeChef, etc</span>.
          </p>
          
          <div className={styles.educationCard} ref={addToRefs as any}>
            <div className={styles.cardGlow}></div>
            <div className={styles.cardContent}>
              <h3 className={styles.degree}>Bachelor of Technology in Computer Science and Engineering</h3>
              <p className={styles.university}>National Institute of Technology, Raipur</p>
              <p className={styles.year}>Class of 2027</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
