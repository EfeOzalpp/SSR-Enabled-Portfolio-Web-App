import { useEffect, useRef, useState } from 'react';
import { useProjectVisibility } from '../../utils/project-visibility.tsx';

import BlockGOnboarding from './block-g-onboarding.tsx';
import ExitButton from './block-g-exit.tsx';
import CoinCounter from './block-g-coin-counter.tsx';
import CountdownDisplay from './block-g-countdown.tsx';
import BlockGGameOver from './block-g-game-over.tsx';

import { isMobile } from 'react-device-detect';

import q5 from 'q5';

const RockEscapade = () => {
  const canvasRef = useRef(null);
  const q5InstanceRef = useRef(null);

  const [initialized, setInitialized] = useState(false);

  const [overlayVisible, setOverlayVisible] = useState(true); // track overlay visibility
  const { setBlockGClick } = useProjectVisibility();

  const [resetKey, setResetKey] = useState(0); // Reset overlay
  const [coins, setCoins] = useState(0); // Track coins 

  const [showCountdown, setShowCountdown] = useState(false); // Track countdown 
  const [countdown, setCountdown] = useState(3);

  // Touch movement
  const touchStartRef = useRef({ x: 0, y: 0 });
  const activeTouchRef = useRef(false);

  // Check if thee q5.js canvas is initialized
  useEffect(() => {
    if (!initialized) setInitialized(true);
  }, [initialized]);

  // Onboarding component const
  const handleOnboardingStart = () => {
    setOverlayVisible(false);
    setBlockGClick(true);
    setShowCountdown(true); // show countdown for 3 seconds
  };

  // Constant resize canvas to fit changes
  useEffect(() => {
    const handleResize = () => {
      if (q5InstanceRef.current) {
        q5InstanceRef.current.resizeCanvas(window.innerWidth, window.innerHeight);
      }
    };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  // Position above others when overlayVisible is false
  useEffect(() => {
      if (!initialized) return;

      const canvasContainer = canvasRef.current;
      if (canvasContainer) {
        if (!overlayVisible) {
          canvasContainer.style.position = 'fixed';
          canvasContainer.style.top = '0';
          canvasContainer.style.left = '0';
          canvasContainer.style.zIndex = '9999';
        } else {
          canvasContainer.style.position = 'relative';
          canvasContainer.style.top = '';
          canvasContainer.style.left = '';
          canvasContainer.style.zIndex = '';
        }
      }
    }, [initialized, overlayVisible]);

  // Q5.js canvas features
  useEffect(() => {
    if (!initialized) return;

    const sketch = (p) => {

      // Declare non-react visible Q5.JS variables
      let verticalMode = window.innerWidth < 768 && window.innerHeight > window.innerWidth;

      let rectangles = [];
      let octagons = [];
      let particles = [];
      let circle;
      let lastSpawnTime = 0;
      let lastOctagonSpawnTime = 0;
      let maxOctagons = 2;
      let rectangleSpawnRate = 2;
      let localCoins = 0;
      let gameOver = false;
      let fadeAlpha = 0;
      let spawnEnabled = false;

      let movingUp = false;
      let movingDown = false;
      let movingLeft = false;
      let movingRight = false;

      let w, h;
      
      // Setup the canvas
      p.setup = () => {

        // Delay spawning for when the gameplay mode, aka overlayVisible is false
        if (!overlayVisible) {
        setTimeout(() => {
        spawnEnabled = true;
        }, 3000); // delay spawning by 3
        }

        // Match the canvas size to the viewport height + width
        if (!overlayVisible) {
          w = window.innerWidth;
          h = window.innerHeight;
        } else {
          w = canvasRef.current?.clientWidth || 400;
          h = canvasRef.current?.clientHeight || 400;
        }

        p.createCanvas(w, h);
        
        // Max octagon at a time to 1 and spawn rate to 3 for mobile devices
        if (window.innerWidth < 768) {
          maxOctagons = 1;
          rectangleSpawnRate = 3;
        }

        // Render the user circle
        circle = new Circle(p, 240, h / 2, 33);
        q5InstanceRef.current.circle = circle;
      }; // End of p.setup

      // Render inside canvas
      p.draw = () => {

        setCoins(localCoins);

        if (overlayVisible) {
          p.background(25);

          // Auto-evade logic for preview mode
          autoEvade();

          circle.update();
          circle.display();

          // Spawn rectangles
          spawnRectangles();
          updateRectangles();
          // Spawn octagons
          spawnOctagons();
          updateOctagons(); // Disable collection but keep particle trail

          // display particles
            if (particles.length > 300) particles.splice(0, particles.length - 300);

            for (let i = particles.length - 1; i >= 0; i--) {
              let part = particles[i];
              part.update();
              part.display();
              if (part.isDead()) particles.splice(i, 1);
            }
          return;
        }

        // Game over changes
        if (gameOver) {
          p.background(25, fadeAlpha);
          fadeAlpha = p.min(fadeAlpha + 5, 255);
          p.fill(255, fadeAlpha);
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(64);
          p.text("GAME OVER", p.width / 2, p.height / 2);
          p.textSize(32);
          p.text("Press SPACE to Restart", p.width / 2, p.height / 2 + 100);
          return;
        }

        p.background(25);

        if (movingUp) circle.moveUp(); else if (movingDown) circle.moveDown(); else circle.stopVertical();
        if (movingLeft) circle.moveLeft(); else if (movingRight) circle.moveRight(); else circle.stopHorizontal();

        circle.update();
        circle.display();

        if (spawnEnabled) {
          spawnRectangles();
        }
        updateRectangles(true);

        if (p.millis() > 4000) { // wait 4 seconds before spawning octagons
          spawnOctagons();
        }

        for (let i = octagons.length - 1; i >= 0; i--) {
          let o = octagons[i];
          o.update();
          o.display();

          if (circle.overlaps(o)) {
          localCoins += 20;
          setCoins(prev => prev + 20);
            for (let j = 0; j < 10; j++) particles.push(new Particle(p, o.x + o.size / 2, o.y + o.size / 2, 255, o.c));
            octagons.splice(i, 1);
          }

          let speed = Math.abs(o.vx) + Math.abs(o.vy);
          let numParticles = p.constrain(speed * 0.3, 0, 2);
          for (let j = 0; j < numParticles; j++) {
            particles.push(new Particle(p, o.x + o.size / 2, o.y + o.size / 2, 255, o.c));
          }
        }

        if (particles.length > 300) particles.splice(0, particles.length - 300);

        for (let i = particles.length - 1; i >= 0; i--) {
          let part = particles[i];
          part.update();
          part.display();
          if (part.isDead()) particles.splice(i, 1);
        }
      }; // End of p.draw
      
      // Spawn Rectangles
      const spawnRectangles = () => {
        let rectanglesInViewport = rectangles.filter(r => r.x + r.w > 0).length;
        if (rectanglesInViewport < 10) rectangleSpawnRate = 5;
        else if (rectanglesInViewport < 13) rectangleSpawnRate = 3;
        else if (rectanglesInViewport < 18) rectangleSpawnRate = 2;
        else rectangleSpawnRate = 0;

        if (rectangleSpawnRate > 0 && p.millis() - lastSpawnTime > 2000 / rectangleSpawnRate && rectangles.length < 25) {
          rectangles.push(new Shape(p, true, false, verticalMode));
          lastSpawnTime = p.millis();
        }
      };

      // Update Rectanglee
      const updateRectangles = () => {
        for (let i = rectangles.length - 1; i >= 0; i--) {
          let r = rectangles[i];
          r.update();
          r.display();

          if (circle.overlaps(r)) gameOver = true;

          if (verticalMode ? r.y - r.h > p.height : r.x + r.w < 0) rectangles.splice(i, 1);
        }

        // Resolve collisions between rectangles
        for (let i = 0; i < rectangles.length; i++) {
          let r1 = rectangles[i];
          for (let j = i + 1; j < rectangles.length; j++) {
            let r2 = rectangles[j];
            if (r1.overlaps(r2)) r1.resolveCollision(r2);
          }
        }
      };

      // Spawn octagons
      const spawnOctagons = () => {
        if (p.millis() - lastOctagonSpawnTime > 2000 && octagons.length < maxOctagons) {
          if (p.random() < 0.5) octagons.push(new Shape(p, true, true, verticalMode));
          lastOctagonSpawnTime = p.millis();
        }
      };

      // Update the octagons
      const updateOctagons = () => {
        for (let i = octagons.length - 1; i >= 0; i--) {
          let o = octagons[i];
          o.update();
          o.display();

          if (circle.overlaps(o)) {
            localCoins += 20;
            setCoins(prev => prev + 20);
            for (let j = 0; j < 30; j++) { // increased from 10 to 30
              let particle = new Particle(p, o.x + o.size / 2, o.y + o.size / 2, 255, o.c);
              // give it a stronger initial velocity burst
              particle.vx = p.random(-2, 2);
              particle.vy = p.random(-2, 2);
              particles.push(particle);
            }
            octagons.splice(i, 1);
          }

          let speed = Math.abs(o.vx) + Math.abs(o.vy);
          let numParticles = p.constrain(speed * 0.3, 0, 2);
          for (let j = 0; j < numParticles; j++) {
            particles.push(new Particle(p, o.x + o.size / 2, o.y + o.size / 2, 255, o.c));
          }

          if (verticalMode ? o.y - o.size > p.height : o.x + o.size < 0) {
            octagons.splice(i, 1);
          }
        }
      };

      // Auto evade the rectangles and seek octagons during preview (overlayDisplay is true)
      const autoEvade = () => {
        let evadeForceX = 0;
        let evadeForceY = 0;
        let dangerLevel = 0;

        rectangles.forEach(rect => {
          let rectCenterX = rect.x + rect.w / 2;
          let rectCenterY = rect.y + rect.h / 2;
          let dx = circle.x - rectCenterX;
          let dy = circle.y - rectCenterY;
          let distSq = dx * dx + dy * dy;

          if (distSq < 10000) { // ~1000px radius
          let dist = Math.sqrt(distSq) || 1;
          let weight = 1 / (dist + 300); // +50 to prevent extreme near-field force
          let force = weight * 150; // adjust multiplier for overall strength


            evadeForceX += (dx / dist) * force;
            evadeForceY += (dy / dist) * force;

            // Increase danger level exponentially closer
            dangerLevel += (1 / (dist + 1)) * 10;
          }
        });

        let attractForceX = 0;
        let attractForceY = 0;

        // Only seek octagon if not in extreme danger
        if (octagons.length > 0 && dangerLevel < 50) {
          let closestOctagon = octagons.reduce((prev, curr) => {
            let prevDist = p.dist(circle.x, circle.y, prev.x + prev.size / 2, prev.y + prev.size / 2);
            let currDist = p.dist(circle.x, circle.y, curr.x + curr.size / 2, curr.y + curr.size / 2);
            return currDist < prevDist ? curr : prev;
          });

          let dx = (closestOctagon.x + closestOctagon.size / 2) - circle.x;
          let dy = (closestOctagon.y + closestOctagon.size / 2) - circle.y;
          let dist = Math.sqrt(dx * dx + dy * dy) || 1;

          attractForceX = (dx / dist) * 0.25;
          attractForceY = (dy / dist) * 0.25;
        }

        // Combine forces with priority to evasion
        circle.ax = evadeForceX + attractForceX;
        circle.ay = evadeForceY + attractForceY;

        // If no forces are active, drift gently to center
        if (circle.ax === 0 && circle.ay === 0) {
          let centerDx = (p.width / 2) - circle.x;
          let centerDy = (p.height / 2) - circle.y;
          let centerDist = Math.sqrt(centerDx * centerDx + centerDy * centerDy) || 1;
          circle.ax = (centerDx / centerDist) * 0.1;
          circle.ay = (centerDy / centerDist) * 0.1;
        }
      };

      // Desktop Navigation
      p.keyPressed = () => {
        if (p.key === 'w' || p.keyCode === p.UP_ARROW) movingUp = true;
        if (p.key === 's' || p.keyCode === p.DOWN_ARROW) movingDown = true;
        if (p.key === 'a' || p.keyCode === p.LEFT_ARROW) movingLeft = true;
        if (p.key === 'd' || p.keyCode === p.RIGHT_ARROW) movingRight = true;
        if (p.keyCode === 32 && gameOver) restartGame();
      };

      p.keyReleased = () => {
        if (p.key === 'w' || p.keyCode === p.UP_ARROW) movingUp = false;
        if (p.key === 's' || p.keyCode === p.DOWN_ARROW) movingDown = false;
        if (p.key === 'a' || p.keyCode === p.LEFT_ARROW) movingLeft = false;
        if (p.key === 'd' || p.keyCode === p.RIGHT_ARROW) movingRight = false;
      };

      // Rstart the game puts the gameOver to false position triggering rendering with !displayOverlay
      const restartGame = () => {
        gameOver = false;
        fadeAlpha = 0;
        localCoins = 0;
        setCoins(0);
        rectangles = [];
        octagons = [];
        particles = [];
        for (let i = 0; i < maxOctagons; i++) octagons.push(new Shape(p, true, true, verticalMode));
        circle = new Circle(p, 240, p.height / 2, 33);
      };

      // Q5.js classes for shapes, user control, and particle effects
      class Circle {
        constructor(p, x, y, r) {
          this.p = p;
          this.x = x;
          this.y = y;
          this.vx = 0;
          this.vy = 0;
          this.ax = 0;
          this.ay = 0;
          this.radius = r;
          this.c = p.color(200, 150, 255);
          this.trail = [];
        }

        update() {
          this.vx += this.ax;
          this.vy += this.ay;
          this.vx *= 0.92;
          this.vy *= 0.92;
          this.x += this.vx;
          this.y += this.vy;

          if (this.y + this.radius < 0) this.y = this.p.height + this.radius;
          else if (this.y - this.radius > this.p.height) this.y = -this.radius;

          if (this.x + this.radius < 0) this.x = this.p.width + this.radius;
          else if (this.x - this.radius > this.p.width) this.x = -this.radius;

          this.trail.push(this.p.createVector(this.x, this.y));
          if (this.trail.length > 8) this.trail.shift();

          let speedLimit = 10;
          this.vx = this.p.constrain(this.vx, -speedLimit, speedLimit);
          this.vy = this.p.constrain(this.vy, -speedLimit, speedLimit);
        }

        display() {
          for (let i = 0; i < this.trail.length; i++) {
            let pos = this.trail[i];
            let alpha = this.p.map(i, 0, this.trail.length - 1, 30, 100);
            let trailRadius = this.p.map(i, 0, this.trail.length - 1, this.radius / 2, this.radius);
            this.p.fill(200, 150, 255, alpha);
            this.p.noStroke();
            this.p.ellipse(pos.x, pos.y, trailRadius, trailRadius);
          }
          this.p.fill(this.c);
          this.p.noStroke();
          this.p.ellipse(this.x, this.y, this.radius, this.radius);
        }

        moveUp() { this.ay = -0.5; }
        moveDown() { this.ay = 0.5; }
        moveLeft() { this.ax = -0.5; }
        moveRight() { this.ax = 0.5; }
        stopVertical() { this.ay = 0; }
        stopHorizontal() { this.ax = 0; }

        overlaps(other) {
          if (other.isOctagon) {
            let distToOther = this.p.dist(this.x, this.y, other.x + other.size / 2, other.y + other.size / 2);
            return distToOther < this.radius + other.size / 2;
          } else {
            let closestX = this.p.constrain(this.x, other.x, other.x + other.w);
            let closestY = this.p.constrain(this.y, other.y, other.y + other.h);
            let distance = this.p.dist(this.x, this.y, closestX, closestY);
            return distance < this.radius * 0.3;
          }
        }
      }

      class Shape {
        constructor(p, startOffScreen, isOctagon, verticalMode) {
          this.p = p;
          this.isOctagon = isOctagon;
          this.verticalMode = verticalMode;
          this.reset(startOffScreen);
        }

        reset(startOffScreen) {
          if (this.verticalMode) {
            this.x = this.p.random(this.p.width);
            this.y = startOffScreen ? -this.p.random(60, 120) : this.p.random(this.p.height);
            this.vx = this.isOctagon ? this.p.random(-0.5, 0.5) : this.p.random(-0.5, 0.5);
            this.vy = this.p.random(1.2, 3);
          } else {
            this.x = startOffScreen ? this.p.width + this.p.random(10, 40) : this.p.random(this.p.width);
            this.y = this.p.random(this.p.height);
            this.vx = this.p.random(-2, -1);
            this.vy = this.isOctagon ? this.p.random(-0.5, 0.5) : this.p.random(-0.5, 0.5);
          }
          this.rotation = 0;
          this.rotationSpeed = this.p.random(-1, 1);

          if (this.isOctagon) {
            this.size = 25;
            this.c = this.p.color(255, 245, 50);
          } else {
            this.w = this.p.random(30, 75);
            this.h = this.p.random(30, 75);
            this.c = this.p.color(245, 235, 255);
          }
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.rotation += this.rotationSpeed;
        }

        display() {
          this.p.push();
          this.p.translate(this.x + (this.isOctagon ? this.size / 2 : this.w / 2), this.y + (this.isOctagon ? this.size / 2 : this.h / 2));
          this.p.rotate(this.p.radians(this.rotation));
          this.p.fill(this.c);
          this.p.noStroke();
          if (this.isOctagon) this.drawOctagon(0, 0, this.size);
          else {
            this.p.rectMode(this.p.CENTER);
            this.p.rect(0, 0, this.w, this.h);
          }
          this.p.pop();
        }

        drawOctagon(x, y, size) {
          let angleStep = this.p.TWO_PI / 8;
          this.p.beginShape();
          for (let i = 0; i < 8; i++) {
            let angle = i * angleStep;
            let px = x + this.p.cos(angle) * size / 2;
            let py = y + this.p.sin(angle) * size / 2;
            this.p.vertex(px, py);
          }
          this.p.endShape(this.p.CLOSE);
        }

        overlaps(other) {
          let thisW = this.isOctagon ? this.size : this.w;
          let thisH = this.isOctagon ? this.size : this.h;
          let otherW = other.isOctagon ? other.size : other.w;
          let otherH = other.isOctagon ? other.size : other.h;

          return !(this.x + thisW < other.x || this.x > other.x + otherW || this.y + thisH < other.y || this.y > other.y + otherH);
        }

        resolveCollision(other) {
          let thisW = this.isOctagon ? this.size : this.w;
          let thisH = this.isOctagon ? this.size : this.h;
          let otherW = other.isOctagon ? other.size : other.w;
          let otherH = other.isOctagon ? other.size : other.h;

          let overlapX = Math.min(this.x + thisW, other.x + otherW) - Math.max(this.x, other.x);
          let overlapY = Math.min(this.y + thisH, other.y + otherH) - Math.max(this.y, other.y);

          if (overlapX < overlapY) {
            if (this.x < other.x) { this.x -= overlapX / 2; other.x += overlapX / 2; }
            else { this.x += overlapX / 2; other.x -= overlapX / 2; }
            this.vx *= -1; other.vx *= -1;
          } else {
            if (this.y < other.y) { this.y -= overlapY / 2; other.y += overlapY / 2; }
            else { this.y += overlapY / 2; other.y -= overlapY / 2; }
            this.vy *= -1; other.vy *= -1;
          }
        }
      }

      class Particle {
        constructor(p, x, y, lifespan = 255, c = p.color(255, 215, 0)) {
          this.p = p;
          this.x = x;
          this.y = y;
          this.vx = p.random(-0.5, 0.5);
          this.vy = p.random(-0.5, 0.5);
          this.lifespan = lifespan;
          this.c = c;
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.lifespan -= 3;
        }

        display() {
          this.p.noStroke();
          this.p.fill(this.c.levels[0], this.c.levels[1], this.c.levels[2], this.lifespan);
          this.p.ellipse(this.x, this.y, 3, 3);
        }

        isDead() {
          return this.lifespan <= 0;
        }
      }
    };

  const q5Instance = new q5(sketch, canvasRef.current);
  q5InstanceRef.current = q5Instance;
    return () => {
      if (q5Instance && q5Instance.remove) q5Instance.remove();
      if (canvasRef.current) canvasRef.current.innerHTML = '';
    };
  }, [initialized, overlayVisible]);

  // Countdown for the game started
  useEffect(() => {
    if (!showCountdown) return;

    setCountdown(3);
    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      setCountdown(current);
      if (current <= 0) {
        clearInterval(interval);
        setShowCountdown(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [showCountdown]);

  // Exit button state changes 
  const handleExit = () => {
    setOverlayVisible(true);
    setBlockGClick(false);
    setShowCountdown(false);
    setResetKey(prev => prev + 1); // trigger onboarding reset
  };

  // Event handler for touch based interaction
  useEffect(() => {
    if (!initialized) return;

    const attachTouchListeners = () => {
      const canvas = document.querySelector('.evade-the-rock canvas');
      if (!canvas) {
        console.log('Canvas not found yet for touch listener – retrying.');
        setTimeout(attachTouchListeners, 100);
        return;
      }

      console.log('Attaching touch listeners to canvas for impulse-based drag.');

      let lastTouchPosition = null;

      const handleTouchMove = (e) => {
        if (!q5InstanceRef.current || !q5InstanceRef.current.circle) return;

        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;

        const circle = q5InstanceRef.current.circle;

        if (lastTouchPosition) {
          const dx = touchX - lastTouchPosition.x;
          const dy = touchY - lastTouchPosition.y;

          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const forceMultiplier = 0.4; // Adjust for sensitivity

          // Apply as impulse to velocity directly
          circle.vx += (dx / dist) * forceMultiplier;
          circle.vy += (dy / dist) * forceMultiplier;
        }

        lastTouchPosition = { x: touchX, y: touchY };

        e.preventDefault();
      };

      const handleTouchEnd = () => {
        console.log('Touch ended.');
        lastTouchPosition = null;
        // No velocity reset – friction will decay it naturally
      };

      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', handleTouchEnd);

      return () => {
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      };
    };

    attachTouchListeners();
  }, [initialized, overlayVisible]);

  // Return HTML structure
return (
  <section className="block-type-g" id="block-g" style={{ position: 'relative' }}>
    <div className="evade-the-rock" style={{ width: '100%', height: '100%' }} ref={canvasRef}></div>
    <BlockGOnboarding onStart={handleOnboardingStart} resetTrigger={resetKey} />
    {!overlayVisible && <ExitButton onExit={handleExit} />}
    {!overlayVisible && <CoinCounter coins={coins} />}
    {showCountdown && <CountdownDisplay countdown={countdown} />}
  </section>
  );
};

export default RockEscapade;
