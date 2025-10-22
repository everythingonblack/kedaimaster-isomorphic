import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

// --- DUMMY DATA (can be replaced with props or API calls) ---
const initialCurrentTrack = {
    title: 'Killer Queen',
    artist: 'Queen',
    duration: '3:00',
    artwork: 'https://upload.wikimedia.org/wikipedia/en/a/af/Killer3cdfront.JPG'
};

const initialPlaylist = [
    { id: 'pl-1', title: 'A Kind Of Magic', artist: 'Queen', duration: '4:25', artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOgj9RGyEcSq3wDlCyDjhxIWbacy11T0-Oqg&s' },
    { id: 'pl-2', title: 'Caribbean Queen', artist: 'Billy Ocean', duration: '7:56', artwork: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Billy_Ocean_Caribbean_Queen.jpg' },
    { id: 'pl-3', title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55', artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShkrMZg51reES4nXPTXDve_ja8sA9JElRvcw&s' },
    { id: 'pl-4', title: 'Dancing Queen', artist: 'ABBA', duration: '3:51', artwork: 'https://images.genius.com/ca44cb452ad50cf3e47a1c3ad30ebb15.600x600x1.jpg' }
];

// --- DUMMY BACKEND FUNCTIONS ---
function dummyVoteDownBackend(song) {
    console.log(`[VOTE DOWN] Calling backend for song: "${song.title}" by ${song.artist}`);
    // In a real app, this might be:
    // fetch(`/api/vote-down/${song.id}`, { method: 'POST' });
    alert(`You voted DOWN "${song.title}"`);
}

function dummySelectSongBackend(song, action) {
    console.log(`[SELECT SONG - ${action}] Calling backend for song: "${song.title}" by ${song.artist}`);
    // In a real app, this might be:
    // fetch(`/api/add-to-queue/${song.id}`, { method: 'POST' });
    alert(`You selected "${song.title}" with action: ${action}`);
}


/**
 * SongItem Component
 * Renders a single song and encapsulates the complex swipe interaction logic.
 */
const SongItem = ({ song, context }) => {
    const itemRef = useRef(null);
    const rightBgRef = useRef(null);
    const leftBgRef = useRef(null);
    const dragState = useRef({
        isDragging: false,
        startX: 0,
        currentX: 0,
        diffX: 0
    });

    const dragStart = (e) => {
        dragState.current.startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        dragState.current.isDragging = true;
        itemRef.current.style.transition = 'none';
        itemRef.current.style.cursor = 'grabbing';

        document.addEventListener('mousemove', dragging);
        document.addEventListener('touchmove', dragging, { passive: false });
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
    };

    const dragging = (e) => {
        if (!dragState.current.isDragging) return;
        e.preventDefault();
        dragState.current.currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        dragState.current.diffX = dragState.current.currentX - dragState.current.startX;

        const limitedDiffX = Math.max(-150, Math.min(150, dragState.current.diffX));
        itemRef.current.style.transform = `translateX(${limitedDiffX}px)`;

        const swipePercentage = Math.min(1, Math.abs(limitedDiffX) / 150);

        if (limitedDiffX > 0) {
            rightBgRef.current.style.opacity = swipePercentage;
            leftBgRef.current.style.opacity = 0;
        } else {
            leftBgRef.current.style.opacity = swipePercentage;
            rightBgRef.current.style.opacity = 0;
        }
    };

    const dragEnd = () => {
        if (!dragState.current.isDragging) return;
        dragState.current.isDragging = false;

        itemRef.current.style.transition = 'transform 0.3s ease';
        itemRef.current.style.cursor = 'grab';

        document.removeEventListener('mousemove', dragging);
        document.removeEventListener('touchmove', dragging);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchend', dragEnd);

        const threshold = itemRef.current.offsetWidth * 0.4;

        if (dragState.current.diffX > threshold) {
            if (context === 'search') {
                dummySelectSongBackend(song, 'VOTE-UP / ADD');
            }
        } else if (dragState.current.diffX < -threshold) {
            if (context === 'playlist') {
                dummyVoteDownBackend(song);
            } else if (context === 'search') {
                dummySelectSongBackend(song, 'VOTE-DOWN / DONT ADD');
            }
        }

        dragState.current.diffX = 0;
        itemRef.current.style.transform = 'translateX(0)';
        rightBgRef.current.style.opacity = 0;
        leftBgRef.current.style.opacity = 0;
    };

    return (
        <li
            ref={itemRef}
            className="song-item"
            onMouseDown={dragStart}
            onTouchStart={dragStart}
        >
            <img src={song.artwork} alt="Album Art" className="album-art" />
            <div className="song-details">
                <span className="song-title">{song.title}</span>
                <span className="song-artist">{song.artist}</span>
            </div>
            <span className="song-duration">{song.duration}</span>
            <div ref={rightBgRef} className="swipe-right-bg"></div>
            <div ref={leftBgRef} className="swipe-left-bg"></div>
        </li>
    );
};


/**
 * MusicPlayer Component
 * The main component that manages the UI state and renders the player.
 */
const MusicPlayer = () => {
    // State for the UI view ('waiting' or 'player')
    const [view, setView] = useState('waiting');
    // State for the player's expanded queue view
    const [isQueueExpanded, setIsQueueExpanded] = useState(false);
    // State for the search input
    const [searchTerm, setSearchTerm] = useState('');

    // Static data, could be replaced by props
    const currentTrack = initialCurrentTrack;
    const playlist = initialPlaylist;

    const handleHeaderClick = () => {
        // Before returning to waiting view, close queue and clear search
        if (isQueueExpanded) {
            setIsQueueExpanded(false);
            setSearchTerm('');
        }
        setView('waiting');
    };
    
    const handleToggleQueue = () => {
        const newState = !isQueueExpanded;
        setIsQueueExpanded(newState);
        // If we are closing the queue, also clear the search term
        if (!newState) {
            setSearchTerm('');
        }
    };

    const filteredSongs = searchTerm
        ? playlist.filter(song =>
            song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];
    
    // Dynamically create class names based on state
    const playerBodyClasses = [
        'player-body',
        isQueueExpanded ? 'expanded' : '',
        searchTerm ? 'searching' : ''
    ].join(' ').trim();
    
    const playerFooterClasses = [
        'player-footer',
        isQueueExpanded ? 'expanded' : ''
    ].join(' ').trim();


    return (
        <div className="music-bar">
            {view === 'waiting' && (
                <div className="state-1" onClick={() => setView('player')}>
                    Menunggu musik favoritmu
                </div>
            )}

            {view === 'player' && (
                <div className="state-2">
                    <div
                        className="player-header"
                        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${currentTrack.artwork}')` }}
                        onClick={handleHeaderClick}
                    >
                        <div className="song-info">
                            <p className="song-title">{currentTrack.title}</p>
                            <p className="song-artist">{currentTrack.artist}</p>
                        </div>
                    </div>
                    
                    <div className={playerBodyClasses}>
                        <div className="player-search">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Lagu apa yang kamu cari?"
                            />
                        </div>
                        <div className="swipe-container">
                            <span className="swipe-text left">swipe kanan untuk vote up</span>
                            <span className="swipe-text right">swipe kiri untuk vote down</span>
                            
                            
                            <div className="swipe-indicator"></div>
                        </div>

                        <div className="player-playlist">
                             <ul className="song-list">
                                {playlist.map(song => (
                                    <SongItem key={song.id} song={song} context="playlist" />
                                ))}
                            </ul>
                        </div>
                        
                        <div className="search-results">
                             {searchTerm && (
                                <ul className="song-list">
                                    {filteredSongs.length > 0 ? (
                                        filteredSongs.map(song => (
                                            <SongItem key={song.id} song={song} context="search" />
                                        ))
                                    ) : (
                                        <p style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                            Tidak ada hasil ditemukan.
                                        </p>
                                    )}
                                </ul>
                            )}
                        </div>

                    </div>
                    
                    <div className={playerFooterClasses} onClick={handleToggleQueue}>
                        {isQueueExpanded ? 'Sembunyikan antrian' : 'Lihat antrian musik'}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;
