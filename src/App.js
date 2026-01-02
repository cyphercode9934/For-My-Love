import { useState, useEffect, useRef } from "react";
import "./App.css";
import mutedIcon from "./assets/muted-icon.png";
import unmutedIcon from "./assets/unmuted-icon.png";
import envelopeOpenBack from "./assets/envelope-open-back.png";
import envelopeOpenFront from "./assets/envelope-open-front.png";
import envelopeClosed from "./assets/envelope-closed.png";
import homeIcon from "./assets/home-icon.png";
import lettersIcon from "./assets/letters-icon.png";
import giftsIcon from "./assets/gifts-icon.png";
import musicIcon from "./assets/music-icon2.png";
import welcome from "./assets/welcome-sign.png";
import sorryGifts from "./assets/sorry-gifts.gif";
import bgMusicFile from "./assets/memories.mp3";

// music
import ThoseEyes from "./assets/music/pics/ThoseEyes.png";
import ThoseEyesAudio from "./assets/music/audio/ThoseEyes.mp3";
import ATaleOfUs from "./assets/music/pics/ATaleOfUs.png";
import ATaleOfUsAudio from "./assets/music/audio/ATaleOfUs.mp3";
import LittleBitMore from "./assets/music/pics/LittleBitMore.png";
import LittleBitMoreAudio from "./assets/music/audio/LittleBitMore.mp3";
import Palagi from "./assets/music/pics/Palagi.png";
import PalagiAudio from "./assets/music/audio/Palagi.mp3";
import TangingIkaw from "./assets/music/pics/TangingIkaw.png";
import TangingIkawAudio from "./assets/music/audio/TangingIkaw.mp3";
import WearMeOut from "./assets/music/pics/WearMeOut.png";
import WearMeOutAudio from "./assets/music/audio/WearMeOut.mp3";

// Music I Use: Bensound.com/royalty-free-music. License code: SSMVMCOQWT7PW1D6. Artist: : Benjamin Tissot

function App() {
  const [page, setPage] = useState("home");
  const [muted, setMuted] = useState(true);

  const [currentSong, setCurrentSong] = useState(null);
  const [songPlaying, setSongPlaying] = useState(false);

  return (
    <div>
      <div className="background" />

      {/* background music */}
      <BackgroundMusic muted={muted} setMuted={setMuted} songPlaying={songPlaying} />

      {page !== "home" && (<Navbar page={page} setPage={setPage} />)}

      <main className="content">
        {page === "home" && <Home setPage={setPage} />}
        {page === "letters" && <Letters />}
        {page === "gifts" && <Gifts />}
        {page === "music" && <Music
            setBgMuted={setMuted}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            songPlaying={songPlaying}
            setSongPlaying={setSongPlaying} />}
      </main>
    </div>
  );
}

function Navbar({ page, setPage }) {
  return (
    <nav className="navbar">
      <img
        src={homeIcon}
        alt="home"
        className="home-icon"
        onClick={() => setPage("home")}
      />

      <div className="navLinks">
        <button className={page === "letters" ? "active" : ""} onClick={() => setPage("letters")}>
          <img src={lettersIcon} alt="letters" className="lettersIcon"/>
          Letters
        </button>
        <button className={page === "gifts" ? "active" : ""} onClick={() => setPage("gifts")}>
          <img src={giftsIcon} alt="gifts" className="giftsIcon"/>
          Gifts
        </button>
        <button className={page === "music" ? "active" : ""} onClick={() => setPage("music")}>
          <img src={musicIcon} alt="music" className="musicIcon"/>
          Music
        </button>
      </div>
    </nav>
  );
}

function Home({ setPage }){
  return (
    <div className="page home">
      <h1>Hi my baby</h1>
      <img src={welcome} alt="welcome" className="welcomeSign"/>

      <div className="homeNav">
        <button onClick={() => setPage("letters")}>
          {/* <a href="https://www.flaticon.com/free-icons/envelope" title="envelope icons"></a> */}
          <img src={lettersIcon} alt="letters" className="lettersIcon"/>
          Letters
        </button>
        <button onClick={() => setPage("gifts")}>
          {/* <a href="https://www.flaticon.com/free-icons/gift" title="gift icons"></a> */}
          <img src={giftsIcon} alt="gifts" className="giftsIcon"/>
          Gifts
        </button>
        <button onClick={() => setPage("music")}>
          {/* <a href="https://www.flaticon.com/free-icons/musical-note" title="musical note icons"></a> */}
          <img src={musicIcon} alt="music" className="musicIcon"/>
          Music
        </button>
      </div>
    </div>
  );
}

