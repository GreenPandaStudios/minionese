export interface ClipboardService {
  /**
   * Writes the given text to the clipboard.
   */
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
  /**
   * Speaks the given text with the specified options.
   */
  speak(text: string, options: SpeechServiceOptions): void;

  /**
   * Cancels any active speech.
   */
  cancel(): void;
}

export const browserClipboardService: ClipboardService = {
  writeText: async (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      throw new Error("Clipboard API not available");
    }
  },
};

export const browserSpeechService: SpeechService = {
  speak: (text: string, { pitch, rate, onStart, onEnd, onError }: SpeechServiceOptions) => {
    if (!window.speechSynthesis) return;
    
    // Cancel any current speaking
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
