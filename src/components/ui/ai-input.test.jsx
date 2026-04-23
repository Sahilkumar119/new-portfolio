import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { MorphPanel } from './ai-input';

jest.mock('framer-motion', () => {
  const ReactLib = require('react');
  const makeMotionTag = tag =>
    ReactLib.forwardRef(
      (
        {
          children,
          initial,
          animate,
          exit,
          transition,
          whileHover,
          whileTap,
          whileInView,
          layout,
          layoutId,
          variants,
          ...props
        },
        ref
      ) => ReactLib.createElement(tag, { ref, ...props }, children)
    );

  return {
    AnimatePresence: ({ children }) => <>{children}</>,
    motion: new Proxy(
      {},
      {
        get: (_target, key) => makeMotionTag(key),
      }
    ),
  };
});

describe('MorphPanel AI integration', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  function openPanel() {
    render(<MorphPanel />);
    fireEvent.click(screen.getAllByText(/ask ai/i)[0].closest('button'));

    act(() => {
      jest.runOnlyPendingTimers();
    });

    return screen.getByPlaceholderText(/ask me anything about my work/i);
  }

  test('opens the input panel', () => {
    openPanel();

    expect(screen.getByPlaceholderText(/ask me anything about my work/i)).toBeInTheDocument();
  });

  test('submits question and calls fetch with expected payload', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ answer: 'Test answer', citations: [] }),
    });

    const textarea = openPanel();
    fireEvent.change(textarea, { target: { value: 'What projects are most relevant to ML?' } });
    fireEvent.submit(textarea.closest('form'));

    expect(await screen.findByText('Test answer')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/assistant/chat'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: 'What projects are most relevant to ML?', top_k: 4 }),
      })
    );
  });

  test('submits with Enter and allows newline on Shift+Enter', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ answer: 'Enter submit works', citations: [] }),
    });

    const textarea = openPanel();
    fireEvent.change(textarea, { target: { value: 'Line one' } });

    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter', charCode: 13, shiftKey: true });
    expect(global.fetch).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(await screen.findByText('Enter submit works')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('renders answer and citation list from successful response', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        answer: 'I built an AI Voice Assistant using Whisper and GPT-4.',
        citations: [
          { title: 'AI Voice Assistant', url: 'https://example.com/voice-assistant' },
          'projects.js',
        ],
      }),
    });

    const textarea = openPanel();
    fireEvent.change(textarea, { target: { value: 'Tell me about your AI project.' } });
    fireEvent.submit(textarea.closest('form'));

    expect(await screen.findByText(/i built an ai voice assistant/i)).toBeInTheDocument();
    const citationLink = screen
      .getAllByText(/ai voice assistant/i)
      .find(node => node.tagName.toLowerCase() === 'a');
    expect(citationLink).toHaveAttribute(
      'href',
      'https://example.com/voice-assistant'
    );
    expect(screen.getByText('projects.js')).toBeInTheDocument();
  });

  test('shows fallback message when request fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const textarea = openPanel();
    fireEvent.change(textarea, { target: { value: 'Are you online?' } });
    fireEvent.submit(textarea.closest('form'));

    expect(await screen.findByText(/unable to reach assistant backend right now/i)).toBeInTheDocument();
  });

  // --- New tests for button overflow and glassmorphism ---

  test('Ask AI button text is fully visible (no min-w-[84px] forcing overflow)', () => {
    render(<MorphPanel />);
    const askButton = screen.getAllByText(/ask ai/i)[0].closest('button');
    // The button should NOT have the min-w-[84px] class that caused the overflow
    expect(askButton.className).not.toContain('min-w-[84px]');
  });

  test('collapsed panel width accommodates Ask AI button and orb', () => {
    render(<MorphPanel />);
    // Verify the button renders with full text (not truncated)
    const buttonSpan = screen.getAllByText(/ask ai/i)[0];
    expect(buttonSpan).toBeInTheDocument();
    expect(buttonSpan.textContent).toBe('Ask AI');
    // The span should NOT have truncate class (which caused clipping)
    expect(buttonSpan.className).not.toContain('truncate');
  });

  test('MorphPanel renders glass backdrop style on wrapper', () => {
    const { container } = render(<MorphPanel />);
    const panel = container.querySelector('[data-panel]');
    expect(panel).toBeInTheDocument();
    // The panel should have backdrop-filter inline style
    expect(panel.style.backdropFilter).toContain('blur');
  });
});
