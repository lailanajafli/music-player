import React, { useState, useEffect, useRef } from "react";
import Sonata from "../assets/images/sonata.mp3";

const MusicPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  let animationFrameId;

  const slides = ["slide1", "slide2", "slide3"];
  const totalBars = 50;
  const barWidth = 2;
  const barGap = 1;
  let heights = Array.from(
    { length: totalBars },
    () => Math.random() * 50 + 30
  );

  const showSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    drawWaveform(false);
  }, []);

  const drawWaveform = (animated) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const time = Date.now() * 0.009;

    for (let i = 0; i < totalBars; i++) {
      const barHeight = heights[i] + Math.sin(time + i) * 5;
      const x = i * (barWidth + barGap);
      const y = (canvasHeight - barHeight) / 2;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x, y, barWidth, barHeight);
    }

    if (isPlaying && animated) {
      animationFrameId = requestAnimationFrame(() => drawWaveform(true));
    }
  };

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
      drawWaveform(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      cancelAnimationFrame(animationFrameId);
      drawWaveform(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="musicPlayer">
          <div className="albumCover">
            <img src="album-cover.jpg" alt="Album Cover" />
          </div>
          <h2>Back To Her Men</h2>
          <p>Demien Rice</p>
          <div className="waveform">
            <canvas ref={canvasRef} width="300" height="50"></canvas>
          </div>
          <div className="controls">
            <button onClick={prevSlide}>⏮</button>
            <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
            <button onClick={nextSlide}>⏭</button>
          </div>
          <audio ref={audioRef} src={Sonata}></audio>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
