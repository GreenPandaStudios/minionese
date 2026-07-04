import { useState, useEffect } from "react";
import { translate } from "./utils/translator";
import {
  defaultClipboardService,
  defaultSpeechService,
  defaultShareService,
} from "./utils/services";
import type { ClipboardService, SpeechService, ShareService } from "./utils/services";
import { useHistoryAndStats } from "./hooks/useHistoryAndStats";
import GoggleHeader from "./components/GoggleHeader";
import TranslationPanel from "./components/TranslationPanel";
import DictionaryDrawer from "./components/DictionaryDrawer";
import HistoryPanel from "./components/HistoryPanel";
import StatsPanel from "./components/StatsPanel";
import "./App.css";

interface AppProps {
  clipboardService?: ClipboardService;
  speechService?: SpeechService;
  shareService?: ShareService;
}

function App({
  clipboardService = defaultClipboardService,
  speechService = defaultSpeechService,
  shareService = defaultShareService,
}: AppProps) {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [direction, setDirection] = useState<"toMinion" | "toEnglish">("toMinion");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Delegate history and stats management to custom hook
  const { history, bananaMeter, totalTranslations, clearHistory } =
    useHistoryAndStats(sourceText, targetText, direction);

  // Check URL query parameters on load
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const textParam = params.get("text");
      const dirParam = params.get("dir");
      if (textParam) setSourceText(decodeURIComponent(textParam));
      if (dirParam === "toEnglish" || dirParam === "toMinion") setDirection(dirParam);
    } catch (e) {
      console.error("Failed to parse query parameters:", e);
    }
  }, []);

  useEffect(() => {
    setTargetText(translate(sourceText, direction));
  }, [sourceText, direction]);

  const handleClear = () => setSourceText("");

  const handleCopy = async () => {
    if (!targetText) return;
    try {
      await clipboardService.writeText(targetText);
    } catch (err) {
      console.error("Failed to copy text:", err);
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

  const handleShare = async () => {
    if (!targetText) return;
    const url = `${window.location.origin}${window.location.pathname}?text=${encodeURIComponent(sourceText)}&dir=${direction}`;
    try {
      await shareService.share({ title: "Minionese", text: targetText, url });
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    } catch (err) {
      console.error("Failed to share:", err);
    }
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
            shareSuccess={shareSuccess}
            onSourceTextChange={setSourceText}
            onClear={handleClear}
            onCopy={handleCopy}
            onSpeak={handleSpeak}
            onShare={handleShare}
            onDirectionToggle={(newDir) => {
              if (newDir !== direction) {
                setDirection(newDir);
                setSourceText(targetText);
              }
            }}
          />
          <DictionaryDrawer isOpen={isDrawerOpen} onToggleOpen={() => setIsDrawerOpen(!isDrawerOpen)} />
          <StatsPanel bananaMeter={bananaMeter} totalTranslations={totalTranslations} />
          <HistoryPanel
            history={history}
            onSelectHistoryItem={(src, dir) => {
              setDirection(dir);
              setSourceText(src);
            }}
            onClearHistory={clearHistory}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
export type { AppProps };
