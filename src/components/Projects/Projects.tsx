"use client";

import { useEffect, useRef } from "react";
import styles from "./Projects.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "CarRentalApp",
    tech: ["React", "Node.js", "PostgreSQL", "JWT"],
    date: "10/2025",
    link: "https://carrental-zeta-nine.vercel.app/",
    bullets: [
      "Designed and built 12 secure RESTful APIs using Node.js and Express.js with JWT authentication and RBAC for protected user and admin operations.",
      "Reduced average API response time by 40% by optimizing database queries, improving routing logic, and enhancing backend request handling."
    ]
  },
  {
    title: "Job Bot",
    tech: ["JavaScript", "Python", "CSS"],
    date: "03/2026",
    link: "https://github.com/manivardhan2005/job_bot",
    bullets: [
      "Engineered a custom Chrome extension using JavaScript, HTML, and CSS to automate complex data entry across multi-page job portals, reducing average application completion time by 85%.",
      "Incorporated an AI vision model fallback (Llama 3.2 Vision) to visually map hidden or non-standard UI elements, improving automated form completion rates by 15% and significantly reducing manual data entry errors.",
      "Designed a secure, serverless architecture utilizing the Chrome storage API to locally manage sensitive user data, eliminating reliance on backend databases, reducing hosting costs to 0, and achieving 100% data retrieval uptime."
    ]
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { perspective: 1200 });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, rotateX: 30, z: -100, transformOrigin: "center center" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            z: 0,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section id="projects" className={styles.projectsSection} ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        
        <div className={styles.grid}>
          {projects.map((project, idx) => (
            <div className={styles.card} key={idx} ref={addToRefs}>
              <div className={styles.cardHeader}>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.titleLink}>
                  <h3 className={styles.title}>{project.title} <span className={styles.linkIcon}>↗</span></h3>
                </a>
                <span className={styles.date}>{project.date}</span>
              </div>
              <div className={styles.techStack}>
                {project.tech.map((tech, i) => (
                  <span key={i} className={styles.techBadge}>{tech}</span>
                ))}
              </div>
              <ul className={styles.details}>
                {project.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
