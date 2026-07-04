export interface ClipboardService {
  writeText(text: string): Promise<void>;
}

export interface SpeechServiceOptions {
  pitch: number;
  rate: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

export interface SpeechService {
  speak(text: string, options: SpeechServiceOptions): void;
  cancel(): void;
}

// Exporting only the default implementations
export const defaultClipboardService: ClipboardService = {
  writeText: async (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      throw new Error("Clipboard API not available");
    }
  },
};

export const defaultSpeechService: SpeechService = {
  speak: (text: string, { pitch, rate, onStart, onEnd, onError }: SpeechServiceOptions) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    if (onError) utterance.onerror = onError;

    window.speechSynthesis.speak(utterance);
  },
  cancel: () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  },
};
