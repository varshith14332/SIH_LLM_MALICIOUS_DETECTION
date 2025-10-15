import React from "react";

// Lightweight, hook-free canvas globe to avoid React hook conflicts
class Globe extends React.Component {
  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
  raf = 0;
  points: Array<{ x: number; y: number; z: number }> = [];
  angle = 0;

  constructor(props: any) {
    super(props);
    // generate sphere points
    const total = 1200;
    for (let i = 0; i < total; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 1;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      this.points.push({ x, y, z });
    }
  }

  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.resize);
    this.raf = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
    cancelAnimationFrame(this.raf);
  }

  resize = () => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
  };

  tick = (t: number) => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    this.angle += 0.0025;
    const sinA = Math.sin(this.angle);
    const cosA = Math.cos(this.angle);
    for (const p of this.points) {
      const x = p.x * cosA + p.z * sinA;
      const z = -p.x * sinA + p.z * cosA;
      const scale = 1.6;
      const px = cx + x * (Math.min(w, h) / 3) * scale;
      const py = cy + p.y * (Math.min(w, h) / 3) * scale;
      const depth = (z + 1) / 2;
      const alpha = 0.2 + depth * 0.9;
      const size = 0.6 + depth * 1.6;
      ctx.beginPath();
      ctx.fillStyle = `rgba(0,255,255,${alpha})`;
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = "rgba(10,255,255,0.012)";
    ctx.beginPath();
    ctx.arc(cx, cy, Math.min(w, h) / 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    this.raf = requestAnimationFrame(this.tick);
  };

  render() {
    return (
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <canvas
          ref={this.canvasRef}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }
}

export default Globe;
