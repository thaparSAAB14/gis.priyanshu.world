"use client";
import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, PowerOff, Upload, Link as LinkIcon, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";

const ASCII_CHARS = " .:-=+*#%@";

export const AsciiVideoPlayer = ({ onExit }: { onExit?: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const processorCanvasRef = useRef<HTMLCanvasElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [videoSrc, setVideoSrc] = useState<string | null>("/default-video.mp4");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default muted to ensure autoplay works on modern browsers
  const [urlInput, setUrlInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [displayMode, setDisplayMode] = useState<"ascii_color" | "ascii_filled">("ascii_color");

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setErrorMsg("");
      setVideoSrc(url);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.includes("youtube.com") || urlInput.includes("youtu.be")) {
      setErrorMsg("> [ ERROR ] YouTube strictly blocks Canvas pixel extraction via CORS. Please upload a local file or paste a direct .mp4 URL.");
      return;
    }
    setErrorMsg("");
    setVideoSrc(urlInput);
  };

  // Hardware Accelerated Render Loop decoupled from React State
  useEffect(() => {
    if (!videoSrc) return;
    
    let animationFrameId: number;

    const renderFrame = () => {
      const video = videoRef.current;
      const processCanvas = processorCanvasRef.current;
      const displayCanvas = displayCanvasRef.current;
      
      if (video && processCanvas && displayCanvas && video.readyState >= 2 && !video.paused && !video.ended) {
        const pCtx = processCanvas.getContext("2d", { willReadFrequently: true });
        const dCtx = displayCanvas.getContext("2d", { alpha: false }); // Disable alpha for massive paint speed boost

          if (pCtx && dCtx) {
            const asciiWidth = 110; 
            const asciiHeight = 42; 
            const charW = 7;
            const charH = 12;

            processCanvas.width = asciiWidth;
            processCanvas.height = asciiHeight;
            
            if (displayCanvas.width !== asciiWidth * charW) {
               displayCanvas.width = asciiWidth * charW;
               displayCanvas.height = asciiHeight * charH;
            }

            pCtx.drawImage(video, 0, 0, asciiWidth, asciiHeight);
            const imageData = pCtx.getImageData(0, 0, asciiWidth, asciiHeight);
            const data = imageData.data;

            dCtx.fillStyle = "#000000"; // Pure black background
            dCtx.fillRect(0, 0, displayCanvas.width, displayCanvas.height);
            dCtx.font = `bold ${charH}px monospace`;
            dCtx.textBaseline = "top";

            // Direct parallel array map
            for (let y = 0; y < asciiHeight; y++) {
              for (let x = 0; x < asciiWidth; x++) {
                const offset = (y * asciiWidth + x) * 4;
                const r = data[offset];
                const g = data[offset + 1];
                const b = data[offset + 2];
                
                // Boost overall saturation & brightness exactly per pixel constraint
                dCtx.fillStyle = `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`;

                if (displayMode === "ascii_filled") {
                  // Paint physical character background bounds using standard full-width square nodes
                  dCtx.fillRect(x * charW, y * charH, charW, charH);
                } else {
                  const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
                  const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
                  const char = ASCII_CHARS[charIndex];
                  
                  if (char !== " ") {
                    dCtx.fillText(char, x * charW, y * charH);
                  }
                }
              }
            }
          }
      }
      animationFrameId = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => cancelAnimationFrame(animationFrameId);
  }, [videoSrc, displayMode]);

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        await containerRef.current.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen().catch(() => {});
      }
    }
  };

  if (!videoSrc) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-card/10 backdrop-blur-md p-8 overflow-hidden rounded-b-2xl">
         <div className="absolute top-4 w-full px-6 flex justify-between items-center text-xs font-mono text-foreground/50 uppercase tracking-widest border-b border-foreground/5 pb-4">
          <a href="https://github.com/joelibaceta/video-to-ascii" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex flex-wrap items-center gap-2">
            <LinkIcon className="w-3 h-3" />
            video-to-ascii handler
          </a>
        </div>

        <div className="flex flex-col items-center gap-6 w-full max-w-sm mt-8">
           <p className="text-foreground/60 font-mono text-xs text-center leading-relaxed">
             Initialize the hardware-accelerated ASCII render engine by providing a valid video stream matrix.
           </p>

           {errorMsg && (
             <p className="text-red-400 font-mono text-[10px] sm:text-xs text-center animate-pulse border border-red-500/10 bg-red-500/5 p-3 rounded-xl">{errorMsg}</p>
           )}

           <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-xl cursor-pointer hover:bg-foreground/10 transition-all group shadow-sm">
             <Upload className="w-4 h-4 text-foreground/70 group-hover:-translate-y-1 transition-transform" />
             <span className="font-mono text-xs text-foreground/80 font-medium tracking-wide">Select Local Video File</span>
             <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
           </label>

           <div className="flex items-center gap-4 w-full">
             <div className="h-[1px] bg-foreground/10 flex-1" />
             <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">or</span>
             <div className="h-[1px] bg-foreground/10 flex-1" />
           </div>

           <form onSubmit={handleUrlSubmit} className="flex flex-col gap-3 w-full">
             <div className="relative w-full">
               <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
               <input 
                 type="url" 
                 placeholder="Paste direct .mp4 URL link..." 
                 value={urlInput}
                 onChange={(e) => setUrlInput(e.target.value)}
                 className="w-full bg-foreground/5 border border-foreground/10 rounded-xl py-3 pl-10 pr-4 font-mono text-xs text-foreground focus:outline-none focus:border-foreground/30 focus:bg-foreground/10 placeholder:text-foreground/30 transition-all"
                 required
               />
             </div>
             <button type="submit" className="w-full px-4 py-3 bg-foreground border border-foreground/20 text-background font-mono text-xs font-semibold rounded-xl hover:bg-foreground/90 transition-all shadow-md active:scale-[0.98]">
               Stream Cloud Link
             </button>
           </form>

           <button onClick={() => setVideoSrc("/default-video.mp4")} className="w-full font-mono text-xs text-foreground/50 hover:text-foreground border border-transparent hover:border-foreground/10 hover:bg-foreground/5 rounded-xl py-3 transition-all">
             Restore Default Fallback Video
           </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative flex flex-col overflow-hidden transition-all ${isFullscreen ? "w-screen h-screen bg-black p-4 z-[9999]" : "w-full h-full bg-card/10 backdrop-blur-xl p-4 rounded-b-2xl"}`}
    >
      <div className="flex justify-between items-center mb-4 text-[10px] sm:text-xs font-mono text-foreground/50 uppercase tracking-widest border-b border-foreground/5 pb-4">
        <a href="https://github.com/joelibaceta/video-to-ascii" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors items-center gap-2 opacity-40 hover:opacity-100 flex">
          <LinkIcon className="w-3 h-3" />
          <span className="hidden sm:inline">hardware accelerated ascii layer | joelibaceta</span>
          <span className="sm:hidden">joelibaceta</span>
        </a>
        <div className="flex flex-wrap gap-2 items-center">
          <button onClick={toggleFullscreen} className="p-1 rounded-sm hover:bg-foreground/10 text-foreground/50 hover:text-foreground transition-colors active:scale-95" title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
          <div className="w-px h-4 bg-foreground/10 mx-1" />
          <button onClick={() => setVideoSrc(null)} className="px-2 py-1 rounded-md text-[10px] text-foreground/50 hover:bg-foreground/10 hover:text-foreground transition-colors active:scale-95">
            Reset Stream
          </button>
        </div>
      </div>

      <video 
        ref={videoRef} 
        src={videoSrc}
        crossOrigin="anonymous"
        loop 
        autoPlay
        muted={isMuted}
        playsInline 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden" 
      />
      <canvas ref={processorCanvasRef} className="hidden" />

      {/* Core Player Area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden bg-background/90 rounded-xl shadow-inner border border-foreground/10 p-2 mx-2">
        <canvas 
           ref={displayCanvasRef} 
           className="w-full h-full object-contain filter contrast-125 saturate-150 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
        />
      </div>

      <div className="mt-4 flex flex-col items-center justify-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-2 bg-foreground/5 p-1.5 rounded-full border border-foreground/10">
          <button 
            onClick={togglePlayback}
            className="text-[10px] font-mono text-foreground tracking-widest uppercase hover:bg-foreground/10 transition-colors px-4 py-2 rounded-full flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>
          
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-foreground/10 transition-colors text-foreground"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <div className="w-px h-4 bg-foreground/10 mx-1 hidden sm:block" />

          <button
            onClick={() => setDisplayMode(displayMode === "ascii_color" ? "ascii_filled" : "ascii_color")}
            className="text-[10px] font-mono text-foreground hover:bg-foreground/10 transition-colors px-4 py-2 rounded-full flex items-center gap-2"
          >
            {displayMode === "ascii_color" ? "MODE: TEXT" : "MODE: FILLED"}
          </button>

          <div className="w-px h-4 bg-foreground/10 mx-1 hidden sm:block" />
          
          <label className="cursor-pointer text-[10px] font-mono text-foreground hover:bg-foreground/10 transition-colors px-4 py-2 rounded-full flex items-center gap-2">
            <Upload className="w-3 h-3" />
            UPLOAD
            <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
        
        <span className="text-[10px] text-foreground/30 font-mono uppercase tracking-widest text-center opacity-30 hover:opacity-100 transition-opacity pb-2">
          Inspired by <a href="https://github.com/joelibaceta/video-to-ascii" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">joelibaceta</a>
        </span>
      </div>
    </div>
  );
};
