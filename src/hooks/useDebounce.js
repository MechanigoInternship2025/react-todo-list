import { useState, useEffect } from "react";

/**
 * useDebounce(value, delay)
 * 1. input value changes > set timer
 * 2. if input value changes before timer ends > reset timer
 * 3. if timer ends > trigger debounce update
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}