"use client";

import { useEffect, useRef } from "react";
import styles from "./LandingContent.module.css";
import gsap from "gsap";
import { FileText } from "lucide-react";

export default function LandingContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const resumeRef = useRef<HTMLAnchorElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        tagRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.5 }
      )
      .fromTo(
        firstNameRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        "-=0.8"
      )
      .fromTo(
        lastNameRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        "-=1.2"
      )
      .fromTo(
        roleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=1.0"
      )
      .fromTo(
        resumeRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=1.0"
      )
      .fromTo(
        indicatorRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={styles.contentContainer} ref={containerRef}>
      <div className={styles.textContent}>
        <p className={styles.tagline} ref={tagRef}>Full-Stack & AI Engineer</p>
        
        <div className={styles.nameWrapper}>
          <h1 className={styles.firstName} ref={firstNameRef}>Manivardhan</h1>
          <h1 className={styles.lastName} ref={lastNameRef}>Woonna</h1>
        </div>
        
        <p className={styles.role} ref={roleRef}>
          National Institute Of Technology Raipur
        </p>
        
        <a 
          href="/Resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.resumeButton}
          ref={resumeRef}
        >
          <FileText size={20} />
          View Resume
        </a>
      </div>

      <div className={styles.scrollIndicator} ref={indicatorRef} onClick={handleScrollClick}>
        <span className={styles.scrollText}>Scroll to explore</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot}></div>
        </div>
      </div>
    </div>
  );
}