function Letters(){
  const [stage, setStage] = useState(0);

  const openEnvelope = () => {
    if (stage !== 0) return;

    setStage(0.5);                        // envelope dip
    setTimeout(() => setStage(1), 400);   // open envelope
    setTimeout(() => setStage(2), 800);   // pull paper
    setTimeout(() => setStage(3), 1400);  // dip paper
    setTimeout(() => setStage(4), 2400);  // open paper
    setTimeout(() => setStage(5), 2800);  // enlarge paper
    setTimeout(() => setStage(6), 3000);  // envelope disappear
  };

  const closeEnvelope = () => {
    if (stage !== 6) return;

    setStage(4.5);
    setTimeout(() => setStage(3.5), 600);   // paper closes
    setTimeout(() => setStage(2.5), 1000);  // paper about to be in
    setTimeout(() => setStage(1), 1700);  // paper in envelope
    setTimeout(() => setStage(0.5), 2200);  // close envelope
    setTimeout(() => setStage(0), 2400);  // back to start
  };

  return (
    <div className="page letters-page">
      <div className="letter-stage">

        {/* CLOSED ENVELOPE
        {stage === 0 && (
          <img
            src={envelopeClosed}
            className="envelope-closed"
            onClick={openEnvelope}
          />
        )} */}

        {stage <= 0.5 && (
          <img
            src={envelopeClosed}
            className={`envelope-closed ${stage === 0.5 ? "dip" : ""}`}
            onClick={openEnvelope}
          />
        )}

        {/* OPEN ENVELOPE */}
        {stage >= 1 && stage < 6 && (
          <div className="envelope">
            <img src={envelopeOpenBack} className="envelope-back" />
            <img src={envelopeOpenFront} className="envelope-front" />
          </div>
        )}

        {/* PAPER */}
        {stage >= 1 && (
          <div
            className={`paper
              ${stage === 1 ? "peek" : ""}
              ${stage === 2 ? "pull" : ""}
              ${stage === 2.5 ? "push" : ""}
              ${stage === 3 ? "dip" : ""}
              ${stage === 3.5 ? "close" : ""}
              ${stage === 4 ? "open" : ""}
              ${stage === 4.5 ? "shrink" : ""}
              ${stage >= 5 ? "full" : ""}
            `}
          >
            <div className="paper-content">
              {stage < 4 ? (
                <div className="paperPreviewContent">
                  <p className="paper-preview-text">
                    For my baby 💌
                  </p>
                </div>
              ) : (
                <p className="paper-full-text">
                  Hi baby &lt;3<br />
                  Happy New Year 🎉<br /><br />
                  We say it a lot but I really wanna let you know how grateful I am that you came into my life and that our worlds collided last year. In truth, it wasn't only after we've gotten together that you changed my life. As a friend, you were as loving, caring, kind, patient, gentle, and warm. It's impossible not to love you. Thank you for the friendship and love you embraced me with last year.<br /><br />
                  The previous year may not have been so gentle, and there's no guarantee this year will be as well, but because of that, for this year, and subsequent years to come, I hope you always take care of yourself and try to enjoy life, and if it gets too much, I'm here always.<br /><br />
                  We may not be spending Christmas or New Year's physically together, but I hope you still feel me with you despite the distance, because you own my heart even from miles away.<br /><br />
                  I love you always, my baby🩵🩷
                </p>
              )}
            </div>
          </div>
        )}

        {/* RESEAL BUTTON */}
        {stage >= 6 && (
          <button className="reseal-btn" onClick={closeEnvelope}>
            Reseal 💕
          </button>
        )}

      </div>
    </div>
  );
}

function Gifts(){
  return (
    <div className="page">
      <p>Coming soon…<br></br>sorry wala pa po :&#40;</p>
      <img src={sorryGifts} alt="sorry" className="sorryGifts"/>
    </div>
  );
}

