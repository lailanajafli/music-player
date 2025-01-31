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

  // Dynamically generate heights for waveform
  const [heights, setHeights] = useState(Array.from({ length: totalBars }, () => Math.random() * 50 + 30));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    drawWaveform(false);
    return () => cancelAnimationFrame(animationFrameId); // Clean up animation on unmount
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const drawWaveform = (animated) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const time = Date.now() * 0.009;

    // Recalculate heights dynamically for each frame
    const updatedHeights = heights.map((height, i) => height + Math.sin(time + i) * 5);
    setHeights(updatedHeights);  // Update heights on each draw

    for (let i = 0; i < totalBars; i++) {
      const barHeight = updatedHeights[i];
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

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; // 10 saniye ileri al
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10; // 10 saniye geri al
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
          <p>Damien Rice</p>
          <div className="waveform">
            <canvas ref={canvasRef} width="300" height="50"></canvas>
          </div>
          <div className="controls">
            <button onClick={skipBackward}>⏪ 10s</button>
            <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
            <button onClick={skipForward}>10s ⏩</button>
          </div>
          <audio ref={audioRef} src={Sonata}></audio>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
