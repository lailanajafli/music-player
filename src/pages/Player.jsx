import React, { useState, useRef, useEffect } from "react"; 
import { FaHeart, FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa"; 
import myImage from '../assets/images/image.jpg'; 
import sonata from "../assets/images/sonata.mp3";
import { IoIosArrowBack } from "react-icons/io"; 
import { HiOutlineDotsVertical } from "react-icons/hi";

const MusicPlayer = () => { 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(false); 
  const audioRef = useRef(null); 
  const canvasRef = useRef(null); 
  const [heights, setHeights] = useState(Array.from({ length: 50 }, () => Math.random() * 50 + 30)); 
  let animationFrameId; 

  const slides = ["slide1", "slide2", "slide3"]; 
  const totalBars = 50; 
  const barWidth = 2; 
  const barGap = 1; 

  useEffect(() => { 
    const interval = setInterval(nextSlide, 5000); 
    return () => clearInterval(interval); 
  }, []); 

  useEffect(() => { 
    if (canvasRef.current) { 
      drawWaveform(false); 
    }
    return () => cancelAnimationFrame(animationFrameId); // Cleanup
  }, []); 

  const nextSlide = () => { 
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length); 
  }; 

  const drawWaveform = (animated) => { 
    if (!canvasRef.current) return; // Ensure canvasRef is available
    const canvas = canvasRef.current; 
    const ctx = canvas.getContext("2d"); 
    const canvasWidth = canvas.width; 
    const canvasHeight = canvas.height; 
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); 
    const time = Date.now() * 0.009; 

    // Update heights for animation
    const updatedHeights = heights.map((height, i) => height + Math.sin(time + i) * 5); 
    setHeights(updatedHeights); 

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
      audioRef.current.currentTime += 10; 
    } 
  }; 

  const skipBackward = () => { 
    if (audioRef.current) { 
      audioRef.current.currentTime -= 10; 
    } 
  }; 

  return ( 
    <div className="container"> 
      <div className="musicPlayer"> 
      <div className="row"> 
          <IoIosArrowBack /> 
          <p>Back To Her Men</p>  
          <HiOutlineDotsVertical /> 
        </div>
        <div className="albumCover"> 
          <img src={myImage} alt="Description" /> 
        </div> 
        <div> 
          <h3>Back To Her Men</h3> 
          <p>Damien Rice</p> 
        </div> 
        <FaHeart className="heartIcon" /> 
        <div className="waveform"> 
          <canvas ref={canvasRef} width="400" height="150"></canvas> 
        </div> 
        <div className="controls"> 
          <FaStepBackward className="icon" onClick={skipBackward} /> 
          {isPlaying ? ( 
            <FaPause className="icon playPause" onClick={togglePlay} /> 
          ) : ( 
            <FaPlay className="icon playPause" onClick={togglePlay} /> 
          )} 
          <FaStepForward className="icon" onClick={skipForward} /> 
        </div> 
        <audio ref={audioRef} src={sonata} />
      </div> 
    </div> 
  ); 
}; 

export default MusicPlayer;
