import { useState } from "react";
import { BookOpen } from "lucide-react";
import { dictionary } from "../utils/translator";

interface DictionaryDrawerProps {
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function DictionaryDrawer({ isOpen, onToggleOpen }: DictionaryDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDictionary = searchQuery.trim()
    ? dictionary.filter(
        (item) =>
          item.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.min.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : dictionary;

  const sortedDictionary = [...filteredDictionary].sort((a, b) =>
    a.en.localeCompare(b.en)
  );

  return (
    <div className="dictionary-drawer-section">
      <button
        className="drawer-toggle-btn"
        onClick={onToggleOpen}
        aria-expanded={isOpen}
      >
        <BookOpen size={16} /> {isOpen ? "Hide" : "Show"} Core Dictionary ({dictionary.length} words)
      </button>

      {isOpen && (
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
  );
}

export default DictionaryDrawer;
