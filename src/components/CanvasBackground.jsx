import React, { useEffect, useRef } from "react";

export default function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Track mouse position globally
    const mouse = {
      x: null,
      y: null,
      radius: 160 // Connection and gravity radius
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Setup canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Float upwards: negative vertical velocity
        this.vy = - (Math.random() * 0.4 + 0.1); 
        this.vx = (Math.random() * 0.4 - 0.2);
        this.radius = Math.random() * 2 + 1;
        // Dark blue shades + white for highlights
        const blueVal = Math.floor(Math.random() * 80) + 120; // 120-200
        const opacity = Math.random() * 0.4 + 0.25;
        this.color = `rgba(37, 99, ${blueVal}, ${opacity})`;
      }

      update() {
        this.y += this.vy;
        this.x += this.vx;

        // Recycle if floats off top
        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
        // Wrap around sides
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;

        // Interaction with mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            // Push away slightly (antigravity/repulsion) or attract
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            // Stronger push when closer
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * 0.8;
            const directionY = forceDirectionY * force * 0.8;

            // Apply push away (change sign to + for attraction)
            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.radius > 2 ? 6 : 0;
        ctx.shadowColor = "rgba(59, 130, 246, 0.5)";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for lines
      }
    }

    // Initialize particle array with dynamic limits based on screen size
    const particles = [];
    const isMobile = window.innerWidth < 768;
    const densityFactor = isMobile ? 150 : 130; // Spread out more on mobile
    const maxParticles = isMobile ? 45 : 85;    // Lower desktop max from 180 to 85 to save CPU/GPU resources
    const particleCount = Math.min(
      Math.floor((canvas.width * canvas.height) / (densityFactor * densityFactor)),
      maxParticles
    );

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw lines connecting nearby particles
    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 90;
          if (distance < maxDist) {
            // Opacity falls off as distance increases
            const alpha = (1 - distance / maxDist) * 0.12;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Draw line to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const alpha = (1 - distance / mouse.radius) * 0.18;
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    // Track tab visibility to pause animation loop when page is inactive
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop
    const animate = () => {
      if (isTabVisible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });

        drawLines();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
