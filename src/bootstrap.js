export const toneLoggingSilenced = (() => {
  const root =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
        ? window
        : undefined;

  if (root) {
    Object.defineProperty(root, 'TONE_SILENCE_LOGGING', {
      configurable: true,
      value: true,
      writable: true
    });

    if (root.window) {
      Object.defineProperty(root.window, 'TONE_SILENCE_LOGGING', {
        configurable: true,
        value: true,
        writable: true
      });
    }
  }

  return true;
})();
