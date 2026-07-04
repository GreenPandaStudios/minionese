import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import type { ClipboardService, SpeechService } from "./utils/services";

describe("Minionese Translator App Integration Tests", () => {
  let mockClipboard: ClipboardService;
  let mockSpeech: SpeechService;

  beforeEach(() => {
    mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    mockSpeech = {
      speak: vi.fn((_text, options) => {
        if (options.onStart) options.onStart();
        if (options.onEnd) options.onEnd();
      }),
      cancel: vi.fn(),
    };
  });

  it("should render core layout correctly", () => {
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} />);
    expect(screen.getByText("Bello!")).toBeInTheDocument();
    expect(screen.getByText("Deterministic Minionese Translator")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type English text here...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Translation will appear here...")).toBeInTheDocument();
    expect(screen.getByText("📖 Show Core Dictionary (99 words)")).toBeInTheDocument();
  });

  it("should translate English to Minionese on input", async () => {
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} />);
    const user = userEvent.setup();
    const sourceInput = screen.getByPlaceholderText("Type English text here...");
    const targetOutput = screen.getByPlaceholderText("Translation will appear here...");

    await user.type(sourceInput, "hello friend");
    expect(targetOutput).toHaveValue("bello buddha");
  });

  it("should clear the translation and inputs when clicking clear button", async () => {
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} />);
    const user = userEvent.setup();
    const sourceInput = screen.getByPlaceholderText("Type English text here...");
    const targetOutput = screen.getByPlaceholderText("Translation will appear here...");
    
    await user.type(sourceInput, "thank you");
    expect(targetOutput).toHaveValue("bank yu");

    const clearBtn = screen.getByRole("button", { name: /clear source text/i });
    await user.click(clearBtn);

    expect(sourceInput).toHaveValue("");
    expect(targetOutput).toHaveValue("");
  });

  it("should swap languages and inputs when toggling translation direction", async () => {
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} />);
    const user = userEvent.setup();
    const sourceInput = screen.getByPlaceholderText("Type English text here...");
    const targetOutput = screen.getByPlaceholderText("Translation will appear here...");

    await user.type(sourceInput, "goodbye");
    expect(targetOutput).toHaveValue("poopaye");

    const toEnglishBtn = screen.getByRole("button", { name: "Minion → English" });
    await user.click(toEnglishBtn);

    expect(screen.getByPlaceholderText("Type Minionese words (e.g. Bello, Poopaye)...")).toHaveValue("poopaye");
    expect(screen.getByPlaceholderText("Translation will appear here...")).toHaveValue("goodbye");
  });

  it("should open dictionary drawer and filter words on search", async () => {
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} />);
    const user = userEvent.setup();
    
    const drawerToggleBtn = screen.getByText("📖 Show Core Dictionary (99 words)");
    await user.click(drawerToggleBtn);

    expect(screen.getByText("📖 Hide Core Dictionary (99 words)")).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText("🔍 Search words...");
    expect(searchInput).toBeInTheDocument();

    // Verify some dictionary rows render
    expect(screen.getByText("goodbye")).toBeInTheDocument();

    // Search for "banana"
    await user.type(searchInput, "banana");
    
    // There are multiple banana references (English and Minion, "banana" and "bananas")
    expect(screen.getAllByText("banana").length).toBeGreaterThan(0);
    expect(screen.queryByText("goodbye")).not.toBeInTheDocument();
  });

  it("should write translation to clipboard when copy is clicked", async () => {
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} />);
    const user = userEvent.setup();
    const sourceInput = screen.getByPlaceholderText("Type English text here...");
    
    await user.type(sourceInput, "ok");
    const copyBtn = screen.getByRole("button", { name: /copy translation/i });
    await user.click(copyBtn);

    expect(mockClipboard.writeText).toHaveBeenCalledWith("okay");
  });

  it("should invoke SpeechSynthesis when speak button is clicked", async () => {
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} />);
    const user = userEvent.setup();
    const sourceInput = screen.getByPlaceholderText("Type English text here...");

    await user.type(sourceInput, "water");
    const speakBtn = screen.getByRole("button", { name: /read translation aloud/i });
    await user.click(speakBtn);

    expect(mockSpeech.speak).toHaveBeenCalledWith("aqua", expect.objectContaining({
      pitch: 1.7,
      rate: 1.2,
    }));
  });
});
