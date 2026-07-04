import { useState, useEffect } from "react";
import type { HistoryItem } from "../components/HistoryPanel";

/**
 * Custom hook to manage translator history and usage stats synced with localStorage.
 */
export function useHistoryAndStats(
  sourceText: string,
  targetText: string,
  direction: "toMinion" | "toEnglish"
) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [bananaMeter, setBananaMeter] = useState(0);
  const [totalTranslations, setTotalTranslations] = useState(0);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("minionese_history");
      if (savedHistory) setHistory(JSON.parse(savedHistory));

      const savedMeter = localStorage.getItem("minionese_banana_meter");
      if (savedMeter) setBananaMeter(parseInt(savedMeter, 10));

      const savedTotal = localStorage.getItem("minionese_total_translations");
      if (savedTotal) setTotalTranslations(parseInt(savedTotal, 10));
    } catch (e) {
      console.error("Failed to load history/stats from localStorage:", e);
    }
  }, []);

  useEffect(() => {
    if (!sourceText.trim() || !targetText.trim()) return;

    const timer = setTimeout(() => {
      const cleanSource = sourceText.trim();
      setHistory((prev) => {
        if (prev.length > 0 && prev[0].source.toLowerCase() === cleanSource.toLowerCase()) {
          return prev;
        }
        const newItem: HistoryItem = {
          id: Math.random().toString(36).substring(2, 11),
          source: cleanSource,
          target: targetText,
          direction,
        };
        const updated = [newItem, ...prev].slice(0, 5);
        localStorage.setItem("minionese_history", JSON.stringify(updated));
        return updated;
      });

      setTotalTranslations((prev) => {
        const nextVal = prev + 1;
        localStorage.setItem("minionese_total_translations", nextVal.toString());
        return nextVal;
      });

      setBananaMeter((prev) => {
        const nextVal = prev + cleanSource.length;
        localStorage.setItem("minionese_banana_meter", nextVal.toString());
        return nextVal;
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [sourceText, targetText, direction]);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("minionese_history");
  };

  return {
    history,
    bananaMeter,
    totalTranslations,
    setHistory,
    clearHistory,
  };
}
