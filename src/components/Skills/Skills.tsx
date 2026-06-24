"use client";

import { useEffect, useRef } from "react";
import styles from "./Skills.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "C++", "SQL", "JavaScript"]
  },
  {
    title: "Web Technologies",
    skills: ["React", "Node.js", "Express.js", "HTML", "CSS", "RESTful APIs", "JWT"]
  },
  {
    title: "AI & Machine Learning",
    skills: ["LLMs (Llama 3)", "Prompt Engineering", "NLP", "Scikit-learn", "Pandas", "NumPy"]
  },
  {
    title: "Tools & Others",
    skills: ["Git", "GitHub", "Postman", "Linux", "Chrome Extension API"]
  }
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      categoriesRef.current.forEach((cat, index) => {
        if (!cat) return;
        gsap.fromTo(
          cat,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cat,
              start: "top 90%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !categoriesRef.current.includes(el)) {
      categoriesRef.current.push(el);
    }
  };

  return (
    <section className={styles.skillsSection} ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Technical Skills</h2>
        
        <div className={styles.skillsGrid}>
          {skillCategories.map((category, idx) => (
            <div className={styles.categoryCard} key={idx} ref={addToRefs}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <div className={styles.badgeContainer}>
                {category.skills.map((skill, i) => (
                  <span key={i} className={styles.skillBadge}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
