import React, { useEffect, useState } from "react";

// Custom hook for debouncing
export const useDebounceHook = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [value, delay]);
  return debouncedValue;
};
