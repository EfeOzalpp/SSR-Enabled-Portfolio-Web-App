import { useEffect, useRef, useState } from 'react';
import { useProjectVisibility } from '../../utils/project-context.tsx';

import { updateHighScore } from './updateHighScore.js';
import { useHighScoreSubscription } from './subscribeHighScore.js';

import BlockGOnboarding from './block-g-onboarding.tsx';
import ExitButton from './block-g-exit.tsx';
import CoinCounter from './block-g-coin-counter.tsx';
import CountdownDisplay from './block-g-countdown.tsx';
import BlockGGameOver from './block-g-game-over.tsx';

import { isMobile, isTablet, isDesktop } from 'react-device-detect';

import q5 from 'q5';

const RockEscapade = () => {

  const highScore = useHighScoreSubscription();

  const canvasRef = useRef(null);
  const q5InstanceRef = useRef(null);

  const [initialized, setInitialized] = useState(false);

  const [overlayVisible, setOverlayVisible] = useState(true); // track overlay visibility
  const { setBlockGClick } = useProjectVisibility();

  const [resetKey, setResetKey] = useState(0); // Reset overlay
  const [coins, setCoins] = useState(0); // Track coins 

  const [showCountdown, setShowCountdown] = useState(false); // Track countdown 
  const [countdown, setCountdown] = useState(3);

  const [gameOverVisible, setGameOverVisible] = useState(false); // Track game over state

  const [newHighScore, setNewHighScore] = useState(false);

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

  const handleRestart = () => {
    setGameOverVisible(false);
    setNewHighScore(false); // Reset here when a new game starts

    if (q5InstanceRef.current && q5InstanceRef.current.restartGame) {
      q5InstanceRef.current.restartGame();
    }
  };

  // Constant resize canvas to fit changes
  useEffect(() => {
    const handleResize = () => {
      const container = canvasRef.current; // ADD THIS LINE
      if (q5InstanceRef.current && container) {
        q5InstanceRef.current.resizeCanvas(container.offsetWidth, container.offsetHeight);
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
          canvasContainer.style.zIndex = '1500';
        } else {
          canvasContainer.style.position = 'relative';
          canvasContainer.style.top = '';
          canvasContainer.style.left = '';
          canvasContainer.style.zIndex = '';
        }
      }
    }, [initialized, overlayVisible]);

    // Remove spacebar or arrowdown to avoid page scroll during fullscreen mode    
  useEffect(() => {
      const handleWheel = (e) => {
        if (!overlayVisible) {
          e.preventDefault();
        }
      };

      const handleKeyDown = (e) => {
        if (!overlayVisible && (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
          e.preventDefault();
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [overlayVisible]);

  useEffect(() => {
    const navMenu = document.querySelector('.nav-menu');

    if (!navMenu) return;

    if (!overlayVisible) {
      navMenu.style.zIndex = '0'; // push it behind gameplay
    } else {
      navMenu.style.zIndex = ''; // restore default
    }

  }, [overlayVisible]);

  // Q5.js canvas features
  useEffect(() => {
    if (!initialized) return;

    const sketch = (p) => {

      // Declare non-react visible Q5.JS variables
      let verticalMode = window.innerWidth <= 1024 && window.innerHeight > window.innerWidth;

      let rectangles = []; // obstacles
      let octagons = []; // money currency
      let particles = []; // particle effect
      let projectiles = []; // fire projectiles 
      let circle;
      let lastSpawnTime = 0;
      let lastOctagonSpawnTime = 0;
      let rectangleSpawnRate = 2;
      let localCoins = 0;
      let gameOver = false;
      let fadeAlpha = 0;
      let spawnEnabled = false;
      let prevGameOver = false; // inside sketch scope

      let lastFiredTime = -Infinity; // initially allows immediate fire
      let cooldownDuration = 1500; // in ms

      let cooldownRadiusMax = 48;
      let cooldownRadius = 0;

      let movingUp = false;
      let movingDown = false;
      let movingLeft = false;
      let movingRight = false;

      let w, h;

      const restartGame = () => {
        gameOver = false;
        fadeAlpha = 0;
        localCoins = 0;
        setCoins(0);
        rectangles = [];
        octagons = []; // clear all octagons
        particles = [];
        circle = new Circle(p, 240, p.height / 2, 33);
        q5InstanceRef.current.circle = circle;
        lastOctagonSpawnTime = p.millis(); // reset spawn timer
      };

      // attach to p
      p.restartGame = restartGame;

      // Setup the canvas
      p.setup = () => {
        // Always match canvas size to window dimensions
        const container = canvasRef.current;
        w = container ? container.offsetWidth : window.innerWidth;
        h = container ? container.offsetHeight : window.innerHeight;

        p.createCanvas(w, h);

        // Start octagon spawning immediately regardless of overlay mode
        lastOctagonSpawnTime = p.millis();

        // Delay rectangle spawn if starting gameplay (as your prior logic intended)
        if (!overlayVisible) {
          setTimeout(() => {
            spawnEnabled = true;
          }, 3000); // delay spawning by 3s for gameplay onboarding
        } else {
          spawnEnabled = true; // enable spawn immediately in preview
        }

        // Render the user circle
        circle = new Circle(p, 240, h / 2, 33);
        q5InstanceRef.current.circle = circle;
      };

      // Render inside canvas
      p.draw = () => {
        let delta = p.deltaTime / 16.67;

        setCoins(localCoins);

        p.background(25);

        if (overlayVisible) {
          autoEvade();
        } else {
          if (movingUp) circle.moveUp(); else if (movingDown) circle.moveDown(); else circle.stopVertical();
          if (movingLeft) circle.moveLeft(); else if (movingRight) circle.moveRight(); else circle.stopHorizontal();
        }

        circle.update(delta);
        circle.display();

        if (spawnEnabled || overlayVisible) {
          spawnRectangles();
        }
        updateRectangles(delta);

        spawnOctagons();
        updateOctagons(delta);

        if (!isMobile) {
          p.blendMode(p.ADD);
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          let part = particles[i];
          part.update(delta);
          part.display();
          if (part.isDead()) particles.splice(i, 1);
        }
        p.blendMode(p.BLEND);

        for (let i = projectiles.length - 1; i >= 0; i--) {
          let proj = projectiles[i];
          proj.update(delta);
          proj.display();
          if (proj.isDead()) projectiles.splice(i, 1);
        }

        if (!overlayVisible) {
          if (!prevGameOver && gameOver) {
            setGameOverVisible(true);
            if (localCoins > highScore) {
              updateHighScore(localCoins);
            }
          }

          if (localCoins > highScore) {
            setNewHighScore(true);
          } else {
            setNewHighScore(false);
          }

          prevGameOver = gameOver;

          if (gameOver) {
            p.background(25, fadeAlpha);
            fadeAlpha = p.min(fadeAlpha + 30 * delta, 255);
            return;
          }

          let cooldownElapsed = p.millis() - lastFiredTime;
          if (cooldownElapsed < cooldownDuration) {
            let remaining = cooldownDuration - cooldownElapsed;
            let cooldownProgress = remaining / cooldownDuration;
            let indicatorRadius = cooldownProgress * cooldownRadiusMax;

            p.noStroke();
            p.fill(200, 150, 255, 100);
            p.ellipse(circle.x, circle.y, indicatorRadius * 2, indicatorRadius * 2);
          }
        }
      }; // End of p.draw

      // Spawn Rectangles
      const spawnRectangles = () => {
        let rectanglesInViewport = rectangles.filter(r => {
          // Determine if rectangle is within visible viewport
          if (verticalMode) {
            return r.y + r.h > 0 && r.y < p.height;
          } else {
            return r.x + r.w > 0 && r.x < p.width;
          }
        }).length;

        let maxRectangles;
        let timeElapsed = p.millis() / 1000; // seconds since sketch start

        if (window.innerWidth >= 1025) {
          maxRectangles = 50;

          if (rectanglesInViewport < 10) rectangleSpawnRate = 6;
          else if (rectanglesInViewport < 25) rectangleSpawnRate = 5;
          else if (rectanglesInViewport < 40) rectangleSpawnRate = 4;
          else rectangleSpawnRate = 0;

        } else if (window.innerWidth >= 768) {
          maxRectangles = 60;

          if (rectanglesInViewport < 8) rectangleSpawnRate = 5;
          else if (rectanglesInViewport < 20) rectangleSpawnRate = 4;
          else if (rectanglesInViewport < 40) rectangleSpawnRate = 3;
          else rectangleSpawnRate = 0;

        } else {
          maxRectangles = 25;

          if (rectanglesInViewport < 10) rectangleSpawnRate = 4;
          else if (rectanglesInViewport < 20) rectangleSpawnRate = 3;
          else rectangleSpawnRate = 1;
        }

        // Introduce initial spawn buffer to reduce early clutter
        let initialSpawnBuffer = timeElapsed < 10 ? 1.5 : 1; // 50% longer spawn interval first 10s

        // Spawn if under viewport cap instead of total array cap
        if (
          rectangleSpawnRate > 0 &&
          p.millis() - lastSpawnTime > (2000 / rectangleSpawnRate) * initialSpawnBuffer &&
          rectanglesInViewport < maxRectangles
        ) {
          rectangles.push(new Shape(p, true, false, verticalMode));
          lastSpawnTime = p.millis();
        }

        // Periodic cleanup every 5s to remove any stale or NaN rectangles
        if (p.millis() % 5000 < 20) {
          rectangles = rectangles.filter(r => !isNaN(r.x) && !isNaN(r.y));
        }
      };

      // Update Rectanglee
      const updateRectangles = (delta) => {
        for (let i = rectangles.length - 1; i >= 0; i--) {
          let r = rectangles[i];
          r.update(delta);
          r.display();

          if (circle.overlaps(r)) gameOver = true;

          // Expanded offscreen removal with buffer
          let offscreen = verticalMode
            ? r.y - r.h > p.height + 100 || r.y + r.h < -100
            : r.x + r.w < -100 || r.x - r.w > p.width + 100;

          if (offscreen) {
            rectangles.splice(i, 1);
            continue;
          }
        }

        // Collision resolution
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
        if (p.millis() - lastOctagonSpawnTime > 2000) {
          if (octagons.length === 0) { // only spawn one if none exist
            octagons.push(new Shape(p, true, true, verticalMode));
          }
          lastOctagonSpawnTime = p.millis();
        }
      };

      // Update the octagons
      const updateOctagons = (delta) => {
        let buffer = 150;

        for (let i = octagons.length - 1; i >= 0; i--) {
          let o = octagons[i];
          o.update(delta);
          o.display();

          if (circle.overlaps(o)) {
            localCoins += 20;
            setCoins(prev => prev + 20);

          for (let j = 0; j < 10; j++) {
            particles.push(new Particle(p, o.x + o.size / 2, o.y + o.size / 2, 255, o.c, 0, 0, 5));
          }

            octagons.splice(i, 1);
            continue;
          }

          let speed = Math.abs(o.vx) + Math.abs(o.vy);
          let numParticles;
          if (speed < 1) numParticles = 0.05;
          else if (speed < 3) numParticles = 0.1;
          else if (speed < 6) numParticles = 0.2;
          else numParticles = 0.3;

          let particlesToSpawn = Math.floor(numParticles);
          let fractionalPart = numParticles - particlesToSpawn;

          for (let j = 0; j < particlesToSpawn; j++) {
            particles.push(new Particle(p, o.x + o.size / 2, o.y + o.size / 2, 255, o.c));
          }

          if (p.random() < fractionalPart) {
            particles.push(new Particle(p, o.x + o.size / 2, o.y + o.size / 2, 255, o.c));
          }

          if (
            o.x + o.size < -buffer || 
            o.x - o.size > p.width + buffer ||
            o.y + o.size < -buffer ||
            o.y - o.size > p.height + buffer
          ) {
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

          if (distSq < 20000) { 
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

          attractForceX = (dx / dist) * 0.45;
          attractForceY = (dy / dist) * 0.45;
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
        if (p.key === ' ' || p.key === 'Spacebar') {
          let now = p.millis();
          if (now - lastFiredTime >= cooldownDuration) {
            lastFiredTime = now;

            if (circle) {
              let proj = new Projectile(
                p,
                circle.x,
                circle.y,
                circle.vx !== 0 || circle.vy !== 0 ? circle.vx : 5,
                circle.vy !== 0 || circle.vx !== 0 ? circle.vy : 0
              );
              projectiles.push(proj);
            }
          }
        }
        if (p.key === 'w' || p.keyCode === p.UP_ARROW) movingUp = true;
        if (p.key === 's' || p.keyCode === p.DOWN_ARROW) movingDown = true;
        if (p.key === 'a' || p.keyCode === p.LEFT_ARROW) movingLeft = true;
        if (p.key === 'd' || p.keyCode === p.RIGHT_ARROW) movingRight = true;
      };

      p.keyReleased = () => {
        if (p.key === 'w' || p.keyCode === p.UP_ARROW) movingUp = false;
        if (p.key === 's' || p.keyCode === p.DOWN_ARROW) movingDown = false;
        if (p.key === 'a' || p.keyCode === p.LEFT_ARROW) movingLeft = false;
        if (p.key === 'd' || p.keyCode === p.RIGHT_ARROW) movingRight = false;
      };

      p.touchStarted = () => {
        if (overlayVisible) return;

        // Fire projectile only if touch count is 1 (single tap) and not moving
        if (p.touches.length === 1) {
          const now = p.millis();
          if (now - lastFiredTime >= cooldownDuration) {
            lastFiredTime = now;

            const vx = circle.vx !== 0 || circle.vy !== 0 ? circle.vx : 5;
            const vy = circle.vy !== 0 || circle.vx !== 0 ? circle.vy : 0;

            projectiles.push(new Projectile(p, circle.x, circle.y, vx, vy));
          }
        }

        return false; // prevent default
      };

      p.touchMoved = () => {
        // Movement logic here (if needed)
        return false;
      };

      p.touchEnded = () => {
        return false;
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

        update(delta) {
          this.vx += this.ax * delta;
          this.vy += this.ay * delta;

          this.vx *= Math.pow(0.92, delta);
          this.vy *= Math.pow(0.92, delta);

          this.x += this.vx * delta;
          this.y += this.vy * delta;

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

            if (this.isOctagon) {
              if (startOffScreen) {
                // Spawn just above the visible area
                this.y = -this.p.random(30, 60);
              } else {
                // Fallback random position within viewport if needed
                this.y = this.p.random(this.p.height);
              }

              this.vx = this.p.random(-1.2, 1.2);

              if (this.p.random() < 0.1) {
                this.vy = this.p.random(6, 9);
              } else if (this.p.random() < 0.2) {
                this.vy = this.p.random(0.5, 1.5);
              } else {
                this.vy = this.p.random(2, 5);
              }

              this.size = 25;

              const playfulColors = [
                this.p.color(255, 215, 0),
                this.p.color(255, 223, 70),
                this.p.color(255, 200, 0),
                this.p.color(255, 170, 50),
              ];
              this.c = this.p.random(playfulColors);
            } else {
              this.y = startOffScreen
                ? -this.p.random(60, 120)
                : this.p.random(this.p.height);

              this.vx = this.p.random(-0.5, 0.5);
              this.vy = this.p.random(1, 3);

              this.w = this.p.random(28, 70);
              this.h = this.p.random(28, 70);
              this.c = this.p.color(235, 235, 255);
            }
          } else {
            if (startOffScreen) {
              // Spawn just beyond right edge for horizontal gameplay
              this.x = this.p.width + this.p.random(10, 40);
            } else {
              this.x = this.p.random(this.p.width);
            }

            this.y = this.p.random(this.p.height);

            if (this.isOctagon) {
              let baseSpeedX = this.p.random(-2.5, -0.5);
              if (window.innerWidth >= 1025 && window.innerWidth > window.innerHeight) {
                baseSpeedX *= 4.5;
              }

              if (this.p.random() < 0.1) {
                baseSpeedX *= 2;
              } else if (this.p.random() < 0.2) {
                baseSpeedX *= 0.5;
              }

              this.vx = baseSpeedX;
              this.vy = this.p.random(-0.3, 0.3);

              this.size = 25;

              const playfulColors = [
                this.p.color(255, 215, 0),
                this.p.color(255, 223, 70),
                this.p.color(255, 200, 0),
                this.p.color(255, 170, 50),
              ];
              this.c = this.p.random(playfulColors);
            } else {
              this.vx = this.p.random(-3, -1);
              this.vy = this.p.random(-0.5, 0.5);

              if (window.innerWidth >= 1025 && window.innerWidth > window.innerHeight) {
                this.w = this.p.random(33, 105);
                this.h = this.p.random(33, 105);
              } else {
                this.w = this.p.random(30, 75);
                this.h = this.p.random(30, 75);
              }

              this.c = this.p.color(235, 235, 255);
            }
          }

          this.rotation = 0;
          this.rotationSpeed = this.p.random(-1, 1);
        }

        update(delta) {
          this.x += this.vx * delta;
          this.y += this.vy * delta;
          this.rotation += this.rotationSpeed * delta;
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
        constructor(p, x, y, lifespan = 255, c = p.color(255, 215, 0), sourceVx = 0, sourceVy = 0, speedMultiplier = null) {
          this.p = p;
          this.x = x;
          this.y = y;
          this.lifespan = lifespan;
          this.c = c;

          const sourceSpeed = Math.sqrt(sourceVx * sourceVx + sourceVy * sourceVy);

          let emissionSpeed = p.map(sourceSpeed, 0, 5, 1, 3);
          emissionSpeed = p.constrain(emissionSpeed, 1.2, 3.5);

          if (speedMultiplier !== null) {
            emissionSpeed *= speedMultiplier; // only apply if explicitly set
          }

          const emissionAngle = p.random(0, p.TWO_PI);

          this.vx = Math.cos(emissionAngle) * emissionSpeed + sourceVx * 0.1;
          this.vy = Math.sin(emissionAngle) * emissionSpeed + sourceVy * 0.1;
        }

        update(delta) {
          this.x += this.vx * delta;
          this.y += this.vy * delta;
          this.lifespan -= 1 * delta;
        }

        display() {
          this.p.noStroke();
          this.p.fill(this.c.levels[0], this.c.levels[1], this.c.levels[2], this.lifespan);
          this.p.ellipse(this.x, this.y, 4, 4);
        }

        isDead() {
          return this.lifespan <= 0;
        }
      }

      class Projectile {
        constructor(p, x, y, vx, vy) {
          this.p = p;
          this.x = x;
          this.y = y;

          const dirMag = Math.sqrt(vx * vx + vy * vy) || 1;
          const dirX = vx / dirMag;
          const dirY = vy / dirMag;

          this.minSpeed = 0.6; // minimum base speed (slow launch)
          this.maxSpeed = 12; // maximum top speed (cap)
          this.speed = this.minSpeed;

          this.vx = dirX * this.speed;
          this.vy = dirY * this.speed;

          this.targetSpeed = 8; // cruising target speed
          this.acceleration = 3;

          this.radius = 6;
          this.lifespan = 500;
          this.trail = [];
          this.color = p.color(200,150,255);
        }

        update(delta) {
          this.speed += (this.targetSpeed - this.speed) * this.acceleration * delta;

          if (this.speed < this.minSpeed) this.speed = this.minSpeed;
          if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;

          const dirMag = Math.sqrt(this.vx * this.vx + this.vy * this.vy) || 1;
          const dirX = this.vx / dirMag;
          const dirY = this.vy / dirMag;

          this.vx = dirX * this.speed;
          this.vy = dirY * this.speed;

          this.x += this.vx * delta;
          this.y += this.vy * delta;

          this.lifespan -= 1 * delta;

          this.trail.push({ x: this.x, y: this.y, alpha: 160 });
          if (this.trail.length > 20) this.trail.shift();

          for (let i = 0; i < this.trail.length; i++) {
            this.trail[i].alpha *= 0.8;
          }
        }

        display() {
          for (let i = 0; i < this.trail.length; i++) {
            let t = this.trail[i];
            this.p.fill(200,150,255, t.alpha);
            this.p.noStroke();
            this.p.ellipse(t.x, t.y, this.radius * 2, this.radius * 2);
          }

          this.p.fill(this.color);
          this.p.noStroke();
          this.p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        }

        isDead() {
          return this.lifespan <= 0 ||
            this.x < 0 || this.x > this.p.width ||
            this.y < 0 || this.y > this.p.height;
        }
      }
    }; // end of sketch

    const q5Instance = new q5(sketch, canvasRef.current);
    q5InstanceRef.current = q5Instance;

    if (q5InstanceRef.current && q5InstanceRef.current.p && q5InstanceRef.current.p.restartGame) {
      q5InstanceRef.current.restartGame = q5InstanceRef.current.p.restartGame;
    }
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
    setGameOverVisible(false);
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

          // Base force multiplier by device
          let baseMultiplier = 0.4;

          if (isTablet) {
            baseMultiplier = 0.6;
          } else if (isMobile) {
            baseMultiplier = 0.5;
          } else if (isDesktop) {
            baseMultiplier = 0.35;
          }

          // Calculate speed factor based on distance moved
          const speedFactor = Math.log2(dist + 1);  

          const forceMultiplier = baseMultiplier * speedFactor;

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

  // Simply render current coin count to mirror high score if it exceeds the high score
  const displayHighScore = coins > highScore ? coins : highScore;
  const isNewHighScore = coins > highScore;

  // Return HTML structure
return (
  <section className="block-type-g" id="block-g" style={{ position: 'relative' }}>
    <div className="evade-the-rock" style={{ width: '100%', height: '100%' }} ref={canvasRef}></div>
  <BlockGOnboarding key={resetKey} onStart={handleOnboardingStart} resetTrigger={resetKey}/>
    {!overlayVisible && <ExitButton onExit={handleExit} />}
    {!overlayVisible && <CoinCounter coins={coins} highScore={displayHighScore} newHighScore={newHighScore} />}
    {showCountdown && <CountdownDisplay countdown={countdown}/>}
    {gameOverVisible && <BlockGGameOver onRestart={handleRestart} coins={coins} newHighScore={newHighScore}/>}
  </section>
  );
};

export default RockEscapade;
