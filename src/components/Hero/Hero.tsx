import styles from "./Hero.module.css";
import VideoIntro from "../VideoIntro/VideoIntro";
import CinematicLayer from "../CinematicLayer/CinematicLayer";
import LandingContent from "../LandingContent/LandingContent";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <VideoIntro />
      <CinematicLayer />
      <LandingContent />
    </section>
  );
}
