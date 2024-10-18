import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const RossowRadioApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const tracks = [
    { title: "Track 1", duration: "3:45" },
    { title: "Track 2", duration: "4:12" },
    { title: "Track 3", duration: "3:30" },
    { title: "Track 4", duration: "5:01" },
  ];

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => setCurrentTrack((prev) => (prev + 1) % tracks.length);
  const prevTrack = () => setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Rossow Radio</h1>
      </header>
      
      <main className="flex-grow">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-2">Top Songs</h2>
            <ul>
              {tracks.map((track, index) => (
                <li key={index} className={`p-2 ${index === currentTrack ? 'bg-gray-700' : ''}`}>
                  {track.title} - {track.duration}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">YouTube Channel</h2>
            <button className="bg-red-600 text-white px-4 py-2 rounded">
              Visit Channel
            </button>
          </div>
        </div>
      </main>
      
      <footer className="mt-4">
        <div className="flex items-center justify-center space-x-4">
          <button onClick={prevTrack}><SkipBack /></button>
          <button onClick={togglePlay}>
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button onClick={nextTrack}><SkipForward /></button>
        </div>
        <div className="mt-2 text-center">
          Now Playing: {tracks[currentTrack].title}
        </div>
      </footer>
    </div>
  );
};

export default RossowRadioApp;
