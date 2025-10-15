import React from "react";
import { Moon, Sun } from "lucide-react";

class ThemeSwitch extends React.Component<{}, { dark: boolean }> {
  constructor(props: {}) {
    super(props);
    const isDark =
      typeof document !== "undefined"
        ? document.documentElement.classList.contains("dark")
        : true;
    this.state = { dark: isDark };
  }

  componentDidMount() {
    document.documentElement.classList.toggle("dark", this.state.dark);
  }

  toggle = () => {
    this.setState((prev) => {
      const next = !prev.dark;
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch (e) {}
      document.documentElement.classList.toggle("dark", next);
      return { dark: next };
    });
  };

  render() {
    const { dark } = this.state;
    return (
      <button
        aria-label="Toggle theme"
        onClick={this.toggle}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur text-white hover:bg-white/10 transition-colors"
      >
        {dark ? (
          <Sun className="text-cyan-300" />
        ) : (
          <Moon className="text-purple-500" />
        )}
        <span className="absolute -z-10 inset-0 rounded-full blur-xl opacity-30 bg-cyan-400/40" />
      </button>
    );
  }
}

export const ThemeToggle = ThemeSwitch;
export default ThemeSwitch;
