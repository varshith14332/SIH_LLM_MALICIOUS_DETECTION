import React from "react";
import { ArrowUp } from "lucide-react";

export class ScrollTop extends React.Component<{}, { show: boolean }> {
  state = { show: false };

  onScroll = () => {
    this.setState({ show: window.scrollY > 400 });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  render() {
    if (!this.state.show) return null;
    return (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-24 right-6 z-40 rounded-full p-3 border border-white/10 bg-white/5 hover:bg-white/10 text-cyan-200 transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp />
      </button>
    );
  }
}

export default ScrollTop;
