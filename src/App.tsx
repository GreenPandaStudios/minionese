import { useState, useEffect } from "react";
import { translate } from "./utils/translator";
import {
  defaultClipboardService,
  defaultSpeechService,
} from "./utils/services";
import type { ClipboardService, SpeechService } from "./utils/services";
import GoggleHeader from "./components/GoggleHeader";
import TranslationPanel from "./components/TranslationPanel";
import DictionaryDrawer from "./components/DictionaryDrawer";
import HistoryPanel from "./components/HistoryPanel";
import type { HistoryItem } from "./components/HistoryPanel";
import StatsPanel from "./components/StatsPanel";
import "./App.css";

interface AppProps {
  clipboardService?: ClipboardService;
  speechService?: SpeechService;
}

function App({
  clipboardService = defaultClipboardService,
  speechService = defaultSpeechService,
}: AppProps) {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [direction, setDirection] = useState<"toMinion" | "toEnglish">("toMinion");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // History & Stats State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [bananaMeter, setBananaMeter] = useState(0);
  const [totalTranslations, setTotalTranslations] = useState(0);

  // Load stats and history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("minionese_history");
      if (savedHistory) setHistory(JSON.parse(savedHistory));

      const savedMeter = localStorage.getItem("minionese_banana_meter");
      if (savedMeter) setBananaMeter(parseInt(savedMeter, 10));

      const savedTotal = localStorage.getItem("minionese_total_translations");
      if (savedTotal) setTotalTranslations(parseInt(savedTotal, 10));
    } catch (e) {
      console.error("Failed to load state from localStorage: ", e);
    }
  }, []);

  // Update translation when source text or direction changes
  useEffect(() => {
    setTargetText(translate(sourceText, direction));
  }, [sourceText, direction]);

  // Debounced effect to save translations to history and update stats
  useEffect(() => {
    if (!sourceText.trim() || !targetText.trim()) return;

    const timer = setTimeout(() => {
      const cleanSource = sourceText.trim();
      
      setHistory((prev) => {
        // Avoid duplicate consecutive entries
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

      // Update stats
      setTotalTranslations((prevTotal) => {
        const updatedTotal = prevTotal + 1;
        localStorage.setItem("minionese_total_translations", updatedTotal.toString());
        return updatedTotal;
      });

      setBananaMeter((prevMeter) => {
        const updatedMeter = prevMeter + cleanSource.length;
        localStorage.setItem("minionese_banana_meter", updatedMeter.toString());
        return updatedMeter;
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [sourceText, targetText, direction]);

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
    setSourceText(targetText);
  };

  const handleSelectHistoryItem = (source: string, dir: "toMinion" | "toEnglish") => {
    setDirection(dir);
    setSourceText(source);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("minionese_history");
  };

  return (
    <main className="app-wrapper">
      <div className="minion-goggle-strap-left"></div>
      <div className="minion-goggle-strap-right"></div>

      <div className="app-container">
        <GoggleHeader />

        <div className="card-body">
          <TranslationPanel
            direction={direction}
            sourceText={sourceText}
            targetText={targetText}
            isSpeaking={isSpeaking}
            onSourceTextChange={setSourceText}
            onClear={handleClear}
            onCopy={handleCopy}
            onSpeak={handleSpeak}
            onDirectionToggle={handleDirectionToggle}
          />

          <DictionaryDrawer
            isOpen={isDrawerOpen}
            onToggleOpen={() => setIsDrawerOpen(!isDrawerOpen)}
          />

          <StatsPanel
            bananaMeter={bananaMeter}
            totalTranslations={totalTranslations}
          />

          <HistoryPanel
            history={history}
            onSelectHistoryItem={handleSelectHistoryItem}
            onClearHistory={handleClearHistory}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
export type { AppProps };
