import { Languages, Flame } from "lucide-react";

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
      <h3 className="stats-header-title">📊 Translation Stats</h3>
      <div className="stats-grid">
        <div className="stats-card">
          <Languages className="stats-icon" size={18} />
          <span className="stats-value">{totalTranslations}</span>
          <span className="stats-label">Translations Made</span>
          <span className="stats-desc">Total phrases translated</span>
        </div>
        <div className="stats-card">
          <Flame className="stats-icon text-yellow" size={18} />
          <span className="stats-value">🍌 {bananaMeter} chars</span>
          <span className="stats-label">Banana Power</span>
          <span className="stats-desc">Total characters processed</span>
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
