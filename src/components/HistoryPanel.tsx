export interface HistoryItem {
  id: string;
  source: string;
  target: string;
  direction: "toMinion" | "toEnglish";
}

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelectHistoryItem: (source: string, direction: "toMinion" | "toEnglish") => void;
  onClearHistory: () => void;
}

export function HistoryPanel({
  history,
  onSelectHistoryItem,
  onClearHistory,
}: HistoryPanelProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="history-section">
      <div className="history-header">
        <h3>🕰️ Recent Translations</h3>
        <button className="history-clear-btn" onClick={onClearHistory}>
          Clear All
        </button>
      </div>
      <div className="history-list">
        {history.map((item) => (
          <div
            key={item.id}
            className="history-item"
            onClick={() => onSelectHistoryItem(item.source, item.direction)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") onSelectHistoryItem(item.source, item.direction);
            }}
          >
            <div className="history-direction">
              {item.direction === "toMinion" ? "🇬🇧 → 🍌" : "🍌 → 🇬🇧"}
            </div>
            <div className="history-texts">
              <div className="history-source">{item.source}</div>
              <div className="history-target">{item.target}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryPanel;
