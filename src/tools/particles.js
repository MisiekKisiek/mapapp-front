let animaReqAniFrame = null;

export const ParticlesFunc = () => {
  function line(particle, particle2) {
    context.beginPath();
    context.moveTo(particle.x, particle.y);
    context.lineTo(particle2.x, particle2.y);
    context.stroke();
  }

  function animate() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < maxParticles; i++) {
      let particle = particles[i];
      context.fillRect(
        particle.x - particleSize / 2,
        particle.y - particleSize / 2,
        particleSize,
        particleSize
      );
      for (let j = i; j < maxParticles; j++) {
        if (i !== j) {
          let particle2 = particles[j];
          let distanceX = Math.abs(particle.x - particle2.x);
          let distanceY = Math.abs(particle.y - particle2.y);
          if (distanceX < threshold && distanceY < threshold) {
            context.lineWidth = (threshold * 2 - (distanceX + distanceY)) / 500;
            let color = 0 - Math.floor(distanceX + distanceY);
            context.strokeStyle = `rgb(${color + 82},${color + 114},${
              color + 209
            })`;
            line(particle, particle2);
          }
        }
      }
      particle.x = particle.x + particle.vx;
      particle.y = particle.y + particle.vy;
      if (particle.x > canvas.width - particleSize || particle.x < particleSize)
        particle.vx = -particle.vx;
      if (
        particle.y > canvas.height - particleSize ||
        particle.y < particleSize
      )
        particle.vy = -particle.vy;
    }
    animaReqAniFrame = window.requestAnimationFrame(animate);
  }

  let canvas = document.getElementById("myCanvas");
  let context = canvas.getContext("2d");
  let particles = [];
  let particleSize = 1;
  let maxParticles = 180;
  let threshold = 100;
  for (let i = 0; i < maxParticles; i++) {
    let particle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random(),
      vy: Math.random(),
    };
    particles.push(particle);
  }
  context.fillStyle = "white";
  animate();
};

export const DisableParticlesFunc = () => {
  window.cancelAnimationFrame(animaReqAniFrame);
};
