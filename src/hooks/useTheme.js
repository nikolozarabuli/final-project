import useLocalStorage from "./useLocalStorage";
import { useEffect } from "react";

function useTheme() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return { theme, toggleTheme };
}

export default useTheme;