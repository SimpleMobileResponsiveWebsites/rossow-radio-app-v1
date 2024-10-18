import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, ShoppingCart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const RossowRadioApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [cart, setCart] = useState([]);

  const tracks = [
    { id: 1, title: "Track 1", duration: "3:45", price: 0.99 },
    { id: 2, title: "Track 2", duration: "4:12", price: 0.99 },
    { id: 3, title: "Track 3", duration: "3:30", price: 0.99 },
    { id: 4, title: "Track 4", duration: "5:01", price: 0.99 },
  ];

  const albums = [
    { id: 1, title: "Album 1", price: 9.99, cover: "/api/placeholder/200/200" },
    { id: 2, title: "Album 2", price: 9.99, cover: "/api/placeholder/200/200" },
  ];

  const shows = [
    { id: 1, title: "Live in New York", date: "2024-12-15", price: 50 },
    { id: 2, title: "Los Angeles Concert", date: "2025-01-20", price: 55 },
  ];

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => setCurrentTrack((prev) => (prev + 1) % tracks.length);
  const prevTrack = () => setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <header className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Rossow Radio</h1>
        <Button variant="outline" size="icon">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Cart</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cart.length}
          </span>
        </Button>
      </header>
      
      <main className="flex-grow">
        <Tabs defaultValue="music" className="w-full">
          <TabsList>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="tickets">Show Tickets</TabsTrigger>
          </TabsList>
          <TabsContent value="music">
            <ul>
              {tracks.map((track, index) => (
                <li key={index} className={`p-2 flex justify-between items-center ${index === currentTrack ? 'bg-gray-700' : ''}`}>
                  <span>{track.title} - {track.duration}</span>
                  <Button onClick={() => addToCart({ ...track, type: 'song' })}>
                    Buy ${track.price}
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="albums">
            <div className="grid grid-cols-2 gap-4">
              {albums.map((album) => (
                <Card key={album.id}>
                  <CardHeader>
                    <CardTitle>{album.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src={album.cover} alt={album.title} className="w-full h-auto" />
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => addToCart({ ...album, type: 'album' })}>
                      Buy ${album.price}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="tickets">
            <ul>
              {shows.map((show) => (
                <li key={show.id} className="p-2 flex justify-between items-center">
                  <span>{show.title} - {show.date}</span>
                  <Button onClick={() => addToCart({ ...show, type: 'ticket' })}>
                    Buy Ticket ${show.price}
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
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
