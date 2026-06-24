"use client";

import { useEffect, useRef } from "react";
import styles from "./Achievements.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Trophy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const achievementsList = [
  {
    icon: <Award size={32} />,
    text: "Ranked in the top 1.1 percentile in the JEE Mains Exam."
  },
  {
    icon: <Trophy size={32} />,
    text: "Secured a Top 5 finish out of 120+ teams at the NIT Raipur Annual Hackathon, prototyping an AI-powered full-stack web application within a 48-hour sprint."
  }
];

export default function Achievements() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { perspective: 1000 });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, x: -80, rotateY: 30, z: -100 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            z: 0,
            duration: 1.2,
            delay: index * 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.achievementsSection} ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Key Achievements</h2>
        
        <div className={styles.cardsContainer}>
          {achievementsList.map((achievement, index) => (
            <div 
              key={index} 
              className={styles.card} 
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <div className={styles.cardContent}>
                <div className={styles.iconContainer}>
                  {achievement.icon}
                </div>
                <div className={styles.details}>
                  <p className={styles.description}>
                    {achievement.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
