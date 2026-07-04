import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import type { ClipboardService, SpeechService, ShareService } from "./utils/services";

describe("Minionese Translator App Integration Tests", () => {
  let mockClipboard: ClipboardService;
  let mockSpeech: SpeechService;
  let mockShare: ShareService;

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
    mockShare = {
      share: vi.fn().mockResolvedValue(undefined),
    };
  });

  it("should render core layout correctly", () => {
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} shareService={mockShare} />);
    expect(screen.getByText("Bello!")).toBeInTheDocument();
    expect(screen.getByText("Deterministic Minionese Translator")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type English text here...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Translation will appear here...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Show Core Dictionary/i })).toBeInTheDocument();
  });

  it("should translate English to Minionese on input", async () => {
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} shareService={mockShare} />);
    const user = userEvent.setup();
    const sourceInput = screen.getByPlaceholderText("Type English text here...");
    const targetOutput = screen.getByPlaceholderText("Translation will appear here...");

    await user.type(sourceInput, "hello friend");
    expect(targetOutput).toHaveValue("bello buddha");
  });

  it("should clear the translation and inputs when clicking clear button", async () => {
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} shareService={mockShare} />);
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
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} shareService={mockShare} />);
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
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} shareService={mockShare} />);
    const user = userEvent.setup();
    
    const drawerToggleBtn = screen.getByRole("button", { name: /Show Core Dictionary/i });
    await user.click(drawerToggleBtn);

    expect(screen.getByRole("button", { name: /Hide Core Dictionary/i })).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText("🔍 Search words...");
    expect(searchInput).toBeInTheDocument();

    expect(screen.getByText("goodbye")).toBeInTheDocument();

    await user.type(searchInput, "banana");
    expect(screen.getAllByText("banana").length).toBeGreaterThan(0);
    expect(screen.queryByText("goodbye")).not.toBeInTheDocument();
  });

  it("should write translation to clipboard when copy is clicked", async () => {
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} shareService={mockShare} />);
    const user = userEvent.setup();
    const sourceInput = screen.getByPlaceholderText("Type English text here...");
    
    await user.type(sourceInput, "ok");
    const copyBtn = screen.getByRole("button", { name: /copy translation/i });
    await user.click(copyBtn);

    expect(mockClipboard.writeText).toHaveBeenCalledWith("okay");
  });

  it("should invoke SpeechSynthesis when speak button is clicked", async () => {
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} shareService={mockShare} />);
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

  it("should invoke ShareService when share button is clicked", async () => {
    render(<App clipboardService={mockClipboard} speechService={mockSpeech} shareService={mockShare} />);
    const user = userEvent.setup();
    const sourceInput = screen.getByPlaceholderText("Type English text here...");

    await user.type(sourceInput, "ok");
    const shareBtn = screen.getByRole("button", { name: /share translation link/i });
    await user.click(shareBtn);

    expect(mockShare.share).toHaveBeenCalledWith(expect.objectContaining({
      title: "Minionese",
      text: "okay",
    }));
  });
});
