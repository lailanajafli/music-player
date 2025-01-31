import React, { useState, useRef, useEffect } from "react";
import { FaHeart, FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio("/path-to-your-audio.mp3"));

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="musicPlayer">
      <div className="albumCover">
        <img src="/path-to-your-image.jpg" alt="Album Cover" />
      </div>
      <h3>Back To Her Men</h3>
      <p>Demien Ricee</p>
      <FaHeart className="heartIcon" />
      <div className="waveform">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="bar" style={{ height: `${Math.random() * 100}%` }}></div>
        ))}
      </div>
      <div className="controls">
        <FaStepBackward className="icon" />
        {isPlaying ? (
          <FaPause className="icon playPause" onClick={togglePlayPause} />
        ) : (
          <FaPlay className="icon playPause" onClick={togglePlayPause} />
        )}
        <FaStepForward className="icon" />
      </div>
      <div className="progress">
        <span>{Math.floor(currentTime / 60)}:{("0" + Math.floor(currentTime % 60)).slice(-2)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value;
            setCurrentTime(e.target.value);
          }}
        />
        <span>{Math.floor(duration / 60)}:{("0" + Math.floor(duration % 60)).slice(-2)}</span>
      </div>
    </div>
  );
};

export default MusicPlayer;