"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Contact.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    try {
      await fetch("https://formsubmit.co/ajax/manivardhanwoonna@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `New Portfolio Message from ${name}`,
          _template: "box", // Beautiful email template
        }),
      });
      
      setIsSent(true);
      
      // Reset form state after a few seconds
      setTimeout(() => {
        setIsSent(false);
        form.reset();
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again or email me directly.");
    }
  };

  return (
    <section className={styles.contactSection} ref={containerRef}>
      <div className={styles.card}>
        <div className={styles.leftColumn} ref={leftRef}>
          {isSent ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>Transmission Sent</h3>
              <p className={styles.successText}>Message has been delivered successfully.</p>
            </div>
          ) : (
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input name="name" type="text" placeholder="Your Name" required className={styles.inputField} />
                <div className={styles.inputUnderline}></div>
              </div>
              
              <div className={styles.inputGroup}>
                <input name="email" type="email" placeholder="Your Email" required className={styles.inputField} />
                <div className={styles.inputUnderline}></div>
              </div>
              
              <div className={styles.inputGroup}>
                <textarea name="message" placeholder="Your Message" required className={styles.textareaField}></textarea>
                <div className={styles.inputUnderline}></div>
              </div>
              
              <button type="submit" className={styles.submitBtn}>
                SEND TRANSMISSION
              </button>
            </form>
          )}
        </div>

        <div className={styles.rightColumn} ref={rightRef}>
          <h2 className={styles.directLinksTitle}>Direct Links</h2>
          
          <div className={styles.socialIcons}>
            <a href="https://github.com/manivardhan2005" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <GithubIcon size={40} />
            </a>
            <a href="https://www.linkedin.com/in/manivardhan-woonna/" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <LinkedinIcon size={40} />
            </a>
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.infoRow}>
              <Mail className={styles.infoIcon} size={20} />
              <span>manivardhanwoonna@gmail.com</span>
            </div>
            <div className={styles.infoRow}>
              <Phone className={styles.infoIcon} size={20} />
              <span>+91-8309834564</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
