interface StatsPanelProps {
  bananaMeter: number;
  totalTranslations: number;
}

export function StatsPanel({ bananaMeter, totalTranslations }: StatsPanelProps) {
  if (totalTranslations === 0) {
    return null;
  }

  return (
    <div className="stats-section">
      <div className="stats-grid">
        <div className="stats-card">
          <span className="stats-value">{totalTranslations}</span>
          <span className="stats-label">Total Translates</span>
        </div>
        <div className="stats-card">
          <span className="stats-value">🍌 {bananaMeter}m</span>
          <span className="stats-label">Banana-meter</span>
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
