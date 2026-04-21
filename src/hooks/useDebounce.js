import { useState, useEffect } from "react";

/**
 * useDebounce(value, delay)
 *
 * Returns a debounced copy of `value` that only updates
 * after `delay` ms have passed since the last change.
 *
 * How it works:
 *  1. Every time `value` changes, a timer is set.
 *  2. If `value` changes again before the timer fires, the
 *     previous timer is cleared (cleanup) and a new one starts.
 *  3. Once the timer fires without interruption, `debouncedValue`
 *     is updated — triggering any downstream effects exactly once.
 *
 * This prevents expensive operations (API calls, filtering) from
 * running on every keystroke.
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel the pending timer if value changes before it fires
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}