const songs = [
  {
    id: 1,
    title: "Those Eyes",
    artist: "New West",
    file: ThoseEyesAudio,
    image: ThoseEyes
  },
  {
    id: 2,
    title: "A Tale of Us",
    artist: "Huni",
    file: ATaleOfUsAudio,
    image: ATaleOfUs
  },
  {
    id: 3,
    title: "Little Bit More",
    artist: "Suriel Hess",
    file: LittleBitMoreAudio,
    image: LittleBitMore
  },
  {
    id: 4,
    title: "Palagi",
    artist: "sunburn!",
    file: PalagiAudio,
    image: Palagi
  },
  {
    id: 5,
    title: "Tanging Ikaw",
    artist: "Sugarcane",
    file: TangingIkawAudio,
    image: TangingIkaw
  },
  {
    id: 6,
    title: "Wear Me Out",
    artist: "Gamma Skies ft. Lola Are",
    file: WearMeOutAudio,
    image: WearMeOut
  },
];

function Music({setBgMuted, currentSong, setCurrentSong, songPlaying, setSongPlaying}){
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);
  
  // When song starts → mute background music forever until user clicks
  useEffect(() => {
    if (songPlaying) setBgMuted(true);
  }, [songPlaying]);

  // Load & play new song
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    audioRef.current.volume = 0.5;

    audioRef.current.src = currentSong.file;
    audioRef.current.load();
    setSongPlaying(false);
  }, [currentSong]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      setSongPlaying(false);
      setCurrentSong(null);
      setProgress(0);
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current || !currentSong) return;

    try {
      if (songPlaying) {
        audioRef.current.pause();
        setSongPlaying(false);
      } else {
        await audioRef.current.play();
        setSongPlaying(true);
      }
    } catch (err) {
      console.warn("Play blocked:", err);
    }
  };

  const selectAndPlaySong = async (song) => {
    setCurrentSong(song);

    // wait for React to update currentSong & audio src
    setTimeout(async () => {
      if (!audioRef.current) return;

      try {
        await audioRef.current.play();
        setSongPlaying(true);
      } catch (err) {
        console.warn("Autoplay blocked:", err);
      }
    }, 0);
  };

  return (
    <div className="page music-page">
      <h1>Songs with lyrics that remind me of you &lt;3</h1>
      {/* PLAYER */}
      <div className="music-player">
        <p className="song-title">
          {currentSong
            ? `${currentSong.title} — ${currentSong.artist}`
            : "Click on any of them to listen"}
        </p>

        <div className="playerControls">
          {currentSong && (
            <input
              type="range"
              ref={progressRef}
              className="progress-bar"
              min="0"
              max="100"
              value={progress || 0}
              onChange={e => {
                const t =
                  (e.target.value / 100) * audioRef.current.duration;
                audioRef.current.currentTime = t;
              }}
            />
          )}

          <button className="togglePlayButton" onClick={togglePlay}>
            {songPlaying ? "❚❚" : "▶"}
          </button>
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={() => {
            const audio = audioRef.current;
            if (!audio || !audio.duration) return;

            const p = (audio.currentTime / audio.duration) * 100;
            setProgress(p);

            if (progressRef.current) {
              progressRef.current.style.setProperty("--progress", `${p}%`);
            }
          }}
          onEnded={() => setSongPlaying(false)}
        />
      </div>

      {/* LYRIC IMAGES */}
      <div className="lyrics-area">
        {songs.map(song => (
          <img
            key={song.id}
            src={song.image}
            className={`lyric-img ${
              currentSong?.id === song.id ? "active" : ""
            }`}
            onClick={() => selectAndPlaySong(song)}
          />
        ))}
      </div>
    </div>
  );
}

function BackgroundMusic({ muted, setMuted, songPlaying }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (muted || songPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  }, [muted, songPlaying]);

  return (
    <div>
      <audio ref={audioRef} src={bgMusicFile} loop />

      <button className="muteButton" onClick={() => setMuted(m => !m)}>
        {muted ? (
          // <a href="https://www.flaticon.com/free-icons/google-play-music" title="google play music icons"></a>
          <img src={mutedIcon} className="mutedIcon" />
        ) : (
          <img src={unmutedIcon} className="unmutedIcon" />
        )}
      </button>
    </div>
  );
}

export default App;