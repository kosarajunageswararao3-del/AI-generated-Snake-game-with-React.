import { useState, useRef, useEffect } from 'react';

const TRACKS = [
  { id: '1', title: "// NEURO_DRONE_01.SYS", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { id: '2', title: "// CYBER_PULSE_02.SYS", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
  { id: '3', title: "// VOID_AMBIENCE_03.SYS", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" }
];

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.4);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(err => {
        console.error("AUDIO_SUBSYSTEM_FAIL: ", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const skipNext = () => setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
  const skipPrev = () => setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);

  return (
    <div className="border-2 border-[#f0f] p-4 bg-black/80 w-full max-w-md shadow-[0_0_20px_rgba(255,0,255,0.4)] relative">
      {/* Glitch UI Box */}
      <div className="absolute top-0 right-0 -mt-[14px] bg-black border border-[#f0f] px-2 text-[#f0f] text-xs">
        MOD: AUDIO
      </div>

      <h3 className="text-[#f0f] text-xl mb-3 border-b border-[#0ff] pb-1 glitch-text" data-text="AUDIO_SUBSYSTEM">
        AUDIO_SUBSYSTEM
      </h3>
      
      <div className="flex justify-between items-center mb-4 min-h-[30px]">
        <p className="text-[#0ff] text-base">
          <span className="mr-2 animate-pulse">&gt;</span>
          {TRACKS[currentTrack].title}
        </p>
        <span className="text-sm text-[#0ff]/60">
          [{currentTrack + 1}/{TRACKS.length}]
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#111] h-3 mb-6 border border-[#f0f]/50 relative overflow-hidden">
        <div
          className="h-full bg-[#0ff] shadow-[0_0_10px_#0ff] transition-all duration-300 ease-linear"
          style={{ width: `${progress || 0}%` }}
        />
      </div>

      <div className="flex justify-between items-center gap-3">
        <button
          onClick={skipPrev}
          className="flex-1 py-1 px-2 border border-[#0ff] text-[#0ff] hover:bg-[#0ff] hover:text-black hover:shadow-[0_0_15px_#0ff] transition-all text-sm uppercase"
        >
          &lt;&lt; PREV
        </button>
        <button
          onClick={togglePlay}
          className="flex-1 py-2 px-2 border-2 border-[#f0f] text-[#f0f] hover:bg-[#f0f] hover:text-black hover:shadow-[0_0_15px_#f0f] transition-all font-bold tracking-widest text-lg uppercase focus:outline-none"
        >
          {isPlaying ? 'HALT' : 'EXECUTE'}
        </button>
        <button
          onClick={skipNext}
          className="flex-1 py-1 px-2 border border-[#0ff] text-[#0ff] hover:bg-[#0ff] hover:text-black hover:shadow-[0_0_15px_#0ff] transition-all text-sm uppercase"
        >
          NEXT &gt;&gt;
        </button>
      </div>

      <audio
        ref={audioRef}
        src={TRACKS[currentTrack].url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipNext}
        loop={false}
      />
    </div>
  );
}
