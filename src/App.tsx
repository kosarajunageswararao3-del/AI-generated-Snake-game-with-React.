/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MusicPlayer } from './components/MusicPlayer';
import { SnakeGame } from './components/SnakeGame';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-[#0ff] font-sans selection:bg-[#f0f] selection:text-black overflow-x-hidden relative flex flex-col">
      {/* Visual Glitch FX overlays */}
      <div className="scanlines"></div>
      <div className="absolute inset-0 pattern-bg opacity-40 pointer-events-none z-0"></div>
      
      {/* Top Banner */}
      <div className="w-full border-b-2 border-[#0ff] bg-black/80 flex p-3 justify-between items-center z-10 shadow-[0px_2px_20px_rgba(0,255,255,0.2)]">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-4xl font-bold glitch-text text-[#f0f]" data-text="NEURO_LINK // OS">
            NEURO_LINK // OS
          </h1>
          <p className="text-xs text-[#0ff] opacity-80 mt-1">&gt; ESTABLISHED SYNC WITH SECTOR 7G</p>
        </div>
        <div className="hidden md:block text-[#f0f] text-right text-xs">
          <p>SYS.VER: 4.0.1</p>
          <p className="animate-pulse">&gt; RECORDING...</p>
        </div>
      </div>

      {/* Main Terminal View */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center p-4 md:p-8 gap-8 md:gap-16 relative z-10">
        
        {/* Left column: Info & Audio Tools */}
        <div className="flex flex-col gap-8 w-full max-w-md shrink-0 lg:order-1 order-2">
          
          <div className="border border-[#0ff] p-4 bg-black/60 shadow-[inset_0_0_20px_rgba(0,255,255,0.05)] crt-flicker">
            <h2 className="text-[#f0f] text-xl mb-2">&gt; MISSION_BRIEF</h2>
            <p className="text-sm leading-relaxed text-[#0ff]/80">
              CONSUME DATA PACKETS. EXPAND SERPENT LENGTH. AVOID WALL BOUNDARIES.
              <br /><br />
              AUDIO_TRACKS AUTO-GENERATED VIA ECHO_CHAMBER_AI DO NOT MODIFY STREAM UNLESS AUTHORIZED.
            </p>
          </div>

          <MusicPlayer />
          
        </div>

        {/* Right column: Game Board */}
        <div className="flex-1 flex justify-center items-center w-full lg:order-2 order-1">
          <SnakeGame />
        </div>
        
      </div>
    </div>
  );
}
