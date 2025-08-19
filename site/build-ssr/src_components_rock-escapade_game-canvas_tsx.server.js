"use strict";
exports.id = "src_components_rock-escapade_game-canvas_tsx";
exports.ids = ["src_components_rock-escapade_game-canvas_tsx"];
exports.modules = {

/***/ "./src/components/rock-escapade/game-canvas.tsx":
/*!******************************************************!*\
  !*** ./src/components/rock-escapade/game-canvas.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameCanvas)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/content-utility/real-mobile */ "./src/utils/content-utility/real-mobile.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/components/rock-escapade/GameCanvas.tsx



function GameCanvas({
  onCoinsChange,
  highScore = 0,
  onGameOver,
  onReady,
  pauseWhenHidden = true,
  demoMode = false,
  overlayActive = false,
  allowSpawns = true
}) {
  const hostRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const q5Ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const visibleRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  const cleanupRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // prop refs
  const coinsChangeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onCoinsChange);
  const gameOverRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onGameOver);
  const readyRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onReady);
  const highScoreRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(highScore);
  const pauseHiddenRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(pauseWhenHidden);
  const demoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!!demoMode);
  const overlayRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!!overlayActive);
  const allowSpawnsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(allowSpawns);
  coinsChangeRef.current = onCoinsChange;
  gameOverRef.current = onGameOver;
  readyRef.current = onReady;
  highScoreRef.current = highScore;
  pauseHiddenRef.current = pauseWhenHidden;
  demoRef.current = !!demoMode;
  overlayRef.current = !!overlayActive;
  allowSpawnsRef.current = !!allowSpawns;
  const isRealMobile = (0,_utils_content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_1__.useRealMobileViewport)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let alive = true;
    let io = null;
    let onResize = null;
    Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! q5 */ "q5", 23)).then(q5mod => {
      if (!alive) return;
      const q5 = q5mod.default ?? q5mod;
      const el = hostRef.current;
      if (!el || !el.isConnected) return;

      // defensive: clear any leftover canvases and prior instance
      el.replaceChildren();
      if (q5Ref.current?.remove) {
        try {
          q5Ref.current.remove();
        } catch {}
        q5Ref.current = null;
      }
      const sketch = p => {
        // ---------------- Local state ----------------
        let verticalMode = false;
        let rectangles = [];
        let octagons = [];
        let particles = [];
        let projectiles = [];
        let circle;
        let lastSpawnTime = 0;
        let lastOctagonSpawnTime = 0;
        let rectangleSpawnRate = 2;
        let coins = 0;
        let gameOver = false;
        let prevGameOver = false;
        let lastDemoFlag = true;
        let lastFiredTime = -Infinity;
        const cooldownDuration = 1500;
        const cooldownRadiusMax = 48;

        // ---- touch steering state ----
        let touchStart = null;
        let lastTouch = null;
        let touchStartMillis = 0;
        const TAP_MS = 180; // max time for a tap
        const TAP_MOVE = 12; // max move (px) to still count as a tap
        const baseImpulse = isRealMobile ? 0.5 : 0.35; // stronger on phones

        let movingUp = false;
        let movingDown = false;
        let movingLeft = false;
        let movingRight = false;

        // ---------------- Autoevade can spawn regardless ----------------
        function canSpawn() {
          return demoRef.current || allowSpawnsRef.current;
        }

        // ---------------- API ----------------
        const restartGame = () => {
          gameOver = false;
          coins = 0;
          coinsChangeRef.current?.(coins);
          rectangles = [];
          octagons = [];
          particles = [];
          projectiles = [];
          circle = new Circle(p, 240, p.height / 2, 33);
          q5Ref.current.circle = circle;
          lastOctagonSpawnTime = p.millis();
        };
        p.restartGame = restartGame;

        // ---------------- Setup ----------------
        p.setup = () => {
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          p.createCanvas(w, h);
          verticalMode = window.innerWidth <= 1024 && window.innerHeight > window.innerWidth;
          lastOctagonSpawnTime = p.millis();
          circle = new Circle(p, 240, h / 2, 33);
          q5Ref.current.circle = circle;
          readyRef.current?.({
            restart: restartGame
          });
        };

        // ---------------- Draw loop ----------------
        p.draw = () => {
          const demo = demoRef.current;
          // detect transition: demo -> live
          if (!demo && lastDemoFlag) {
            // hard reset to a clean field
            rectangles = [];
            octagons = [];
            particles = [];
            projectiles = [];
            coins = 0;
            coinsChangeRef.current?.(0);
            circle.x = 240;
            circle.y = p.height / 2;
            circle.vx = circle.vy = circle.ax = circle.ay = 0;

            // reset spawn timers so first spawn can happen immediately when allowed
            lastOctagonSpawnTime = p.millis();
            lastSpawnTime = p.millis();
          }
          lastDemoFlag = demo;
          if (pauseHiddenRef.current && !visibleRef.current) {
            p.background(25);
            return;
          }
          const delta = p.deltaTime / 16.67;
          p.background(25);
          // in p.draw(), before applying key-driven movement:
          if (!demo && overlayRef.current) {
            // lock controls while overlay is visible
            movingUp = movingDown = movingLeft = movingRight = false;
            circle.stopHorizontal();
            circle.stopVertical();
          }
          if (demo) {
            autoEvade();
          } else {
            if (movingUp) circle.moveUp();else if (movingDown) circle.moveDown();else circle.stopVertical();
            if (movingLeft) circle.moveLeft();else if (movingRight) circle.moveRight();else circle.stopHorizontal();
          }
          circle.update(delta);
          circle.display();
          spawnRectangles(p);
          updateRectangles(p, delta);
          spawnOctagons(p);
          updateOctagons(p, delta);
          if (!isRealMobile) p.blendMode(p.ADD);
          for (let i = particles.length - 1; i >= 0; i--) {
            const part = particles[i];
            part.update(delta);
            part.display();
            if (part.isDead()) particles.splice(i, 1);
          }
          if (!isRealMobile) p.blendMode(p.BLEND);
          for (let i = projectiles.length - 1; i >= 0; i--) {
            const proj = projectiles[i];
            proj.update(delta);
            proj.display();
            if (proj.isDead()) projectiles.splice(i, 1);
          }

          // live-mode only HUD & game-over
          if (!demo) {
            if (!prevGameOver && gameOver) {
              const isNewHigh = coins > (highScoreRef.current ?? 0);
              gameOverRef.current?.(coins, isNewHigh);
            }
            prevGameOver = gameOver;
            if (gameOver) {
              p.background(25, 180);
              return;
            }
            drawCooldownRing();
          } else {
            gameOver = false; // demo never ends
          }
        };

        // --- Demo simple AI: evade rectangles, seek octagons
        function autoEvade() {
          let evadeX = 0,
            evadeY = 0,
            danger = 0;
          for (const rect of rectangles) {
            const cx = rect.x + rect.w / 2;
            const cy = rect.y + rect.h / 2;
            const dx = circle.x - cx;
            const dy = circle.y - cy;
            const distSq = dx * dx + dy * dy;
            if (distSq < 20000) {
              const dist = Math.sqrt(distSq) || 1;
              const weight = 1 / (dist + 300);
              const force = weight * 150;
              evadeX += dx / dist * force;
              evadeY += dy / dist * force;
              danger += 1 / (dist + 1) * 10;
            }
          }
          let attractX = 0,
            attractY = 0;
          if (octagons.length > 0 && danger < 50) {
            const target = octagons.reduce((a, b) => {
              const da = p.dist(circle.x, circle.y, a.x + a.size / 2, a.y + a.size / 2);
              const db = p.dist(circle.x, circle.y, b.x + b.size / 2, b.y + b.size / 2);
              return db < da ? b : a;
            });
            const dx = target.x + target.size / 2 - circle.x;
            const dy = target.y + target.size / 2 - circle.y;
            const d = Math.sqrt(dx * dx + dy * dy) || 1;
            attractX = dx / d * 0.45;
            attractY = dy / d * 0.45;
          }
          circle.ax = evadeX + attractX;
          circle.ay = evadeY + attractY;
          if (circle.ax === 0 && circle.ay === 0) {
            const cx = p.width / 2 - circle.x;
            const cy = p.height / 2 - circle.y;
            const d = Math.sqrt(cx * cx + cy * cy) || 1;
            circle.ax = cx / d * 0.1;
            circle.ay = cy / d * 0.1;
          }
        }
        function drawCooldownRing() {
          const elapsed = p.millis() - lastFiredTime;
          if (elapsed >= cooldownDuration) return;
          const progress = 1 - elapsed / cooldownDuration;
          const radius = progress * cooldownRadiusMax;
          p.noStroke();
          p.fill(200, 150, 255, 100);
          p.ellipse(circle.x, circle.y, radius * 2, radius * 2);
        }

        // ---------------- Spawners/Updaters ----------------
        function spawnRectangles(p) {
          if (!allowSpawnsRef.current) return;
          if (!canSpawn()) return;
          const inView = rectangles.filter(r => verticalMode ? r.y + r.h > 0 && r.y < p.height : r.x + r.w > 0 && r.x < p.width).length;
          let maxRectangles;
          if (window.innerWidth >= 1025) {
            maxRectangles = 50;
            if (inView < 10) rectangleSpawnRate = 6;else if (inView < 25) rectangleSpawnRate = 5;else if (inView < 40) rectangleSpawnRate = 4;else rectangleSpawnRate = 0;
          } else if (window.innerWidth >= 768) {
            maxRectangles = 60;
            if (inView < 8) rectangleSpawnRate = 5;else if (inView < 20) rectangleSpawnRate = 4;else if (inView < 40) rectangleSpawnRate = 3;else rectangleSpawnRate = 0;
          } else {
            maxRectangles = 25;
            if (inView < 10) rectangleSpawnRate = 4;else if (inView < 20) rectangleSpawnRate = 3;else rectangleSpawnRate = 1;
          }
          if (rectangleSpawnRate > 0 && p.millis() - lastSpawnTime > 2000 / rectangleSpawnRate && inView < maxRectangles) {
            rectangles.push(new Shape(p, true, false, verticalMode));
            lastSpawnTime = p.millis();
          }
          if (p.millis() % 5000 < 20) {
            rectangles = rectangles.filter(r => !isNaN(r.x) && !isNaN(r.y));
          }
        }
        function updateRectangles(p, delta) {
          for (let i = rectangles.length - 1; i >= 0; i--) {
            const r = rectangles[i];
            r.update(delta);
            r.display();
            if (!demoRef.current && circle.overlaps(r)) gameOver = true;

            // projectiles collision
            for (let j = projectiles.length - 1; j >= 0; j--) {
              const proj = projectiles[j];
              const projSize = proj.size ?? proj.radius * 2;
              const projX = proj.x - (proj.size ? proj.size / 2 : proj.radius);
              const projY = proj.y - (proj.size ? proj.size / 2 : proj.radius);
              const projW = projSize;
              const projH = projSize;
              if (projX + projW > r.x && projX < r.x + r.w && projY + projH > r.y && projY < r.y + r.h) {
                if (proj instanceof RectangleProjectile) {
                  if (p.random() < 0.05) {
                    rectangles.splice(i, 1);
                    projectiles.splice(j, 1);
                    burstRectangles(p, r.x + r.w / 2, r.y + r.h / 2);
                  } else {
                    proj.vx *= -1;
                    proj.vy *= -1;
                    proj.x += proj.vx * delta * 2;
                    proj.y += proj.vy * delta * 2;
                  }
                } else {
                  rectangles.splice(i, 1);
                  projectiles.splice(j, 1);
                  burstRectangles(p, r.x + r.w / 2, r.y + r.h / 2);
                }
                break;
              }
            }
            const off = verticalMode ? r.y - r.h > p.height + 100 || r.y + r.h < -100 : r.x + r.w < -100 || r.x - r.w > p.width + 100;
            if (off) {
              rectangles.splice(i, 1);
              continue;
            }
          }
          for (let i = 0; i < rectangles.length; i++) {
            const r1 = rectangles[i];
            for (let j = i + 1; j < rectangles.length; j++) {
              const r2 = rectangles[j];
              if (r1.overlaps(r2)) r1.resolveCollision(r2);
            }
          }
        }
        function burstRectangles(p, cx, cy) {
          for (let k = 0; k < 8; k++) {
            const angle = p.TWO_PI / 8 * k;
            const speed = p.random(2, 4);
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            projectiles.push(new RectangleProjectile(p, cx, cy, vx, vy, '#c896ff'));
          }
        }
        function spawnOctagons(p) {
          if (!allowSpawnsRef.current) return;
          if (!canSpawn()) return;
          if (p.millis() - lastOctagonSpawnTime > 2000) {
            if (octagons.length === 0) octagons.push(new Shape(p, true, true, verticalMode));
            lastOctagonSpawnTime = p.millis();
          }
        }
        function updateOctagons(p, delta) {
          const buffer = 150;
          for (let i = octagons.length - 1; i >= 0; i--) {
            const o = octagons[i];
            o.update(delta);
            o.display();
            if (circle.overlaps(o)) {
              if (!demoRef.current) {
                coins += 20;
                coinsChangeRef.current?.(coins);
              }
              for (let j = 0; j < 10; j++) {
                particles.push(new Particle(p, o.x + o.size / 2, o.y + o.size / 2, 255, o.c, 0, 0, 5));
              }
              octagons.splice(i, 1);
              continue;
            }
            const speed = Math.abs(o.vx) + Math.abs(o.vy);
            let numParticles;
            if (speed < 1) numParticles = 0.05;else if (speed < 3) numParticles = 0.1;else if (speed < 6) numParticles = 0.2;else numParticles = 0.3;
            const whole = Math.floor(numParticles);
            const frac = numParticles - whole;
            for (let j = 0; j < whole; j++) particles.push(new Particle(p, o.x + o.size / 2, o.y + o.size / 2, 255, o.c));
            if (p.random() < frac) particles.push(new Particle(p, o.x + o.size / 2, o.y + o.size / 2, 255, o.c));
            if (o.x + o.size < -buffer || o.x - o.size > p.width + buffer || o.y + o.size < -buffer || o.y - o.size > p.height + buffer) {
              octagons.splice(i, 1);
            }
          }
        }

        // ---------------- Input ----------------
        p.keyPressed = () => {
          if (demoRef.current || overlayRef.current) return; // ← add overlay guard
          if (p.key === ' ' || p.key === 'Spacebar') {
            const now = p.millis();
            if (now - lastFiredTime >= cooldownDuration) {
              lastFiredTime = now;
              if (circle) {
                const vx = circle.vx !== 0 || circle.vy !== 0 ? circle.vx : 5;
                const vy = circle.vy !== 0 || circle.vx !== 0 ? circle.vy : 0;
                projectiles.push(new Projectile(p, circle.x, circle.y, vx, vy));
              }
            }
          }
          if (p.key === 'w' || p.keyCode === p.UP_ARROW) movingUp = true;
          if (p.key === 's' || p.keyCode === p.DOWN_ARROW) movingDown = true;
          if (p.key === 'a' || p.keyCode === p.LEFT_ARROW) movingLeft = true;
          if (p.key === 'd' || p.keyCode === p.RIGHT_ARROW) movingRight = true;
        };
        p.keyReleased = () => {
          if (demoRef.current || overlayRef.current) return; // ← add overlay guard
          if (p.key === 'w' || p.keyCode === p.UP_ARROW) movingUp = false;
          if (p.key === 's' || p.keyCode === p.DOWN_ARROW) movingDown = false;
          if (p.key === 'a' || p.keyCode === p.LEFT_ARROW) movingLeft = false;
          if (p.key === 'd' || p.keyCode === p.RIGHT_ARROW) movingRight = false;
        };
        p.touchStarted = () => {
          if (demoRef.current || overlayRef.current) return false; // ← add overlay guard
          if (p.touches.length !== 1) return false;
          touchStart = {
            x: p.mouseX,
            y: p.mouseY
          };
          lastTouch = {
            x: p.mouseX,
            y: p.mouseY
          };
          touchStartMillis = p.millis();
          return false;
        };
        p.touchMoved = () => {
          if (demoRef.current || overlayRef.current) return false; // ← add overlay guard
          if (!lastTouch || !circle) return false;
          const dx = p.mouseX - lastTouch.x;
          const dy = p.mouseY - lastTouch.y;
          const dist = Math.hypot(dx, dy) || 1;
          const speedFactor = Math.log2(dist + 1);
          const force = baseImpulse * speedFactor;
          circle.vx += dx / dist * force;
          circle.vy += dy / dist * force;
          lastTouch = {
            x: p.mouseX,
            y: p.mouseY
          };
          return false;
        };
        p.touchEnded = () => {
          if (demoRef.current || overlayRef.current) return false; // ← add overlay guard

          const dt = p.millis() - touchStartMillis;
          const moved = touchStart && lastTouch ? Math.hypot(lastTouch.x - touchStart.x, lastTouch.y - touchStart.y) : 0;
          if (dt <= TAP_MS && moved <= TAP_MOVE) {
            const now = p.millis();
            if (now - lastFiredTime >= cooldownDuration) {
              lastFiredTime = now;
              const vx = circle.vx !== 0 || circle.vy !== 0 ? circle.vx : 5;
              const vy = circle.vy !== 0 || circle.vx !== 0 ? circle.vy : 0;
              projectiles.push(new Projectile(p, circle.x, circle.y, vx, vy));
            }
          }
          touchStart = null;
          lastTouch = null;
          return false;
        };

        // ---------------- Classes ----------------
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
            if (this.y + this.radius < 0) this.y = this.p.height + this.radius;else if (this.y - this.radius > this.p.height) this.y = -this.radius;
            if (this.x + this.radius < 0) this.x = this.p.width + this.radius;else if (this.x - this.radius > this.p.width) this.x = -this.radius;
            this.trail.push(this.p.createVector(this.x, this.y));
            if (this.trail.length > 8) this.trail.shift();
            const lim = 10;
            this.vx = this.p.constrain(this.vx, -lim, lim);
            this.vy = this.p.constrain(this.vy, -lim, lim);
          }
          display() {
            for (let i = 0; i < this.trail.length; i++) {
              const pos = this.trail[i];
              const a = this.p.map(i, 0, this.trail.length - 1, 30, 100);
              const r = this.p.map(i, 0, this.trail.length - 1, this.radius / 2, this.radius);
              this.p.fill(200, 150, 255, a);
              this.p.noStroke();
              this.p.ellipse(pos.x, pos.y, r, r);
            }
            this.p.fill(this.c);
            this.p.noStroke();
            this.p.ellipse(this.x, this.y, this.radius, this.radius);
          }
          moveUp() {
            this.ay = -0.5;
          }
          moveDown() {
            this.ay = 0.5;
          }
          moveLeft() {
            this.ax = -0.5;
          }
          moveRight() {
            this.ax = 0.5;
          }
          stopVertical() {
            this.ay = 0;
          }
          stopHorizontal() {
            this.ax = 0;
          }
          overlaps(other) {
            if (other.isOctagon) {
              const d = this.p.dist(this.x, this.y, other.x + other.size / 2, other.y + other.size / 2);
              return d < this.radius + other.size / 2;
            }
            const cx = this.p.constrain(this.x, other.x, other.x + other.w);
            const cy = this.p.constrain(this.y, other.y, other.y + other.h);
            const d = this.p.dist(this.x, this.y, cx, cy);
            return d < this.radius * 0.3;
          }
        }
        class Shape {
          x = 0;
          y = 0;
          vx = 0;
          vy = 0;
          w = 0;
          h = 0;
          size = 0;
          rotation = 0;
          rotationSpeed = 0;
          constructor(p, startOff, isOct, vertical) {
            this.p = p;
            this.isOctagon = isOct;
            this.verticalMode = vertical;
            this.reset(startOff);
          }
          reset(startOff) {
            if (this.verticalMode) {
              this.x = this.p.random(this.p.width);
              if (this.isOctagon) {
                this.y = startOff ? -this.p.random(30, 60) : this.p.random(this.p.height);
                this.vx = this.p.random(-1.2, 1.2);
                if (this.p.random() < 0.1) this.vy = this.p.random(6, 9);else if (this.p.random() < 0.2) this.vy = this.p.random(0.5, 1.5);else this.vy = this.p.random(2, 5);
                this.size = 25;
                const colors = [this.p.color(255, 215, 0), this.p.color(255, 223, 70), this.p.color(255, 200, 0), this.p.color(255, 170, 50)];
                this.c = this.p.random(colors);
              } else {
                this.y = startOff ? -this.p.random(60, 120) : this.p.random(this.p.height);
                this.vx = this.p.random(-0.5, 0.5);
                this.vy = this.p.random(1, 3);
                this.w = this.p.random(28, 70);
                this.h = this.p.random(28, 70);
                this.c = this.p.color(235, 235, 255);
              }
            } else {
              this.x = startOff ? this.p.width + this.p.random(10, 40) : this.p.random(this.p.width);
              this.y = this.p.random(this.p.height);
              if (this.isOctagon) {
                let baseX = this.p.random(-2.5, -0.5);
                if (window.innerWidth >= 1025 && window.innerWidth > window.innerHeight) baseX *= 4.5;
                if (this.p.random() < 0.1) baseX *= 2;else if (this.p.random() < 0.2) baseX *= 0.5;
                this.vx = baseX;
                this.vy = this.p.random(-0.3, 0.3);
                this.size = 25;
                const colors = [this.p.color(255, 215, 0), this.p.color(255, 223, 70), this.p.color(255, 200, 0), this.p.color(255, 170, 50)];
                this.c = this.p.random(colors);
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
            if (this.isOctagon) this.drawOctagon(0, 0, this.size);else {
              this.p.rectMode(this.p.CENTER);
              this.p.rect(0, 0, this.w, this.h);
            }
            this.p.pop();
          }
          drawOctagon(x, y, size) {
            const step = this.p.TWO_PI / 8;
            this.p.beginShape();
            for (let i = 0; i < 8; i++) {
              const ang = i * step;
              const px = x + this.p.cos(ang) * size / 2;
              const py = y + this.p.sin(ang) * size / 2;
              this.p.vertex(px, py);
            }
            this.p.endShape(this.p.CLOSE);
          }
          overlaps(o) {
            const w1 = this.isOctagon ? this.size : this.w;
            const h1 = this.isOctagon ? this.size : this.h;
            const w2 = o.isOctagon ? o.size : o.w;
            const h2 = o.isOctagon ? o.size : o.h;
            return !(this.x + w1 < o.x || this.x > o.x + w2 || this.y + h1 < o.y || this.y > o.y + h2);
          }
          resolveCollision(other) {
            const w1 = this.isOctagon ? this.size : this.w;
            const h1 = this.isOctagon ? this.size : this.h;
            const w2 = other.isOctagon ? other.size : other.w;
            const h2 = other.isOctagon ? other.size : other.h;
            const overlapX = Math.min(this.x + w1, other.x + w2) - Math.max(this.x, other.x);
            const overlapY = Math.min(this.y + h1, other.y + h2) - Math.max(this.y, other.y);
            if (overlapX < overlapY) {
              if (this.x < other.x) {
                this.x -= overlapX / 2;
                other.x += overlapX / 2;
              } else {
                this.x += overlapX / 2;
                other.x -= overlapX / 2;
              }
              this.vx *= -1;
              other.vx *= -1;
            } else {
              if (this.y < other.y) {
                this.y -= overlapY / 2;
                other.y += overlapY / 2;
              } else {
                this.y += overlapY / 2;
                other.y -= overlapY / 2;
              }
              this.vy *= -1;
              other.vy *= -1;
            }
          }
        }
        class Particle {
          constructor(p, x, y, lifespan = 255, c = p.color(255, 215, 0), srcVx = 0, srcVy = 0, mul = null) {
            this.p = p;
            this.x = x;
            this.y = y;
            this.lifespan = lifespan;
            this.c = c;
            const srcSpeed = Math.sqrt(srcVx * srcVx + srcVy * srcVy);
            let speed = p.map(srcSpeed, 0, 5, 1, 3);
            speed = p.constrain(speed, 1.2, 3.5);
            if (mul != null) speed *= mul;
            const ang = p.random(0, p.TWO_PI);
            this.vx = Math.cos(ang) * speed + srcVx * 0.1;
            this.vy = Math.sin(ang) * speed + srcVy * 0.1;
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
          minSpeed = 0.6;
          maxSpeed = 12;
          speed = this.minSpeed;
          targetSpeed = 8;
          acceleration = 3;
          constructor(p, x, y, vx, vy) {
            this.p = p;
            this.x = x;
            this.y = y;
            const mag = Math.sqrt(vx * vx + vy * vy) || 1;
            const dx = vx / mag;
            const dy = vy / mag;
            this.vx = dx * this.speed;
            this.vy = dy * this.speed;
            this.radius = 6;
            this.lifespan = 500;
            this.trail = [];
            this.color = p.color(200, 150, 255);
          }
          update(delta) {
            this.speed += (this.targetSpeed - this.speed) * this.acceleration * delta;
            if (this.speed < this.minSpeed) this.speed = this.minSpeed;
            if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
            const mag = Math.sqrt(this.vx * this.vx + this.vy * this.vy) || 1;
            const dx = this.vx / mag;
            const dy = this.vy / mag;
            this.vx = dx * this.speed;
            this.vy = dy * this.speed;
            this.x += this.vx * delta;
            this.y += this.vy * delta;
            this.lifespan -= 1 * delta;
            this.trail.push({
              x: this.x,
              y: this.y,
              alpha: 160
            });
            if (this.trail.length > 20) this.trail.shift();
            for (let i = 0; i < this.trail.length; i++) this.trail[i].alpha *= 0.8;
          }
          display() {
            for (let i = 0; i < this.trail.length; i++) {
              const t = this.trail[i];
              this.p.fill(200, 150, 255, t.alpha);
              this.p.noStroke();
              this.p.ellipse(t.x, t.y, this.radius * 2, this.radius * 2);
            }
            this.p.fill(this.color);
            this.p.noStroke();
            this.p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
          }
          isDead() {
            return this.lifespan <= 0 || this.x < 0 || this.x > this.p.width || this.y < 0 || this.y > this.p.height;
          }
        }
        class RectangleProjectile {
          constructor(p, x, y, vx, vy, color) {
            this.p = p;
            this.x = x;
            this.y = y;
            this.size = p.random(8, 20);
            const factor = this.p.map(this.size, 8, 20, 1, 2);
            this.vx = vx * factor;
            this.vy = vy * factor;
            this.lifespan = 80;
            this.maxLifespan = this.lifespan;
            this.color = p.color(color);
            this.rotation = p.random(360);
            this.rotationSpeed = p.random(-20, 20);
          }
          update(delta) {
            this.x += this.vx * delta;
            this.y += this.vy * delta;
            this.lifespan -= 1 * delta;
            this.rotation += this.rotationSpeed * delta;
          }
          display() {
            this.p.push();
            this.p.translate(this.x, this.y);
            this.p.rotate(this.p.radians(this.rotation));
            const a = this.p.map(this.lifespan, 0, this.maxLifespan, 0, 255);
            this.p.fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], a);
            this.p.noStroke();
            this.p.rectMode(this.p.CENTER);
            this.p.rect(0, 0, this.size, this.size);
            this.p.pop();
          }
          isDead() {
            return this.lifespan <= 0 || this.x < -50 || this.x > this.p.width + 50 || this.y < -50 || this.y > this.p.height + 50;
          }
        }
      }; // end sketch

      // delay until next frame so host is laid out, no await needed
      requestAnimationFrame(() => {
        if (!alive || !el.isConnected) return;

        // q5 init (guard against duplicates)
        if (q5Ref.current) {
          try {
            q5Ref.current.remove?.();
          } catch {}
          q5Ref.current = null;
        }
        let instance;
        try {
          instance = new q5(sketch, el);
        } catch (err) {
          console.error('[GameCanvas] q5 init error', err);
          return;
        }
        q5Ref.current = instance;

        // helps autoevade when the canvas starts off-screen
        if (pauseHiddenRef.current && 'IntersectionObserver' in window) {
          io = new IntersectionObserver(([entry]) => {
            visibleRef.current = entry.isIntersecting;
            try {
              if (entry.isIntersecting) q5Ref.current?.loop?.();else q5Ref.current?.noLoop?.();
            } catch {}
          }, {
            threshold: 0.01
          });
          io.observe(el);
        }

        // ----- RESIZE HOOKS -----
        let ro = null;
        const vv = window.visualViewport;
        let lastW = 0,
          lastH = 0;
        const resizeToHost = () => {
          const host = hostRef.current;
          const inst = q5Ref.current;
          if (!host || !host.isConnected || !inst?.resizeCanvas) return;
          const w = Math.max(1, Math.round(host.offsetWidth));
          const h = Math.max(1, Math.round(host.offsetHeight));
          if (w === lastW && h === lastH) return; // no-op if unchanged
          lastW = w;
          lastH = h;
          try {
            inst.resizeCanvas(w, h);
          } catch (e) {
            console.warn('[GameCanvas] resize skipped', e);
          }
        };

        // Window resize (already helpful for desktop)
        onResize = () => requestAnimationFrame(resizeToHost);
        window.addEventListener('resize', onResize);

        // Parent size changes (CSS/layout) — the important part
        if ('ResizeObserver' in window) {
          ro = new ResizeObserver(() => requestAnimationFrame(resizeToHost));
          ro.observe(el);
        }

        // Mobile URL bar/orientation/address-bar collapse
        window.addEventListener('orientationchange', onResize);
        vv?.addEventListener('resize', onResize);
        vv?.addEventListener('scroll', onResize);

        // Fullscreen enter/exit
        const onFs = () => requestAnimationFrame(resizeToHost);
        document.addEventListener('fullscreenchange', onFs);

        // Visibility throttle
        if (pauseHiddenRef.current && 'IntersectionObserver' in window) {
          io = new IntersectionObserver(([entry]) => {
            visibleRef.current = entry.isIntersecting;
            // when it becomes visible again, make sure size matches
            if (entry.isIntersecting) requestAnimationFrame(resizeToHost);
          }, {
            threshold: 0.01
          });
          io.observe(el);
        }

        // initial sync (in case the host changed between setup and now)
        requestAnimationFrame(resizeToHost);

        // single cleanup
        cleanupRef.current = () => {
          if (io) io.disconnect();
          if (onResize) window.removeEventListener('resize', onResize);
          document.removeEventListener('fullscreenchange', onFs);
          ro?.disconnect();
          vv?.removeEventListener('resize', onResize);
          vv?.removeEventListener('scroll', onResize);
          if (q5Ref.current?.remove) q5Ref.current.remove();
          q5Ref.current = null;
          el.replaceChildren();
        };
      });
    });
    return () => {
      alive = false;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []); // run once

  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "evade-the-rock",
    ref: hostRef,
    style: {
      width: '100%',
      height: '100%'
    }
  });
}

/***/ })

};
;
//# sourceMappingURL=src_components_rock-escapade_game-canvas_tsx.server.js.map