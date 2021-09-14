import React, { useRef, useEffect } from "react";

//Tools
import circlesPathFunc from "../tools/circlesPath";

const Canvas = () => {
  const canvasRef = useRef(null);

  const getWidth = () => document.body.clientWidth;
  const getHeight = () => document.body.clientHeight;

  const draw = (ctx, canvas) => {
    canvas.width = getWidth();
    canvas.height = getHeight();
    const h = getHeight();
    const w = getWidth();
    ctx.beginPath();
    ctx.moveTo(0, 0.5 * h);
    ctx.quadraticCurveTo(0.15 * w, 0.38 * h, 0.3 * w, 0.5 * h);
    ctx.quadraticCurveTo(0.4 * w, 0.58 * h, 0.5 * w, 0.52 * h);
    ctx.quadraticCurveTo(0.6 * w, 0.47 * h, 0.68 * w, 0.55 * h);
    ctx.quadraticCurveTo(0.76 * w, 0.63 * h, 0.83 * w, 0.59 * h);
    ctx.quadraticCurveTo(0.92 * w, 0.54 * h, w, 0.65 * h);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fillStyle = "royalblue";
    ctx.fill();
  };

  const setup = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    draw(ctx, canvas);
    window.addEventListener("resize", () => {
      draw(ctx, canvas);
    });
  };

  useEffect(() => {
    setup();
  }, [draw]);

  return (
    <>
      <canvas ref={canvasRef} className="canvas__blue-background"></canvas>
    </>
  );
};

export default Canvas;
