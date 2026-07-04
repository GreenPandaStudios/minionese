import { Trash2, Copy, Volume2, Share2 } from "lucide-react";

interface TranslationPanelProps {
  direction: "toMinion" | "toEnglish";
  sourceText: string;
  targetText: string;
  isSpeaking: boolean;
  shareSuccess: boolean;
  onSourceTextChange: (text: string) => void;
  onClear: () => void;
  onCopy: () => void;
  onSpeak: () => void;
  onShare: () => void;
  onDirectionToggle: (newDir: "toMinion" | "toEnglish") => void;
}

export function TranslationPanel({
  direction,
  sourceText,
  targetText,
  isSpeaking,
  shareSuccess,
  onSourceTextChange,
  onClear,
  onCopy,
  onSpeak,
  onShare,
  onDirectionToggle,
}: TranslationPanelProps) {
  return (
    <>
      {/* Direction Toggle */}
      <div className="direction-toggle-container">
        <button
          id="toMinionBtn"
          className={`toggle-tab ${direction === "toMinion" ? "active" : ""}`}
          onClick={() => onDirectionToggle("toMinion")}
        >
          English → Minion
        </button>
        <button
          id="toEnglishBtn"
          className={`toggle-tab ${direction === "toEnglish" ? "active" : ""}`}
          onClick={() => onDirectionToggle("toEnglish")}
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
            onClick={onClear}
            disabled={!sourceText}
            aria-label="Clear source text"
          >
            <Trash2 size={14} /> Clear
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
          onChange={(e) => onSourceTextChange(e.target.value)}
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
              onClick={onSpeak}
              disabled={!targetText}
              aria-label="Read translation aloud"
            >
              <Volume2 size={14} /> {isSpeaking ? "Speaking..." : "Speak"}
            </button>
            <button
              className="action-btn copy-btn"
              onClick={onCopy}
              disabled={!targetText}
              aria-label="Copy translation to clipboard"
            >
              <Copy size={14} /> Copy
            </button>
            <button
              className={`action-btn share-btn ${shareSuccess ? "share-active" : ""}`}
              onClick={onShare}
              disabled={!targetText}
              aria-label="Share translation link"
            >
              <Share2 size={14} /> {shareSuccess ? "Shared!" : "Share"}
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
    </>
  );
}

export default TranslationPanel;
