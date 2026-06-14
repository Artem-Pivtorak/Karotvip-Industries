import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GradientText } from "@/components/custom/GradientText";

const founderImages = ["/artem.png", "/artem-2.png", "/artem-3.png"];
const NUM_PARTICLES = 800;
const AUTO_PLAY_INTERVAL = 4000;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  depth: number;
  seed: number;
}

export function FoundersSection() {
  const headerRef = useScrollAnimation<HTMLDivElement>({ animation: "fadeInUp" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const currentIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const transitionStartTimeRef = useRef<number>(0);
  const currentDurationRef = useRef<number>(1500);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<'IT' | 'Video/3D' | 'Skills' | null>(null);
  const [clickedNeuron, setClickedNeuron] = useState<number | null>(null);
  const [animationFrame, setAnimationFrame] = useState(0);
  
  const neuronPositionsRef = useRef<{x: number, y: number, vx: number, vy: number}[]>([
    {x: 250, y: 50, vx: 0.3, vy: 0.2},   // Node 1 - top
    {x: 250, y: 120, vx: -0.2, vy: 0.3},  // Node 2
    {x: 250, y: 190, vx: 0.4, vy: -0.1},  // Node 3
    {x: 250, y: 260, vx: -0.3, vy: 0.2},  // Node 4
    {x: 250, y: 330, vx: 0.2, vy: -0.3},  // Node 5 - bottom
    {x: 150, y: 190, vx: 0.3, vy: 0.1},   // Skill IT - near node 3
    {x: 350, y: 190, vx: -0.2, vy: -0.2}, // Skill Video/3D - near node 3
    {x: 250, y: 240, vx: 0.1, vy: 0.3},   // Skill Other - near node 3
  ]);

  useEffect(() => {
    let animationFrameId: number;
    
    const animate = () => {
      const positions = neuronPositionsRef.current;
      
      positions.forEach((neuron, index) => {
        neuron.vx += (Math.random() - 0.5) * 0.005;
        neuron.vy += (Math.random() - 0.5) * 0.005;
        
        neuron.vx = Math.max(-0.15, Math.min(0.15, neuron.vx));
        neuron.vy = Math.max(-0.15, Math.min(0.15, neuron.vy));
        
        const edgeRepulsionStrength = 0.2;
        if (neuron.x < 80) neuron.vx += edgeRepulsionStrength;
        if (neuron.x > 420) neuron.vx -= edgeRepulsionStrength;
        if (neuron.y < 60) neuron.vy += edgeRepulsionStrength;
        if (neuron.y > 340) neuron.vy -= edgeRepulsionStrength;
        
        const neuronRepulsionStrength = 0.2;
        const minDistance = 80;
        
        for (let i = 0; i < positions.length; i++) {
          if (i === index) continue;
          const other = positions[i];
          const dx = neuron.x - other.x;
          const dy = neuron.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < minDistance && distance > 0) {
            const force = (minDistance - distance) / distance * neuronRepulsionStrength;
            neuron.vx += dx * force;
            neuron.vy += dy * force;
          }
        }
        
        let newX = neuron.x + neuron.vx;
        let newY = neuron.y + neuron.vy;
        
        newX = Math.max(50, Math.min(450, newX));
        newY = Math.max(30, Math.min(370, newY));
        
        if (index < 5) {
          const targetY = 50 + index * 70;
          const yDiff = targetY - newY;
          neuron.vy += yDiff * 0.05; 
        }
        
        neuron.x = newX;
        neuron.y = newY;
      });
      
      setAnimationFrame(prev => prev + 1);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    founderImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      imageRefs.current[index] = img;
    });

    const interval = setInterval(() => {
      startTransition();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const startTransition = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    transitionStartTimeRef.current = performance.now();
    currentDurationRef.current = 1500 + Math.random() * 1000; 
  };

  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        baseSize: Math.random() * 50 + 15,
        depth: Math.random() * 25 + 5,
        seed: Math.random(),
      });
    }
    particlesRef.current = particles;
  };

  const drawCover = (img: HTMLImageElement, targetCanvas: HTMLCanvasElement, width: number, height: number) => {
    const tCtx = targetCanvas.getContext("2d");
    if (!tCtx) return;
    
    targetCanvas.width = width;
    targetCanvas.height = height;

    const canvasRatio = width / height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      drawHeight = height;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    // Shift image down for artem-3 to show head fully
    if (img.src.includes('artem-3')) {
      offsetY = Math.max(0, offsetY + 50);
    }

    tCtx.clearRect(0, 0, width, height);
    tCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const drawVoxel = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    depth: number,
    sourceCanvas: HTMLCanvasElement,
    seed: number,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    if (size < 1) return;

    let jx = x;
    let jy = y;
    if (seed > 0.9) {
      jx += (Math.random() - 0.5) * 15;
      jy += (Math.random() - 0.5) * 15;
    }

    let srcX = Math.max(0, Math.min(canvasWidth - size, jx));
    let srcY = Math.max(0, Math.min(canvasHeight - size, jy));

    // Right face (shadow) - Темніший градієнт
    const rightGrad = ctx.createLinearGradient(jx + size, jy, jx + size, jy + size);
    rightGrad.addColorStop(0, "rgba(200, 70, 30, 0.95)"); // Темно-оранжевий
    rightGrad.addColorStop(1, "rgba(160, 10, 60, 0.95)"); // Темно-малиновий
    ctx.fillStyle = rightGrad;
    ctx.beginPath();
    ctx.moveTo(jx + size, jy);
    ctx.lineTo(jx + size + depth, jy - depth);
    ctx.lineTo(jx + size + depth, jy + size - depth);
    ctx.lineTo(jx + size, jy + size);
    ctx.fill();

    // Top face (light) - Світліший градієнт
    const topGrad = ctx.createLinearGradient(jx, jy, jx + size, jy);
    topGrad.addColorStop(0, "rgba(255, 140, 90, 0.95)"); // Світло-оранжевий
    topGrad.addColorStop(1, "rgba(255, 80, 130, 0.95)"); // Світло-малиновий
    ctx.fillStyle = topGrad;
    ctx.beginPath();
    ctx.moveTo(jx, jy);
    ctx.lineTo(jx + depth, jy - depth);
    ctx.lineTo(jx + size + depth, jy - depth);
    ctx.lineTo(jx + size, jy);
    ctx.fill();

    // Front face (image texture)
    ctx.drawImage(sourceCanvas, srcX, srcY, size, size, jx, jy, size, size);

    // Front face (Gradient overlay для оранжево-малинового ефекту)
    const frontGrad = ctx.createLinearGradient(jx, jy, jx + size, jy + size);
    frontGrad.addColorStop(0, "rgba(255, 107, 53, 0.7)"); // Неоновий оранжевий
    frontGrad.addColorStop(1, "rgba(227, 11, 92, 0.7)"); // Малиновий
    ctx.fillStyle = frontGrad;
    ctx.fillRect(jx, jy, size, size);

    // Neon border for cyber style
    if (seed > 0.95) {
      ctx.strokeStyle = seed > 0.97 ? "#FF6B35" : "#E30B5C"; // Оранжева або малинова обводка
      ctx.lineWidth = 1.5;
      ctx.strokeRect(jx, jy, size, size);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasSize = 600;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    initParticles(canvasSize, canvasSize);

    const currentCanvas = document.createElement("canvas");
    const nextCanvas = document.createElement("canvas");

    const checkImagesLoaded = () => {
      const allLoaded = imageRefs.current.every(img => img && img.complete);
      if (allLoaded) {
        requestAnimationFrame(render);
      } else {
        setTimeout(checkImagesLoaded, 100);
      }
    };

    checkImagesLoaded();

    const render = (now: number) => {
      const currentImg = imageRefs.current[currentIndexRef.current];
      const nextImg = imageRefs.current[(currentIndexRef.current + 1) % founderImages.length];

      if (!currentImg || !nextImg) {
        requestAnimationFrame(render);
        return;
      }

      drawCover(currentImg, currentCanvas, canvas.width, canvas.height);
      drawCover(nextImg, nextCanvas, canvas.width, canvas.height);

      if (!isTransitioningRef.current) {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(currentCanvas, 0, 0);

        for (let p of particlesRef.current) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x += canvas.width;
          if (p.x > canvas.width) p.x -= canvas.width;
          if (p.y < 0) p.y += canvas.height;
          if (p.y > canvas.height) p.y -= canvas.height;
        }

        requestAnimationFrame(render);
        return;
      }

      const elapsed = now - transitionStartTimeRef.current;
      let progress = elapsed / currentDurationRef.current;

      if (progress >= 1) {
        progress = 1;
        isTransitioningRef.current = false;
        currentIndexRef.current = (currentIndexRef.current + 1) % founderImages.length;
        ctx.globalAlpha = 1.0;
        // ВИПРАВЛЕННЯ: малюємо nextCanvas, щоб уникнути блимання старої картинки
        ctx.drawImage(nextCanvas, 0, 0); 
        requestAnimationFrame(render);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;

      const cloudWidth = width * 0.7;
      const startX = -cloudWidth / 2;
      const endX = width + cloudWidth / 2;
      const waveX = startX + (endX - startX) * progress;

      // ВИПРАВЛЕННЯ: Ідеальний перехід фону без глобального накладання.
      // Малюємо поточне фото, потім "відрізаємо" шматок за допомогою ctx.clip(),
      // і малюємо наступне фото лише позаду хвилі пікселів.
      ctx.globalAlpha = 1.0;
      ctx.drawImage(currentCanvas, 0, 0);
      
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, waveX, height);
      ctx.clip();
      ctx.drawImage(nextCanvas, 0, 0);
      ctx.restore();

      // 3D pixel cloud logic
      for (let p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x += width;
        if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        if (p.y > height) p.y -= height;

        let dist = Math.abs(p.x - waveX);

        if (dist < cloudWidth / 2) {
          let nd = dist / (cloudWidth / 2);
          let scale = Math.cos(nd * Math.PI / 2);

          let currentSize = p.baseSize * scale;
          let currentDepth = p.depth * scale;

          p.x += (cloudWidth / 2 - dist) * 0.005;

          if (currentSize >= 1) {
            let isLeft = p.x < waveX;
            let sourceCanvas = isLeft ? nextCanvas : currentCanvas;
            
            if (Math.random() < 0.15) {
              sourceCanvas = isLeft ? currentCanvas : nextCanvas;
            }

            drawVoxel(ctx, p.x, p.y, currentSize, currentDepth, sourceCanvas, p.seed, width, height);
          }
        }
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }, []);

  return (
    <section
      ref={headerRef}
      id="testimonials"
      className="relative py-24 lg:py-32 bg-dark-secondary"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,45,120,0.05)_0%,transparent_50%)]" />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl lg:text-[40px] tracking-[-1.5px] text-white mb-6">
              PIVTORAK ARTEM{" "}
              <GradientText variant="orange-pink">Founder</GradientText>
            </h2>

            <div className="relative w-full max-w-[500px] h-[400px]">
              <svg className="w-full h-full" viewBox="0 0 500 400">
                <line x1={neuronPositionsRef.current[0].x} y1={neuronPositionsRef.current[0].y} x2={neuronPositionsRef.current[1].x} y2={neuronPositionsRef.current[1].y} stroke="#383758" strokeWidth="3" />
                <line x1={neuronPositionsRef.current[1].x} y1={neuronPositionsRef.current[1].y} x2={neuronPositionsRef.current[2].x} y2={neuronPositionsRef.current[2].y} stroke="#383758" strokeWidth="3" />
                <line x1={neuronPositionsRef.current[2].x} y1={neuronPositionsRef.current[2].y} x2={neuronPositionsRef.current[3].x} y2={neuronPositionsRef.current[3].y} stroke="#383758" strokeWidth="3" />
                <line x1={neuronPositionsRef.current[3].x} y1={neuronPositionsRef.current[3].y} x2={neuronPositionsRef.current[4].x} y2={neuronPositionsRef.current[4].y} stroke="#383758" strokeWidth="3" />
                
                <line x1={neuronPositionsRef.current[2].x} y1={neuronPositionsRef.current[2].y} x2={neuronPositionsRef.current[5].x} y2={neuronPositionsRef.current[5].y} stroke="#383758" strokeWidth="2" />
                <line x1={neuronPositionsRef.current[2].x} y1={neuronPositionsRef.current[2].y} x2={neuronPositionsRef.current[6].x} y2={neuronPositionsRef.current[6].y} stroke="#383758" strokeWidth="2" />
                <line x1={neuronPositionsRef.current[2].x} y1={neuronPositionsRef.current[2].y} x2={neuronPositionsRef.current[7].x} y2={neuronPositionsRef.current[7].y} stroke="#383758" strokeWidth="2" />

                <circle cx={neuronPositionsRef.current[0].x} cy={neuronPositionsRef.current[0].y} r={clickedNeuron === 1 ? 20 : 15} fill="#FF6B35" className="cursor-pointer" style={{filter: clickedNeuron === 1 ? "drop-shadow(0 0 20px #FF6B35) drop-shadow(0 0 40px #FF6B35)" : "drop-shadow(0 0 10px #FF6B35) drop-shadow(0 0 20px #FF6B35)"}} onClick={() => {setSelectedNode(1); setClickedNeuron(1);}} />
                <circle cx={neuronPositionsRef.current[1].x} cy={neuronPositionsRef.current[1].y} r={clickedNeuron === 2 ? 20 : 15} fill="#FF6B35" className="cursor-pointer" style={{filter: clickedNeuron === 2 ? "drop-shadow(0 0 20px #FF6B35) drop-shadow(0 0 40px #FF6B35)" : "drop-shadow(0 0 10px #FF6B35) drop-shadow(0 0 20px #FF6B35)"}} onClick={() => {setSelectedNode(2); setClickedNeuron(2);}} />
                <circle cx={neuronPositionsRef.current[2].x} cy={neuronPositionsRef.current[2].y} r={clickedNeuron === 3 ? 20 : 15} fill="#FF6B35" className="cursor-pointer" style={{filter: clickedNeuron === 3 ? "drop-shadow(0 0 20px #FF6B35) drop-shadow(0 0 40px #FF6B35)" : "drop-shadow(0 0 10px #FF6B35) drop-shadow(0 0 20px #FF6B35)"}} onClick={() => {setSelectedNode(3); setClickedNeuron(3);}} />
                <circle cx={neuronPositionsRef.current[3].x} cy={neuronPositionsRef.current[3].y} r={clickedNeuron === 4 ? 20 : 15} fill="#FF6B35" className="cursor-pointer" style={{filter: clickedNeuron === 4 ? "drop-shadow(0 0 20px #FF6B35) drop-shadow(0 0 40px #FF6B35)" : "drop-shadow(0 0 10px #FF6B35) drop-shadow(0 0 20px #FF6B35)"}} onClick={() => {setSelectedNode(4); setClickedNeuron(4);}} />
                <circle cx={neuronPositionsRef.current[4].x} cy={neuronPositionsRef.current[4].y} r={clickedNeuron === 5 ? 20 : 15} fill="#FF6B35" className="cursor-pointer" style={{filter: clickedNeuron === 5 ? "drop-shadow(0 0 20px #FF6B35) drop-shadow(0 0 40px #FF6B35)" : "drop-shadow(0 0 10px #FF6B35) drop-shadow(0 0 20px #FF6B35)"}} onClick={() => {setSelectedNode(5); setClickedNeuron(5);}} />

                <circle cx={neuronPositionsRef.current[5].x} cy={neuronPositionsRef.current[5].y} r={clickedNeuron === 6 ? 17 : 12} fill="#9B4DFF" className="cursor-pointer" style={{filter: clickedNeuron === 6 ? "drop-shadow(0 0 20px #9B4DFF) drop-shadow(0 0 40px #9B4DFF)" : "drop-shadow(0 0 10px #9B4DFF) drop-shadow(0 0 20px #9B4DFF)"}} onClick={() => {setSelectedSkill('IT'); setClickedNeuron(6);}} />
                <circle cx={neuronPositionsRef.current[6].x} cy={neuronPositionsRef.current[6].y} r={clickedNeuron === 7 ? 17 : 12} fill="#9B4DFF" className="cursor-pointer" style={{filter: clickedNeuron === 7 ? "drop-shadow(0 0 20px #9B4DFF) drop-shadow(0 0 40px #9B4DFF)" : "drop-shadow(0 0 10px #9B4DFF) drop-shadow(0 0 20px #9B4DFF)"}} onClick={() => {setSelectedSkill('Video/3D'); setClickedNeuron(7);}} />
                <circle cx={neuronPositionsRef.current[7].x} cy={neuronPositionsRef.current[7].y} r={clickedNeuron === 8 ? 17 : 12} fill="#9B4DFF" className="cursor-pointer" style={{filter: clickedNeuron === 8 ? "drop-shadow(0 0 20px #9B4DFF) drop-shadow(0 0 40px #9B4DFF)" : "drop-shadow(0 0 10px #9B4DFF) drop-shadow(0 0 20px #9B4DFF)"}} onClick={() => {setSelectedSkill('Skills'); setClickedNeuron(8);}} />
              </svg>

              {selectedNode && (
                <div 
                  className="absolute bg-dark-bg/95 backdrop-blur-sm p-4 rounded-lg border border-neon-orange/30 animate-in fade-in zoom-in duration-300"
                  style={{
                    left: '50%',
                    top: `${selectedNode * 70 - 30}px`,
                    transform: 'translateX(-50%)',
                    minWidth: '200px',
                    maxWidth: '300px'
                  }}
                >
                  {selectedNode === 1 && (
                    <p className="font-inter text-sm text-white">
                      1. - At the age of 14, Artem began developing in the IT field, doing projects and creating new solutions.
                    </p>
                  )}
                  {selectedNode === 2 && (
                    <p className="font-inter text-sm text-white">
                      2. - After many years of studying motion design, video VFX and CGI, and 3D modeling, Artem plunged fully into the IT industry and began creating his first super powerful project.
                    </p>
                  )}
                  {selectedNode === 3 && (
                    <p className="font-inter text-sm text-white">
                      3. - Artem did many projects, commercial and not, but he needed to create something more - and he started working on his own company - which would work as it should...
                    </p>
                  )}
                  {selectedNode === 4 && (
                    <p className="font-inter text-sm text-white">
                      4. - After creating his first startup that was worthy of work, namely M.A.R.T.I.N. 2.0 based on the neuroagent K.R.A.K.E.N. - Artem decided to present it to the world.
                    </p>
                  )}
                  {selectedNode === 5 && (
                    <p className="font-inter text-sm text-white">
                      5. - Artem's story is incredible, but this is just the beginning of his journey!
                    </p>
                  )}
                  <button onClick={() => {setSelectedNode(null); setClickedNeuron(null);}} className="mt-2 text-neon-orange text-xs hover:underline">Close</button>
                </div>
              )}

              {selectedSkill && (
                <div 
                  className="absolute bg-dark-bg/95 backdrop-blur-sm p-4 rounded-lg border border-neon-pink/30 animate-in fade-in zoom-in duration-300"
                  style={{
                    left: '50%',
                    top: '200px',
                    transform: 'translateX(-50%)',
                    minWidth: '200px',
                    maxWidth: '300px'
                  }}
                >
                  {selectedSkill === 'IT' && (
                    <div>
                      <p className="font-inter text-sm text-neon-orange font-bold mb-2">IT:</p>
                      <p className="font-inter text-xs text-white">python, C++, javascript, react, html, css, node.js, ts</p>
                    </div>
                  )}
                  {selectedSkill === 'Video/3D' && (
                    <div>
                      <p className="font-inter text-sm text-neon-pink font-bold mb-2">Video/3D:</p>
                      <p className="font-inter text-xs text-white">unreal engine, premiere pro, after effects, photoshop, blender, davincs resolve, houdini</p>
                    </div>
                  )}
                  {selectedSkill === 'Skills' && (
                    <div>
                      <p className="font-inter text-sm text-neon-orange font-bold mb-2">skills:</p>
                      <p className="font-inter text-xs text-white">AI, git and github, teamwork, terminal, etc...</p>
                    </div>
                  )}
                  <button onClick={() => {setSelectedSkill(null); setClickedNeuron(null);}} className="mt-2 text-neon-pink text-xs hover:underline">Close</button>
                </div>
              )}
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-[600px] h-[600px]">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-cover rounded-lg"
                style={{
                  boxShadow: "0 0 40px rgba(255,107,53,0.15), 0 0 80px rgba(155,77,255,0.1)",
                }}
              />
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-neon-orange/50" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-neon-pink/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}