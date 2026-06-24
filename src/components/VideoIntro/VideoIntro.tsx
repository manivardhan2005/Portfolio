"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./VideoIntro.module.css";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

export default function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const blurVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted per user request

  // Intelligent autoplay logic: attempt unmuted, fallback to muted
  useEffect(() => {
    const playVideos = async () => {
      if (videoRef.current && blurVideoRef.current) {
        try {
          // Attempt unmuted autoplay
          videoRef.current.muted = false;
          videoRef.current.volume = 1.0;
          await videoRef.current.play();
          blurVideoRef.current.play().catch(() => {});
          setIsMuted(false);
          setIsPlaying(true);
        } catch (error) {
          // Browser blocked unmuted autoplay, fallback to muted
          console.warn("Unmuted autoplay blocked, falling back to muted autoplay.", error);
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => setIsPlaying(false));
          blurVideoRef.current.play().catch(() => {});
        }
      }
    };
    
    playVideos();
  }, []);

  // Sync manual play/pause toggle
  useEffect(() => {
    if (videoRef.current && blurVideoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
        blurVideoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        blurVideoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(prev => !prev);

  const handleReplayAudio = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      lastTimeRef.current = 0; // Prevent timeUpdate loop detection from instantly remuting
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      setIsMuted(false);
      videoRef.current.play().catch(() => {});
    }
  };

  const lastTimeRef = useRef(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (!isMuted) {
        videoRef.current.volume = 1.0;
      }
    }
  }, [isMuted]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    // If the current time is less than the last recorded time by a significant margin, it looped.
    if (current < lastTimeRef.current - 1) {
      setIsMuted(true);
    }
    lastTimeRef.current = current;
  };

  return (
    <div className={styles.videoContainer}>
      {/* Blurred ambient background video */}
      <video
        ref={blurVideoRef}
        className={styles.blurVideo}
        src="/background-video.mp4"
        loop
        muted
        playsInline
        autoPlay
      />
      
      {/* Main sharp video */}
      <video
        ref={videoRef}
        className={styles.mainVideo}
        src="/background-video.mp4"
        loop
        muted
        playsInline
        autoPlay
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Cinematic dark gradients overlay to improve text readability */}
      <div className={styles.gradientOverlay}></div>
      <div className={styles.vignetteOverlay}></div>

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.controlButton} onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} title={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button className={styles.controlButton} onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"} title={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <button className={styles.controlButton} onClick={handleReplayAudio} aria-label="Replay Audio" title="Restart with Audio">
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
}
