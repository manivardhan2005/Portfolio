"use client";

import { useEffect, useRef } from "react";
import styles from "./Leadership.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Leadership() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { perspective: 1200 });

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 100, rotateX: -30, z: -100 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          z: 0,
          duration: 1.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.leadershipSection} ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Leadership & Responsibility</h2>
        
        <div className={styles.card} ref={contentRef}>
          <div className={styles.cardContent}>
            <div className={styles.iconContainer}>
              <Users size={32} color="var(--color-warm-orange)" />
            </div>
            <div className={styles.details}>
              <h3 className={styles.role}>Team Captain</h3>
              <p className={styles.organization}>NIT Raipur Inter-NIT Badminton Tournament</p>
              <p className={styles.description}>
                Captained and represented NIT Raipur in the Inter-NIT Badminton Tournament, exhibiting leadership, teamwork, and competitive excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
