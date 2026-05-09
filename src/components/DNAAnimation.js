'use client';

import { useEffect, useRef } from 'react';

export default function GlowOrb() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;

    // Use the wrapper's actual rendered size
    const SIZE = wrap.offsetWidth || 128;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = SIZE + 'px';
    canvas.style.height = SIZE + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const R = SIZE / 2;

    const rings = [
      { tilt: 0.55, axisAngle: 0,              speed: 0.007, phase: 0   },
      { tilt: 1.1,  axisAngle: Math.PI / 3,    speed: 0.005, phase: 2.1 },
      { tilt: 0.8,  axisAngle: Math.PI * 0.75, speed: 0.009, phase: 4.4 },
    ];

    let t = 0;
    let animId;

    function drawRing({ tilt, axisAngle, speed, phase }) {
      const rx = R * 0.7;
      const ry = rx * Math.cos(tilt);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(axisAngle);

      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, Math.PI, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI);
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      const angle = t * speed + phase;
      const TRAIL = 14;
      for (let i = TRAIL; i >= 0; i--) {
        const a = angle - i * 0.13;
        const frac = 1 - i / TRAIL;
        ctx.beginPath();
        ctx.arc(rx * Math.cos(a), ry * Math.sin(a), frac * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(frac * 0.7).toFixed(2)})`;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = frac * 14;
        ctx.fill();
      }

      ctx.shadowBlur = 24;
      ctx.shadowColor = 'white';
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(rx * Math.cos(angle), ry * Math.sin(angle), 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, SIZE, SIZE);

      [0.12, 0.07, 0.04].forEach((alpha, i) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * (0.55 + i * 0.2));
        g.addColorStop(0, `rgba(255,255,255,${alpha})`);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      rings.forEach(r => drawRing(r));

      const pulse = 0.88 + 0.12 * Math.sin(t * 0.025);
      const orbR = R * 0.18 * pulse;

      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbR * 5);
      halo.addColorStop(0, 'rgba(255,255,255,0.18)');
      halo.addColorStop(0.4, 'rgba(200,220,255,0.06)');
      halo.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, orbR * 5, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      const core = ctx.createRadialGradient(cx * 0.97, cy * 0.95, 0, cx, cy, orbR);
      core.addColorStop(0, 'rgba(255,255,255,1)');
      core.addColorStop(0.5, 'rgba(220,235,255,0.95)');
      core.addColorStop(1, 'rgba(180,210,255,0)');
      ctx.shadowColor = 'white';
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(cx, cy, orbR, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();

      t++;
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        overflow: 'hidden',
        background: '#000',
        border: '1.5px solid rgba(255,255,255,0.2)',
        boxShadow: '0 0 20px rgba(255,255,255,0.1), 0 0 6px rgba(255,255,255,0.2)',
        lineHeight: 0,
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}
