import { useState, useEffect, useRef } from "react";

export function GoggleHeader() {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;
      const dx = e.clientX - eyeX;
      const dy = e.clientY - eyeY;
      const angle = Math.atan2(dy, dx);
      const maxDistance = 12;
      const distance = Math.min(Math.hypot(dx, dy) / 10, maxDistance);

      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <header className="goggle-header">
      <div className="goggle-ring" ref={eyeRef}>
        <div className="eyeball">
          <div
            className="pupil"
            style={{
              transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
            }}
          >
            <div className="pupil-reflection"></div>
          </div>
        </div>
      </div>
      <h1 className="main-title">Bello!</h1>
      <p className="subtitle">Speak like a Minion!</p>
    </header>
  );
}
export default GoggleHeader;
