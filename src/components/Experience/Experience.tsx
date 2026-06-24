"use client";

import { useEffect, useRef } from "react";
import styles from "./Experience.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { perspective: 1200 });
      
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 100, rotateX: 30, z: -100, transformOrigin: "center center" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            z: 0,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section id="experience" className={styles.experienceSection} ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        
        <div className={styles.timeline}>
          <div className={styles.timelineLine}></div>
          
          <div className={styles.timelineItem} ref={addToRefs}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <div className={styles.header}>
                <h3 className={styles.role}>Engineer Trainee Intern</h3>
                <p className={styles.company}>Vantiris Technologies LLP</p>
                <span className={styles.date}>03/2026 - Present (Remote)</span>
              </div>
              
              <ul className={styles.achievements}>
                <li>
                  Spearheaded the construction of a <strong>Data visualization platform</strong> that parsed, mapped, and facilitated interaction with large-scale website sitemaps, leading to a <strong>30% increase in data parsing efficiency</strong>.
                </li>
                <li>
                  Deployed advanced evasion techniques to bypass <strong>CAPTCHAs, Cloudflare protections, and IP blocking</strong>, leveraging proxy rotation and concurrent request handling to achieve <strong>40% faster data retrieval</strong>.
                </li>
                <li>
                  Developed a custom <strong>RAG chatbot</strong> ingesting over 900 web pages, achieving highly accurate, hallucination-free answers. Constructed an automated testing pipeline to identify and resolve 2,000ms LLM generation bottlenecks.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
