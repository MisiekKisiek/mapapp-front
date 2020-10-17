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

    // class Marker {
    //   constructor(_ctx, _posX, _posY) {
    //     this.ctx = _ctx;
    //     this.posX = _posX;
    //     this.posY = _posY;
    //   }
    //   makeMarker(width) {
    //     const { ctx, posX, posY } = this;
    //     let w = 1;
    //     if (width > 1300) w = 0.7;
    //     else w = 0.00055 * width;
    //     ctx.translate(posX, posY);
    //     ctx.beginPath();
    //     ctx.fillStyle = "rgb(220,20,60)";
    //     ctx.lineTo(-16 * w, -40 * w);
    //     ctx.quadraticCurveTo(-18 * w, -60 * w, 0 * w, -60 * w);
    //     ctx.quadraticCurveTo(18 * w, -60 * w, 16 * w, -40 * w);
    //     ctx.lineTo(0, 0);
    //     ctx.fill();
    //     ctx.fillStyle = "rgb(255,215,0)";
    //     ctx.beginPath();
    //     ctx.arc(0, -44 * w, 10 * w, 0, Math.PI * 2, true);
    //     ctx.fill();
    //   }
    // }

    // class Circle {
    //   constructor(_ctx, _posX, _posY) {
    //     this.ctx = _ctx;
    //     this.posX = _posX;
    //     this.posY = _posY;
    //   }
    //   makeCircle(width) {
    //     const { ctx, posX, posY } = this;
    //     let w = 1;
    //     if (width > 1300) w = 0.67;
    //     else w = 0.0005 * width;
    //     ctx.translate(posX, posY);
    //     ctx.fillStyle = "rgb(220,20,60)";
    //     ctx.beginPath();
    //     ctx.arc(0, 0, 6 * w, 0, Math.PI * 2, true);
    //     ctx.fill();
    //   }
    // }

    // const circlesPath = circlesPathFunc(w, h);

    // ctx.translate(0.86 * w, 0.82 * h);
    // circlesPath.map((e, index) => {
    //   if (index % 2 === 0) {
    //     if (index % 20 === 0) {
    //       console.log(index);
    //       new Marker(ctx, e[0], e[1]).makeMarker(w);
    //     } else new Circle(ctx, e[0], e[1]).makeCircle(w);
    //   } else ctx.translate(e[0], e[1]);
    // });
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
