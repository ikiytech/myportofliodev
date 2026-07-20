"use client";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const isMobile = width < 768;
    const NODE_COUNT = isMobile ? 20 : 50;
    const MAX_LINK_DIST = isMobile ? 90 : 130;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    const nodes = Array.from({ length: NODE_COUNT }, () => {
      const vx = (Math.random() - 0.5) * 0.25;
      const vy = (Math.random() - 0.5) * 0.25;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
      };
    });

    const mouse = { x: -9999, y: -9999 };
    const MOUSE_RADIUS = 150;

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function handleMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    let raf: number;
    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (const n of nodes) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          n.vx += (dx / dist) * force * 0.02;
          n.vy += (dy / dist) * force * 0.02;
        }
        // damping back to base velocity instead of zero
        n.vx = (n.vx - n.baseVx) * 0.98 + n.baseVx;
        n.vy = (n.vy - n.baseVy) * 0.98 + n.baseVy;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) { n.vx *= -1; n.baseVx *= -1; }
        if (n.y < 0 || n.y > height) { n.vy *= -1; n.baseVy *= -1; }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_LINK_DIST) {
            ctx!.strokeStyle = `rgba(160, 160, 155, ${1 - dist / MAX_LINK_DIST})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      if (mouse.x > 0) {
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            ctx!.strokeStyle = `rgba(242, 169, 0, ${(1 - dist / MOUSE_RADIUS) * 0.6})`;
            ctx!.lineWidth = 0.7;
            ctx!.beginPath();
            ctx!.moveTo(mouse.x, mouse.y);
            ctx!.lineTo(n.x, n.y);
            ctx!.stroke();
          }
        }
      }

      nodes.forEach((n, idx) => {
        ctx!.fillStyle = idx % 7 === 0 ? "#f2a900" : "#6b6b66";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, idx % 7 === 0 ? 2.5 : 2, 0, Math.PI * 2);
        ctx!.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(draw);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    function handleResize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.scale(dpr, dpr);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      if (!isTouchDevice) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full opacity-60" aria-hidden="true" />;
}
