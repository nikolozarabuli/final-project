import React, { useEffect } from "react";
import useTheme from "../hooks/useTheme";

function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(`${theme}-mode`);
  }, [theme]);

  return (
    <button className="theme-toggler" onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

export default ThemeToggler;