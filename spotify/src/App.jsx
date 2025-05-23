import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import SearchView from './views/SearchView';
import ArtistDetailView from './views/ArtistDetailView';
import AlbumDetailView from './views/AlbumDetailView';
import SpotifyService from './services/SpotifyService';
import './App.css';

function App() {
  useEffect(() => {
    const initializeSpotify = async () => {
      await SpotifyService.initialize();
    };
    initializeSpotify();
  }, []);

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchView />} />
          <Route path="/search" element={<SearchView />} />
          <Route path="/artist/:id" element={<ArtistDetailView />} />
          <Route path="/album/:id" element={<AlbumDetailView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;