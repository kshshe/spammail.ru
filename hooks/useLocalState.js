import { useState, useEffect } from "react";

const useLocalState = (defaultValue, key) => {
  const [state, setState] = useState(() => {
    const stored =
      typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
    if (stored) {
      return JSON.parse(stored);
    }
    return defaultValue;
  });
  useEffect(() => {
    localStorage?.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

export default useLocalState;
