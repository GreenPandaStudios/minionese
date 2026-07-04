import { useState, useEffect, useRef } from "react";
import { translate, dictionary } from "./utils/translator";
import {
  browserClipboardService,
  browserSpeechService,
} from "./utils/services";
import type { ClipboardService, SpeechService } from "./utils/services";
import "./App.css";

interface AppProps {
  clipboardService?: ClipboardService;
  speechService?: SpeechService;
}

function App({
  clipboardService = browserClipboardService,
  speechService = browserSpeechService,
}: AppProps) {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [direction, setDirection] = useState<"toMinion" | "toEnglish">("toMinion");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Mouse tracking refs for googly eye
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  // Update translation when source text or direction changes
  useEffect(() => {
    setTargetText(translate(sourceText, direction));
  }, [sourceText, direction]);

  // Mouse move listener for the googly eye
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;
      const dx = e.clientX - eyeX;
      const dy = e.clientY - eyeY;
      const angle = Math.atan2(dy, dx);
      // Max displacement inside the eye socket
      const maxDistance = 12;
      const distance = Math.min(Math.hypot(dx, dy) / 10, maxDistance);
      
      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClear = () => {
    setSourceText("");
  };

  const handleCopy = async () => {
    if (!targetText) return;
    try {
      await clipboardService.writeText(targetText);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleSpeak = () => {
    if (!targetText) return;
    
    speechService.cancel();
    
    // Set high pitch and fast rate for Minion voice
    // When translating back to English, let's use a standard pitch/rate
    const pitch = direction === "toMinion" ? 1.7 : 1.0;
    const rate = direction === "toMinion" ? 1.2 : 1.0;

    speechService.speak(targetText, {
      pitch,
      rate,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleDirectionToggle = (newDirection: "toMinion" | "toEnglish") => {
    if (newDirection === direction) return;
    setDirection(newDirection);
    // Swap text inputs
    setSourceText(targetText);
  };

  const filteredDictionary = searchQuery.trim()
    ? dictionary.filter(
        (item) =>
          item.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.min.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : dictionary;

  // Sort dictionary alphabetically by English word
  const sortedDictionary = [...filteredDictionary].sort((a, b) =>
    a.en.localeCompare(b.en)
  );

  return (
    <main className="app-wrapper">
      <div className="minion-goggle-strap-left"></div>
      <div className="minion-goggle-strap-right"></div>
      
      <div className="app-container">
        {/* Minion Eye Goggle Header */}
        <header className="goggle-header">
          <div className="goggle-ring" ref={eyeRef}>
            <div className="eyeball">
              <div
                className="pupil"
                style={{
                  transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                }}
              >
                <div className="pupil-reflection"></div>
              </div>
            </div>
          </div>
          <h1 className="main-title">Bello!</h1>
          <p className="subtitle">Deterministic Minionese Translator</p>
        </header>

        {/* Translation Card */}
        <div className="card-body">
          {/* Direction Toggle */}
          <div className="direction-toggle-container">
            <button
              id="toMinionBtn"
              className={`toggle-tab ${direction === "toMinion" ? "active" : ""}`}
              onClick={() => handleDirectionToggle("toMinion")}
            >
              English → Minion
            </button>
            <button
              id="toEnglishBtn"
              className={`toggle-tab ${direction === "toEnglish" ? "active" : ""}`}
              onClick={() => handleDirectionToggle("toEnglish")}
            >
              Minion → English
            </button>
          </div>

          {/* Input Panel */}
          <div className="panel input-panel">
            <div className="panel-header">
              <label htmlFor="source-input">
                {direction === "toMinion" ? "🇬🇧 English" : "🍌 Minionese"}
              </label>
              <button
                className="action-btn clear-btn"
                onClick={handleClear}
                disabled={!sourceText}
                aria-label="Clear source text"
              >
                🗑️ Clear
              </button>
            </div>
            <textarea
              id="source-input"
              className="translator-textarea"
              placeholder={
                direction === "toMinion"
                  ? "Type English text here..."
                  : "Type Minionese words (e.g. Bello, Poopaye)..."
              }
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
          </div>

          {/* Output Panel */}
          <div className="panel output-panel">
            <div className="panel-header">
              <label htmlFor="target-output">
                {direction === "toMinion" ? "🍌 Minionese" : "🇬🇧 English"}
              </label>
              <div className="action-buttons-group">
                <button
                  className={`action-btn speak-btn ${isSpeaking ? "speaking-active" : ""}`}
                  onClick={handleSpeak}
                  disabled={!targetText}
                  aria-label="Read translation aloud"
                >
                  {isSpeaking ? "🔊 Speaking..." : "📢 Speak"}
                </button>
                <button
                  className="action-btn copy-btn"
                  onClick={handleCopy}
                  disabled={!targetText}
                  aria-label="Copy translation to clipboard"
                >
                  📋 Copy
                </button>
              </div>
            </div>
            <textarea
              id="target-output"
              className="translator-textarea readonly-textarea"
              placeholder="Translation will appear here..."
              value={targetText}
              readOnly
            />
          </div>

          {/* Core Dictionary Drawer */}
          <div className="dictionary-drawer-section">
            <button
              className="drawer-toggle-btn"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-expanded={isDrawerOpen}
            >
              📖 {isDrawerOpen ? "Hide" : "Show"} Core Dictionary ({dictionary.length} words)
            </button>

            {isDrawerOpen && (
              <div className="drawer-panel">
                <input
                  type="text"
                  className="dictionary-search-input"
                  placeholder="🔍 Search words..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <div className="dictionary-grid">
                  {sortedDictionary.length > 0 ? (
                    sortedDictionary.map((item, idx) => (
                      <div className="dict-row" key={idx}>
                        <span className="dict-en">{item.en}</span>
                        <span className="dict-arrow">→</span>
                        <span className="dict-min">{item.min}</span>
                      </div>
                    ))
                  ) : (
                    <div className="dict-no-results">No matches found for "{searchQuery}"</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
