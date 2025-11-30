import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function VideoPlayer({ sources }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [quality, setQuality] = useState("auto");

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,

        preload: "auto",
        responsive: true,
        fill: true,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        userActions: {
          hotkeys: true
        },
        html5: {
          vhs: {
            overrideNative: true,
          },
        },
      });
    }
    console.log(playerRef.current)



  }, []);

  // When quality changes
  useEffect(() => {
    if (!playerRef.current || !sources) return;

    const selectedUrl = sources[quality];
    if (!selectedUrl) return;

    const player = playerRef.current;
    const currentTime = player.currentTime();
    const wasPlaying = !player.paused();

    player.src({
      src: selectedUrl,
      type: "application/x-mpegURL",
    });

    player.one("loadedmetadata", () => {
      player.currentTime(currentTime);
      if (wasPlaying) player.play().catch(() => { });
    });

  }, [quality, JSON.stringify(sources)]);

  if (!sources) return <div className="text-white">No video sources available</div>;



  return (
    <div className="w-full h-full relative group">
      {/* Quality Picker */}
      <select
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
        className="absolute top-4 right-4 z-50 bg-black/70 text-white border border-white/20 backdrop-blur-sm cursor-pointer hover:bg-black/90 transition-colors px-2 py-1 rounded outline-none"
      >
        {Object.keys(sources)
          .filter((q) => sources[q])
          .map((q) => (
            <option key={q} value={q} className="bg-gray-900 text-white">
              {q.toUpperCase()}
            </option>
          ))}
      </select>

      <div data-vjs-player className="w-full h-full">
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered w-full h-full"
          playsInline
        />
      </div>
    </div>
  );
}
