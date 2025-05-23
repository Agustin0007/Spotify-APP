import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoHeart, IoHeartOutline, IoArrowBack } from 'react-icons/io5';
import SpotifyService from '../services/SpotifyService';
import AlbumCard from '../components/AlbumCard/AlbumCard';
import '../styles/ArtistDetailView.css';

function ArtistDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const credentials = JSON.parse(localStorage.getItem('spotifyCredentials'));
        const artistData = await SpotifyService.getArtist(id, credentials.token);
        const albumsData = await SpotifyService.getArtistAlbums(id, credentials.token);
        
        setArtist(artistData);
        setAlbums(albumsData);
        setIsFavorite(SpotifyService.isFavoriteArtist(id));
        setError('');
      } catch (err) {
        setError('Error al cargar la información del artista');
      }
    };

    fetchArtistData();
  }, [id]);

  const handleFavoriteClick = () => {
    if (artist) {
      SpotifyService.toggleFavoriteArtist(artist);
      setIsFavorite(!isFavorite);
    }
  };

  if (error) return <div className="error-message">{error}</div>;
  if (!artist) return <div className="loading">Cargando...</div>;

  return (
    <div className="detail-container">
      <button className="back-button" onClick={() => navigate('/search')}>
        <IoArrowBack size={20} />
        Volver
      </button>

      <div className="artist-header">
        <div className="artist-profile">
          <img 
            className="artist-image"
            src={artist.images[0]?.url || 'https://via.placeholder.com/200'} 
            alt={artist.name} 
          />
          <div className="artist-info">
            <h1>{artist.name}</h1>
            <button 
              className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? <IoHeart size={24} /> : <IoHeartOutline size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2 className="section-title">Álbumes</h2>
        <div className="albums-grid">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtistDetailView;