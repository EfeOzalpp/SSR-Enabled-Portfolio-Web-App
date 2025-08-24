exports.id = "src_dynamic-app_components_IntroOverlay_jsx-src_dynamic-app_components_fireworksDisplay_jsx-s-73dd24";
exports.ids = ["src_dynamic-app_components_IntroOverlay_jsx-src_dynamic-app_components_fireworksDisplay_jsx-s-73dd24"];
exports.modules = {

/***/ "./src/dynamic-app/components/IntroOverlay.jsx":
/*!*****************************************************!*\
  !*** ./src/dynamic-app/components/IntroOverlay.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");


const RedIntroOverlay = () => {
  const [visible, setVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const timer = setTimeout(() => setVisible(false), 500);
    return () => clearTimeout(timer);
  }, []);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#1e1e1f',
      opacity: visible ? 1 : 0,
      pointerEvents: 'none',
      transition: 'opacity 0.4s ease',
      zIndex: 9999
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RedIntroOverlay);

/***/ }),

/***/ "./src/dynamic-app/components/fireworksDisplay.jsx":
/*!*********************************************************!*\
  !*** ./src/dynamic-app/components/fireworksDisplay.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var q5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! q5 */ "q5");
/* harmony import */ var q5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(q5__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_content_utility_real_mobile_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/content-utility/real-mobile.ts */ "./src/utils/content-utility/real-mobile.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// Firework Animation Code




const FireworksDisplay = ({
  colorMapping = {},
  items = [],
  lastKnownColor,
  onToggleFireworks
}) => {
  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [fireworksEnabled, setFireworksEnabled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const fireworksRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  const fireworksEnabledRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  const isPageHiddenRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const hiddenStartTimeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  const hiddenDurationRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  const isRealMobile = (0,_utils_content_utility_real_mobile_ts__WEBPACK_IMPORTED_MODULE_2__.useRealMobileViewport)();
  const isRealMobileRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(isRealMobile);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    isRealMobileRef.current = isRealMobile;
  }, [isRealMobile]);

  // Documént visibility
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        isPageHiddenRef.current = true;
        hiddenStartTimeRef.current = performance.now();
      } else if (document.visibilityState === 'visible') {
        isPageHiddenRef.current = false;
        const now = performance.now();
        hiddenDurationRef.current += now - hiddenStartTimeRef.current;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Function to adjust brightness of a hex color
  function adjustBrightness(hex, multiplier) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Apply brightness multiplier
    r = Math.min(255, Math.max(0, Math.floor(r * multiplier)));
    g = Math.min(255, Math.max(0, Math.floor(g * multiplier)));
    b = Math.min(255, Math.max(0, Math.floor(b * multiplier)));

    // Convert back to hex and return
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  const p5InstanceRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null); // Track single p5 instance
  const latestItems = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(items);
  const latestColorMapping = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(colorMapping);
  const latestLastKnownColor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(lastKnownColor);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    latestItems.current = items;
    latestColorMapping.current = colorMapping;
    latestLastKnownColor.current = lastKnownColor;
  }, [items, colorMapping, lastKnownColor]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let destroyed = false;
    if (!canvasRef.current || p5InstanceRef.current || destroyed) return;
    const sketch = p => {
      let fireworks = fireworksRef.current;
      let lastFireworkTime = -8000;
      let lastLaunchPosition = p.createVector(p.width / 2, p.height);
      const minDistance = 1000;
      class Particle {
        constructor(x, y, c, firework, size, type, hasTrail = false) {
          this.pos = p.createVector(x, y);
          this.vel = firework ? p.createVector(0, p.random(-10, -20)) // Firework launch velocity
          : p.createVector(p.random(-1, 1), p.random(-1, 1)).mult(p.random(0, 18)); // Explosion velocity
          this.acc = p.createVector(0, 0);

          // Adjust brightness based on firework type and size
          this.col = this.adjustBrightness(c, size > 10 ? p.random(1.4, 2) // Larger particles
          : size > 5 ? p.random(1.1, 1.3) // Mid-size particles
          : p.random(0.7, 1.1) // Smaller particles
          );
          this.firework = firework;
          this.size = size;
          this.type = type;
          this.hasTrail = hasTrail;
          this.shapeType = p.random(['circle', 'square', 'triangle']); // Add random shape selection

          // Randomize lifespan based on size (larger particles live longer)
          let minLifespan, maxLifespan;
          if (p.windowWidth < 768) {
            minLifespan = p.random(30, 60);
            maxLifespan = p.random(40, 80);
          } else if (p.windowWidth <= 1024) {
            minLifespan = p.random(50, 80);
            maxLifespan = p.random(70, 100);
          } else {
            minLifespan = p.random(50, 90);
            maxLifespan = p.random(80, 140);
          }
          this.lifespan = p.map(size, 1, 12, minLifespan, maxLifespan);

          // Adjust trail length based on particle size
          this.trailLength = size >= 4 && size <= 12 ? 8 : 1; // Longer trail for larger particles
          this.trail = Array(this.trailLength).fill(p.createVector(x, y)); // Set trail array

          // Map trailLifespan to speed (higher speed -> higher alpha, lower speed -> fade out)
          const initialSpeed = this.vel.mag();
          this.trailLifespan = Array(this.trailLength).fill(p.map(initialSpeed, 0, 20, 0, 100)); // Dynamically set based on speed

          this.fadeFactor = p.map(size, 1, 15, 0.6, 0.5); // Smaller particles fade faster

          // Blinking properties (only for explosion particles)
          this.blinkingSpeed = firework ? 0 : p.random(5, 30); // Blinking speed for explosion particles
          this.blinkingAlpha = firework ? 255 : 255; // Default alpha value for explosion particles
        }

        // Adjust brightness of the color
        adjustBrightness(baseColor, multiplier) {
          const r = Math.min(255, Math.max(0, baseColor.levels[0] * multiplier));
          const g = Math.min(255, Math.max(0, baseColor.levels[1] * multiplier));
          const b = Math.min(255, Math.max(0, baseColor.levels[2] * multiplier));
          return p.color(r, g, b);
        }
        applyForce(force) {
          this.acc.add(force);
        }
        update() {
          this.vel.add(this.acc);
          this.pos.add(this.vel);
          this.acc.mult(0);
          if (!this.firework) {
            this.vel.mult(0.927); // Slow down over time
            this.lifespan -= this.fadeFactor; // Decrease lifespan

            // Make sure lifespan does not go below 0
            if (this.lifespan <= 0) {
              this.lifespan = 0;
            }

            // Trail
            if (this.hasTrail) {
              this.trail.pop(); // Remove the oldest trail point
              this.trail.unshift(this.pos.copy()); // Add the newest trail point
              for (let i = 0; i < this.trailLifespan.length; i++) {
                this.trailLifespan[i] -= this.fadeFactor; // Gradually fade trail points
                this.trailLifespan[i] = Math.max(0, this.trailLifespan[i]); // Clamp lifespan to 0
              }
            }

            // Apply gravity based on particle size
            let gravityForce;
            if (this.size >= 1 && this.size < 2) {
              gravityForce = p.random(-0.151, -0.161); // Weaker gravity for size 1
            } else if (this.size >= 2 && this.size < 3) {
              gravityForce = p.random(-0.146, -0.156); // Gravity for size 2
            } else if (this.size >= 3 && this.size < 4) {
              gravityForce = p.random(-0.144, -0.145); // Gravity for size 3
            } else if (this.size >= 4 && this.size < 5) {
              gravityForce = p.random(-0.141, -0.143); // Gravity for size 4
            } else if (this.size >= 5 && this.size < 6) {
              gravityForce = p.random(-0.139, -0.14); // Gravity for size 5
            } else if (this.size >= 6 && this.size < 7) {
              gravityForce = p.random(-0.137, -0.138); // Gravity for size 6
            } else if (this.size >= 7 && this.size < 8) {
              gravityForce = p.random(-0.135, -0.136); // Gravity for size 7
            } else if (this.size >= 8 && this.size < 9) {
              gravityForce = p.random(-0.134, -0.136); // Gravity for size 8
            } else if (this.size <= 9) {
              gravityForce = p.random(-0.135, -0.137); // Stronger gravity for size 9
            } else if (this.size >= 10 && this.size <= 12) {
              gravityForce = p.random(-0.094, -0.137); // Stronger gravity for size 9
            }
            this.applyForce(p.createVector(0, gravityForce)); // Apply gravity
          }

          // Update blinking alpha for explosion particles
          if (!this.firework && this.type === 'BLINKING') {
            this.blinkingAlpha = Math.abs(255 * Math.sin(p.millis() / 1000 * this.blinkingSpeed));
          }
        }
        show() {
          let alpha = this.firework ? p.map(this.lifespan, 0, 255, 0, 255) // Normal fading for firework particles
          : this.type === 'BLINKING' ? this.blinkingAlpha // Blinking for explosion particles
          : p.map(this.lifespan, 0, 255, 0, 255); // Fading for explosion particles

          p.noStroke();

          // Shrinking logic for the particle
          let shrinkSize = this.size;
          if (!this.firework) {
            // Lifespan timing: calculate elapsed time (255 lifespan = full life)
            const elapsedTime = p.map(this.lifespan, 255, 0, 0, 5); // 5 seconds total lifespan
            const shrinkFactor = elapsedTime <= 2 ? 1 // No shrinking for the first 2 seconds
            : p.map(this.lifespan, 255, 0, 1, 0); // Start shrinking after 2 seconds

            // Exponential shrinking towards the end
            shrinkSize = this.size * (1 - Math.pow(1 - shrinkFactor, 6));
          }
          const normalizedSize = Math.max(shrinkSize * 1.1, 1); // Clamp minimum size to 1

          // Calculate rotation angle based on velocity vector
          const rotationAngle = p.atan2(this.vel.y, this.vel.x); // Angle in radians

          // Draw trails first
          if (this.hasTrail) {
            for (let i = 0; i < this.trail.length; i++) {
              const trailAlpha = this.trailLifespan[i];
              if (trailAlpha > 0) {
                // Use a fixed size for trail points
                const trailSize = this.firework ? this.size * 0.9 : this.size * 0.8;
                p.strokeWeight(trailSize); // Fixed trail size
                p.stroke(this.col.levels[0], this.col.levels[1], this.col.levels[2], trailAlpha);
                p.point(this.trail[i].x, this.trail[i].y);
              }
            }
          }

          // Draw the main particle shape
          p.push();
          p.translate(this.pos.x, this.pos.y); // Move to particle position
          p.rotate(rotationAngle); // Rotate based on velocity direction

          // Apply speed-based rotation scaling (optional)
          const rotationSpeed = this.vel.mag() * 0.01; // Scale speed to adjust rotation dynamics
          p.rotate(p.frameCount * rotationSpeed);
          p.fill(this.col.levels[0], this.col.levels[1], this.col.levels[2], alpha);

          // Draw shape based on shapeType
          if (this.shapeType === 'circle') {
            p.ellipse(0, 0, normalizedSize, normalizedSize);
          } else if (this.shapeType === 'square') {
            const halfSize = normalizedSize / 2;
            p.rect(-halfSize, -halfSize, normalizedSize, normalizedSize);
          } else if (this.shapeType === 'triangle') {
            const halfSize = normalizedSize / 2;
            p.triangle(0, -halfSize,
            // Top vertex
            -halfSize, halfSize,
            // Bottom-left vertex
            halfSize, halfSize // Bottom-right vertex
            );
          }
          p.pop(); // Reset transformations
        }

        // Check if the particle is done (lifespan is 0)
        isDone() {
          return this.lifespan <= 0; // Particle is done when lifespan is depleted
        }
      }
      class Firework {
        constructor(x, y, targetX, targetY, col, type) {
          this.firework = new Particle(x, y, col, true, 4, type);
          this.particles = [];
          this.exploded = false;
          this.targetX = targetX;

          // Adjust explosion location based on screen width
          if (p.windowWidth < 768) {
            // For screens smaller than 768px, make the explosion higher on the screen
            this.targetX = p.random(p.width * 0.5, p.width * 0.9);
            this.targetY = p.random(p.height * 0.1, p.height * 0.3);
          } else if (p.windowWidth >= 768 && p.windowWidth <= 1024) {
            // For screens between 768px and 1024px, make the explosion in the middle
            this.targetX = p.random(p.width * 0.65, p.width * 0.9);
            this.targetY = p.random(p.height * 0.05, p.height * 0.3);
          } else {
            // For screens larger than 1024px, make the explosion lower on the screen
            this.targetX = p.random(p.width * 0.3, p.width * 0.7);
            this.targetY = p.random(p.height * 0.05, p.height * 0.4);
          }
          this.col = col;
          this.type = type;
          this.explosionStartTime = -1;

          // Particle amount logic
          let baseCount;
          if (p.windowWidth < 768) {
            baseCount = type === 'BLINKING' ? p.random(150, 300) : p.random(125, 250);
          } else if (p.windowWidth <= 1024) {
            baseCount = type === 'BLINKING' ? p.random(275, 375) : p.random(200, 300); // Fewer PROJECTILE particles on medium screens
          } else {
            baseCount = type === 'BLINKING' ? p.random(375, 475) : p.random(400, 500);
          }
          this.numParticles = Math.floor(baseCount);
        }
        explode() {
          // Capture the firework's initial velocity to influence explosion particles
          let initialVel = this.firework.vel.copy(); // Copy firework's velocity to influence explosion

          //limit particle count for larger ones between 25 to 50
          const largerParticleCount = this.type === 'PROJECTILE' ? Math.floor(p.random(25, 50)) : 0;
          for (let i = 0; i < this.numParticles; i++) {
            let size;

            // Assign size based on whether it's a larger particle or a regular one
            if (this.type === 'PROJECTILE' && i < largerParticleCount) {
              size = p.random(10, 12); // Extra large particles for PROJECTILE
            } else {
              size = this.type === 'BLINKING' ? p.random(1, 9) : p.random(1, 8); // Smaller particles
            }
            let speed = this.type === 'BLINKING' ? (() => {
              // Inline definition for BLINKING firework speed calculation
              let speed;
              if (size >= 1 && size < 2) {
                speed = p.random(0.5, 2.7);
              } else if (size >= 2 && size < 3) {
                speed = p.random(2.5, 4.7);
              } else if (size >= 3 && size < 4) {
                speed = p.random(4.5, 6.7);
              } else if (size >= 4 && size < 5) {
                speed = p.random(6.5, 8.7);
              } else if (size >= 5 && size < 6) {
                speed = p.random(8.5, 8.7);
              } else if (size >= 6 && size < 7) {
                speed = p.random(8.8, 9);
              } else if (size >= 7 && size < 8) {
                speed = p.random(9.1, 9.2);
              } else if (size >= 8 && size < 9) {
                speed = p.random(9.2, 9.3);
              } else {
                speed = p.random(9.4, 9.5);
              }
              return adjustForScreenWidth(speed);
            })() : (() => {
              // Inline definition for PROJECTILE firework speed calculation
              let speed;
              if (size >= 1 && size < 7) {
                speed = p.random(1, 9);
              } else if (size >= 7 && size < 9) {
                speed = p.random(8, 9);
              } else if (size >= 10 && size < 12) {
                speed = p.random(9, 9.2);
              } else {
                speed = p.random(1, 4);
              }
              return adjustForScreenWidth(speed);
            })();

            // Function to adjust speed based on screen size
            function adjustForScreenWidth(speed) {
              let screenWidth = p.windowWidth;
              let screenMultiplier = 1; // Default multiplier

              if (screenWidth < 768) {
                screenMultiplier = p.random(1.8, 2.6);
              } else if (screenWidth >= 768 && screenWidth <= 1024) {
                screenMultiplier = p.random(1.6, 2.2);
              } else if (screenWidth > 1024) {
                screenMultiplier = p.random(1.2, 2.2);
              }
              return speed * screenMultiplier;
            }
            let angle = p.random(p.TWO_PI);
            let velocity = p.createVector(p.cos(angle), p.sin(angle)).mult(speed);

            // Apply a smaller influence from firework velocity if particle is in line with the projectile
            let angleDiff = Math.abs(p.atan2(velocity.y, velocity.x) - p.atan2(initialVel.y, initialVel.x));

            // If angle difference is small (i.e., the particle is moving along the same vector as the firework's trajectory), apply less multiplier
            let velocityMultiplier = angleDiff < p.HALF_PI / 4 ? p.random(0, 0.5) : p.random(0.5, 0.8);
            velocity.add(initialVel.mult(velocityMultiplier)); // Small influence from projectile velocity

            let hasTrail = size > 6; // Larger particles have trails

            let type = 'BLINKING';
            let particle = new Particle(this.firework.pos.x + p.random(-2, 6), this.firework.pos.y + p.random(-2, 6), this.col, false, size, type, hasTrail);
            particle.vel = velocity;
            this.particles.push(particle);
          }
          this.exploded = true;
          this.explosionStartTime = p.millis();
        }
        update() {
          if (!this.exploded) {
            let direction = p.createVector(this.targetX - this.firework.pos.x, this.targetY - this.firework.pos.y);
            direction.normalize();
            let launchSpeed;
            if (p.windowWidth < 768) {
              launchSpeed = p.random(6, 11);
            } else if (p.windowWidth <= 1024) {
              launchSpeed = p.random(5, 9); // Moderate speed boost for medium screens
            } else {
              launchSpeed = p.random(3, 8);
            }
            direction.mult(launchSpeed);
            this.firework.vel = direction;
            this.firework.update();
            if (p.dist(this.firework.pos.x, this.firework.pos.y, this.targetX, this.targetY) < 10) {
              this.explode();
            }
          }
          for (let i = this.particles.length - 1; i >= 0; i--) {
            let particle = this.particles[i];
            particle.applyForce(p.createVector(0, 0.160)); // Apply gravity force
            particle.update();
            if (particle.isDone()) {
              this.particles.splice(i, 1);
            }
          }
        }
        show() {
          if (!this.exploded) {
            this.firework.show();
          }
          for (let particle of this.particles) {
            particle.show();
          }
        }
      }
      function addNewFirework(fireworkType) {
        const startX = p.width / 2;
        const startY = p.height;
        const selectedAlt1 = latestItems.current?.[0]?.alt1 || '';
        const colorArray = latestColorMapping.current[selectedAlt1] || [];

        // Early exit if no colors are available
        if (!colorArray.length) {
          console.warn(`No colors available for alt1: '${selectedAlt1}'`);
          return;
        }
        let topColorCount;
        if (p.windowWidth >= 1025) {
          topColorCount = 3;
        } else if (p.windowWidth >= 768) {
          topColorCount = 2;
        } else {
          topColorCount = 1;
        }

        // Safely extract just 0, 1, and 3 (skip index 2)
        const usableColors = [colorArray[0], colorArray[1], colorArray[3]].filter(Boolean); // filter out undefined if array is incomplete
        if (usableColors.length === 0) return;
        const randomHex = usableColors[Math.floor(p.random(usableColors.length))]; // Pick one color

        const brightnessMultiplier = p.random(1, 1.4);
        const adjustedHex = adjustBrightness(randomHex, brightnessMultiplier);
        const fireworkColor = p.color(adjustedHex);
        const targetX = p.width / 2 + p.random(-50, 50);
        const targetY = fireworkType === 'BLINKING' ? p.height * 0.2 : p.height * 0.7;
        lastLaunchPosition = p.createVector(targetX, targetY);
        fireworks.push(new Firework(startX, startY, targetX, targetY, fireworkColor, fireworkType));
      }
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        const firstFireworkType = Math.random() < 0.5 ? 'BLINKING' : 'PROJECTILE'; // Randomize first firework type
        addNewFirework(firstFireworkType); // Launch the first firework
        lastFireworkTime = p.millis(); // Reset lastFireworkTime after the first launch
      };
      hiddenDurationRef.current = 0;
      lastFireworkTime = 0;
      let fireworkToggle = true; // Starts with BLINKING
      let nextFireworkDelay = p.random(3000, 7000); // Random delay between 2000ms and 5000ms

      p.draw = () => {
        if (isRealMobileRef.current) {
          p.clear(); // transparent
        } else {
          p.background('#1e1e1f'); // fallback
        }
        if (!fireworksEnabledRef.current) {
          fireworksRef.current.length = 0;
          return;
        }
        for (let firework of fireworks) {
          firework.update();
          firework.show();
        }
        const adjustedTime = p.millis() - hiddenDurationRef.current;

        // Fix: fallback in case adjustedTime went backward or got corrupted
        if (adjustedTime < lastFireworkTime) {
          console.warn("Adjusted time went backward or stale. Forcing firework reset.");
          lastFireworkTime = adjustedTime - nextFireworkDelay - 1;
        }

        // Regular triggering condition
        if (adjustedTime - lastFireworkTime > nextFireworkDelay) {
          const fireworkType = fireworkToggle ? 'BLINKING' : 'PROJECTILE';
          addNewFirework(fireworkType);
          fireworkToggle = !fireworkToggle;
          lastFireworkTime = adjustedTime;
          nextFireworkDelay = p.random(2000, 8000);
        }
      };
    };
    p5InstanceRef.current = new (q5__WEBPACK_IMPORTED_MODULE_1___default())(sketch, canvasRef.current);
    return () => {
      destroyed = true;
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
      fireworksRef.current = [];
    };
  }, []);
  const toggleFireworks = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(isEnabled => {
    setFireworksEnabled(isEnabled);
    fireworksEnabledRef.current = isEnabled; // update live value for q5
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (onToggleFireworks) {
      onToggleFireworks(toggleFireworks);
    }
  }, [onToggleFireworks, toggleFireworks]); // Ensure dependencies are stable  

  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    ref: canvasRef
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FireworksDisplay);

/***/ }),

/***/ "./src/dynamic-app/components/footer.jsx":
/*!***********************************************!*\
  !*** ./src/dynamic-app/components/footer.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");


const Footer = ({
  customArrowIcon2,
  linkArrowIcon
}) => {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("footer", {
    className: "footer",
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "footer-links",
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "nav-item",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "nav-link-2",
          role: "button",
          tabIndex: 0,
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "name",
            children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
              children: "What is DMI?"
            })
          }), customArrowIcon2 && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "arrow3",
            dangerouslySetInnerHTML: {
              __html: customArrowIcon2
            }
          })]
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "nav-item",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "nav-link-2",
          role: "button",
          tabIndex: 0,
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
            children: "Case Studies"
          }), customArrowIcon2 && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "arrow3",
            dangerouslySetInnerHTML: {
              __html: customArrowIcon2
            }
          })]
        })
      })]
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "footer-info",
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "nav-item",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
          href: "https://www.linkedin.com/in/efe-ozalp/" // Replace with your portfolio link
          ,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "nav-link-2",
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
            children: "UI/UX & Development by Efe Ozalp"
          }), linkArrowIcon && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            id: "link-arrow",
            className: "arrow3",
            dangerouslySetInnerHTML: {
              __html: linkArrowIcon
            }
          })]
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "nav-item",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
          href: "https://www.instagram.com/yxuart/" // Replace with the illustrator's profile link
          ,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "nav-link-2",
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
            children: "Illustrations by Yiner Xu @yxuart"
          }), linkArrowIcon && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            id: "link-arrow",
            className: "arrow3",
            dangerouslySetInnerHTML: {
              __html: linkArrowIcon
            }
          })]
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ }),

/***/ "./src/dynamic-app/components/homepage-UIcards.jsx":
/*!*********************************************************!*\
  !*** ./src/dynamic-app/components/homepage-UIcards.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/media-providers/media-loader */ "./src/utils/media-providers/media-loader.tsx");
/* harmony import */ var _utils_context_providers_style_injector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/context-providers/style-injector */ "./src/utils/context-providers/style-injector.ts");
/* harmony import */ var _styles_dynamic_app_UIcards_css_raw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/dynamic-app/UIcards.css?raw */ "./src/styles/dynamic-app/UIcards.css?raw");
/* harmony import */ var _styles_dynamic_app_UIcards_css_raw__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_UIcards_css_raw__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/dynamic-app/components/homepage-UIcards.jsx





const UIcards = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef(function UIcards({
  title,
  image1,
  image2,
  alt1,
  alt2,
  url1,
  className = '',
  customArrowIcon2
}, ref) {
  (0,_utils_context_providers_style_injector__WEBPACK_IMPORTED_MODULE_2__.useStyleInjection)((_styles_dynamic_app_UIcards_css_raw__WEBPACK_IMPORTED_MODULE_3___default()), 'dynamic-ui-card-style');
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    ref: ref,
    className: `card-container ${className}`,
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: `image-container ${className}`,
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
        href: url1,
        className: `ui-link ${className}`,
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_1__["default"], {
          type: "image",
          src: image2,
          alt: alt1,
          className: `ui-image1 ${className}`,
          priority: true
        })
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: `image-container2 ${className}-2`,
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
        href: url1,
        className: `ui-link-3 ${className}`,
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_1__["default"], {
          type: "image",
          src: image1,
          alt: alt2,
          className: `ui-image2 ${className}-2`,
          priority: true
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h-name", {
        className: `image-title ${className}`,
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("a", {
          href: url1,
          className: `ui-link-2 ${className}`,
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
            className: "title-text",
            children: title
          }), customArrowIcon2 && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "svg-icon",
            dangerouslySetInnerHTML: {
              __html: customArrowIcon2
            }
          })]
        })
      })]
    })]
  });
});
UIcards.displayName = 'UIcards';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UIcards);

/***/ }),

/***/ "./src/dynamic-app/components/navigation.jsx":
/*!***************************************************!*\
  !*** ./src/dynamic-app/components/navigation.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_fetchGallery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/fetchGallery */ "./src/dynamic-app/lib/fetchGallery.js");
/* harmony import */ var _utils_context_providers_style_injector_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/context-providers/style-injector.ts */ "./src/utils/context-providers/style-injector.ts");
/* harmony import */ var _styles_dynamic_app_navigation_css_raw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/dynamic-app/navigation.css?raw */ "./src/styles/dynamic-app/navigation.css?raw");
/* harmony import */ var _styles_dynamic_app_navigation_css_raw__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_navigation_css_raw__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");





const Navigation = ({
  activeColor,
  customArrowIcon,
  customArrowIcon2,
  isInShadow = false
}) => {
  const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [lastScrollY, setLastScrollY] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [isScrollingUp, setIsScrollingUp] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [isScrolled, setIsScrolled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [galleryImages, setGalleryImages] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [showScrollHint, setShowScrollHint] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [hasShownScrollHint, setHasShownScrollHint] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,_utils_context_providers_style_injector_ts__WEBPACK_IMPORTED_MODULE_2__.useStyleInjection)((_styles_dynamic_app_navigation_css_raw__WEBPACK_IMPORTED_MODULE_3___default()), 'dynamic-app-style-nav');
  const toggleMenu = () => {
    if (isInShadow) return; // no nav in shadow mock
    setIsOpen(prev => !prev);
  };
  const handleCloseMenu = () => setIsOpen(false);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Always visible if near the top
    if (currentScrollY <= 5) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(currentScrollY < lastScrollY);
    }
    setIsScrolled(currentScrollY > window.innerHeight * 0.1);
    setLastScrollY(currentScrollY);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.body.classList.toggle('no-scroll', isOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchImages = async () => {
      try {
        const images = await (0,_lib_fetchGallery__WEBPACK_IMPORTED_MODULE_1__["default"])();
        setGalleryImages(images);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };
    fetchImages();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (window.innerWidth > 1024) {
      const galleryContainer = document.querySelector('.image-container-g');
      const handleHorizontalScroll = e => {
        if (galleryContainer) {
          e.preventDefault();
          galleryContainer.scrollLeft += e.deltaY;
        }
      };
      if (galleryContainer) {
        galleryContainer.addEventListener('wheel', handleHorizontalScroll);
      }
      return () => {
        if (galleryContainer) {
          galleryContainer.removeEventListener('wheel', handleHorizontalScroll);
        }
      };
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const gallery = document.querySelector('.image-container-g');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!gallery || !scrollIndicator) return;
    const updateScrollIndicator = () => {
      if (window.innerWidth > 1024) {
        const scrollWidth = gallery.scrollWidth - gallery.clientWidth;
        const scrollLeft = gallery.scrollLeft;
        const percentage = scrollWidth > 0 ? Math.max(2, scrollLeft / scrollWidth * 100) : 2;
        scrollIndicator.style.setProperty('--progress-dimension', `${percentage}%`);
      } else {
        const scrollHeight = gallery.scrollHeight - gallery.clientHeight;
        const scrollTop = gallery.scrollTop;
        if (scrollHeight > 0) {
          const normalPercentage = 100 - scrollTop / scrollHeight * 100;
          const reversedPercentage = Math.min(100, Math.max(2, 100 - normalPercentage));
          scrollIndicator.style.setProperty('--progress-dimension', `${reversedPercentage}%`);
        } else {
          scrollIndicator.style.setProperty('--progress-dimension', '2%');
        }
      }
    };
    updateScrollIndicator();
    gallery.addEventListener('scroll', updateScrollIndicator);
    return () => {
      gallery.removeEventListener('scroll', updateScrollIndicator);
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isOpen && !hasShownScrollHint) {
      setShowScrollHint(true);
      const fadeOutTimeout = setTimeout(() => {
        const hintElement = document.querySelector('.scroll-hint');
        if (hintElement) hintElement.style.opacity = '0';
      }, 3000);
      const removeTimeout = setTimeout(() => {
        setShowScrollHint(false);
        setHasShownScrollHint(true);
      }, 4000);
      return () => {
        clearTimeout(fadeOutTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [isOpen, hasShownScrollHint]);
  const hexToRgba = (hex, alpha = 0.1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const adjustBrightness = (hex, multiplier) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.min(255, Math.max(0, Math.floor(r * multiplier)));
    g = Math.min(255, Math.max(0, Math.floor(g * multiplier)));
    b = Math.min(255, Math.max(0, Math.floor(b * multiplier)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  const darkenedColor = adjustBrightness(activeColor, 0.55);
  const edgeColor = adjustBrightness(activeColor, 0.8);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("nav", {
    className: `navigation ${isScrollingUp ? 'visible' : 'hidden'} ${isInShadow ? 'navigation--shadow' : ''}`,
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: `top-bar-items ${isOpen ? 'menu-open' : ''}`,
      style: {
        background: isOpen ? 'transparent' : isScrolled ? hexToRgba(activeColor, 0.8) : 'transparent',
        backdropFilter: isScrolled && !isOpen ? 'blur(5px)' : 'none'
      },
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "site-title",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h-title", {
          className: "title",
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
            href: "/",
            className: "homepage-link",
            children: "DMI"
          })
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "menu-icon",
        onClick: toggleMenu,
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: `hamburger ${isOpen ? 'open' : ''}`
        })
      })]
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: `menu-item ${isOpen ? 'open' : ''}`,
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "menu-item-1",
        onClick: handleCloseMenu
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "menu-item-2",
        style: {
          '--darkenedColor': darkenedColor,
          '--darkerColor': edgeColor
        },
        children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "menu-nav",
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "nav-item",
            children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("a", {
              href: "/dynamic-theme",
              className: "nav-link",
              children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "name",
                children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h4", {
                  children: "What is DMI?"
                })
              }), customArrowIcon2 && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "arrow1",
                dangerouslySetInnerHTML: {
                  __html: customArrowIcon2
                }
              })]
            })
          }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "nav-item",
            children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("a", {
              href: "/dynamic-theme",
              className: "nav-link",
              children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h4", {
                children: "Case Studies"
              }), customArrowIcon2 && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "arrow1",
                dangerouslySetInnerHTML: {
                  __html: customArrowIcon2
                }
              })]
            })
          })]
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "gallery-wrapper",
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "scroll-indicator"
          }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "gallery-container",
            children: [showScrollHint && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "scroll-hint",
              children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h5", {
                children: "Scroll to explore"
              }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                className: "arrow2",
                dangerouslySetInnerHTML: {
                  __html: customArrowIcon
                }
              })]
            }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "image-container-g",
              children: galleryImages.map((img, index) => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                src: img.url,
                alt: img.alt,
                draggable: "false",
                className: `gallery-image image-${index}`
              }, index))
            })]
          })]
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navigation);

/***/ }),

/***/ "./src/dynamic-app/components/pauseButton.jsx":
/*!****************************************************!*\
  !*** ./src/dynamic-app/components/pauseButton.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lottie_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lottie-react */ "lottie-react");
/* harmony import */ var lottie_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lottie_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lottie_pauseButton_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lottie/pauseButton.json */ "./src/dynamic-app/lottie/pauseButton.json");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
/* Pause Animation Option - Accessibility */

 // Import Lottie React
 // Import your JSON animation

const PauseButton = ({
  toggleP5Animation
}) => {
  const lottieRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(); // Ref for Lottie animation
  const [isClicked, setIsClicked] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false); // Track click state
  const [currentFrame, setCurrentFrame] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(3); // Start at frame 3

  // Sync initial state with the fireworks rendering logic
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (toggleP5Animation) {
      toggleP5Animation(!isClicked); // Initial sync
    }
  }, [toggleP5Animation, isClicked]);
  const handleMouseEnter = () => {
    if (lottieRef.current && !isClicked) {
      // Play the animation from frame 3 to frame 10 on hover
      lottieRef.current.playSegments([3, 10], true);
    }
  };
  const handleMouseLeave = () => {
    if (lottieRef.current && !isClicked) {
      // Pause the animation and leave it at the last hovered frame
      lottieRef.current.goToAndStop(currentFrame, true);
    }
  };
  const handleClick = event => {
    event.stopPropagation(); // Prevent the event from reaching parent components

    if (lottieRef.current) {
      let targetFrame = isClicked ? 3 : 20; // Toggle between frames
      lottieRef.current.playSegments([currentFrame, targetFrame], true);
      setCurrentFrame(targetFrame);
      setIsClicked(!isClicked);

      // Notify the parent about the toggle
      if (toggleP5Animation) {
        toggleP5Animation(!isClicked);
      }
    }
  };
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "lottie-container",
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick // Trigger click behavior
    ,
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)((lottie_react__WEBPACK_IMPORTED_MODULE_1___default()), {
      lottieRef: lottieRef,
      animationData: _lottie_pauseButton_json__WEBPACK_IMPORTED_MODULE_2__,
      loop: false // Disable looping
      ,
      autoplay: false // Start paused
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PauseButton);

/***/ }),

/***/ "./src/dynamic-app/components/sortBy.jsx":
/*!***********************************************!*\
  !*** ./src/dynamic-app/components/sortBy.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preload_dynamic_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../preload-dynamic-app */ "./src/dynamic-app/preload-dynamic-app.ts");
/* harmony import */ var _utils_context_providers_style_injector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/context-providers/style-injector */ "./src/utils/context-providers/style-injector.ts");
/* harmony import */ var _styles_dynamic_app_sortByStyles_css_raw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/dynamic-app/sortByStyles.css?raw */ "./src/styles/dynamic-app/sortByStyles.css?raw");
/* harmony import */ var _styles_dynamic_app_sortByStyles_css_raw__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_sortByStyles_css_raw__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");

// pull from preloader (images only)




const options = [{
  value: 'random',
  label: 'Randomized'
}, {
  value: 'titleAsc',
  label: 'A to Z'
}, {
  value: 'titleDesc',
  label: 'Z to A'
}];
const shuffleArray = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
function localSort(data, mode) {
  if (!Array.isArray(data)) return [];
  switch (mode) {
    case 'titleAsc':
      return [...data].sort((a, b) => (a?.title || '').localeCompare(b?.title || ''));
    case 'titleDesc':
      return [...data].sort((a, b) => (b?.title || '').localeCompare(a?.title || ''));
    case 'random':
    default:
      return shuffleArray(data);
  }
}
function SortBy({
  onFetchItems,
  customArrowIcon,
  colorMapping,
  getRoot = () => document
}) {
  const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [selectedValue, setSelectedValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('random');

  // Base dataset from preload
  const [baseItems, setBaseItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  // Derived list shown in UI
  const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // inject CSS into shadow root (or document)
  (0,_utils_context_providers_style_injector__WEBPACK_IMPORTED_MODULE_2__.useStyleInjection)((_styles_dynamic_app_sortByStyles_css_raw__WEBPACK_IMPORTED_MODULE_3___default()), 'dynamic-app-style-sortby');
  const handleOptionClick = value => {
    setSelectedValue(value);
    setIsOpen(false);
  };
  const handleClickOutside = e => {
    const root = typeof getRoot === 'function' ? getRoot() : document;
    const pauseButton = root.querySelector?.('.lottie-container');
    const target = e.target;
    if (dropdownRef.current && target && !dropdownRef.current.contains(target) && (!pauseButton || !pauseButton.contains(target))) {
      setIsOpen(false);
    }
  };

  // click-outside listener bound to the same root as the UI
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const root = typeof getRoot === 'function' ? getRoot() : document;
    root.addEventListener?.('mousedown', handleClickOutside);
    return () => root.removeEventListener?.('mousedown', handleClickOutside);
  }, [getRoot]);

  // 1) Get images from preload cache (or ensure preload if empty)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let cancelled = false;
    const cached = (0,_preload_dynamic_app__WEBPACK_IMPORTED_MODULE_1__.getPreloadedDynamicApp)();
    if (cached.images?.length) {
      if (!cancelled) setBaseItems(cached.images);
    } else {
      (0,_preload_dynamic_app__WEBPACK_IMPORTED_MODULE_1__.ensureImagesPreload)().then(images => {
        if (!cancelled) setBaseItems(images || []);
      }).catch(() => {
        if (!cancelled) setBaseItems([]);
      });
    }
    return () => {
      cancelled = true;
    };
  }, []);

  // 2) Derive items whenever base or sort option changes (no network here)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const derived = localSort(baseItems, selectedValue);
    setItems(derived);
    onFetchItems?.(derived);
  }, [baseItems, selectedValue, onFetchItems]);

  // Responsive index logic for color sampling
  const [screenWidth, setScreenWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(typeof window !== 'undefined' ? window.innerWidth : 1200);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const onResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const itemIndex = screenWidth >= 1025 ? 2 : screenWidth >= 768 ? 1 : 0;
  const convertHexToRGBA = (hex, alpha) => {
    const h = (hex || '#ffffff').replace('#', '');
    const r = parseInt(h.slice(0, 2) || 'ff', 16);
    const g = parseInt(h.slice(2, 4) || 'ff', 16);
    const b = parseInt(h.slice(4, 6) || 'ff', 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const borderItemColor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const alt = items[itemIndex]?.alt1;
    const color = Array.isArray(colorMapping?.[alt]) ? colorMapping[alt][2] : '#ffffff';
    return convertHexToRGBA(color, 0.8);
  }, [items, colorMapping, itemIndex]);
  const boxShadowItemColor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const alt = items[itemIndex]?.alt1;
    return Array.isArray(colorMapping?.[alt]) ? colorMapping[alt][3] : '#ffffff';
  }, [items, colorMapping, itemIndex]);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "sort-by-container",
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "sort-container",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
        children: "Sort by:"
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "sort-container2",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "custom-dropdown",
        ref: dropdownRef,
        style: {
          border: `solid 1.6px ${borderItemColor}`,
          boxShadow: `0 1px 8px rgba(0,0,0,0.1), 0 22px 8px rgba(0,0,0,0.08), 12px 12px ${boxShadowItemColor}`
        },
        children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "custom-select",
          onClick: () => setIsOpen(!isOpen),
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "selected-value",
            children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h5", {
              children: options.find(opt => opt.value === selectedValue)?.label
            })
          }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
            className: `custom-arrow ${isOpen ? 'open' : ''}`,
            children: customArrowIcon && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              dangerouslySetInnerHTML: {
                __html: customArrowIcon
              }
            })
          })]
        }), isOpen && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "options-container",
          style: {
            border: `solid 1.6px ${borderItemColor}`,
            borderTop: 'none'
          },
          children: options.map(option => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: `option ${option.value === selectedValue ? 'selected' : ''}`,
            onClick: () => handleOptionClick(option.value),
            children: option.label
          }, option.value))
        })]
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SortBy);

/***/ }),

/***/ "./src/dynamic-app/components/title.jsx":
/*!**********************************************!*\
  !*** ./src/dynamic-app/components/title.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_context_providers_style_injector_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/context-providers/style-injector.ts */ "./src/utils/context-providers/style-injector.ts");
/* harmony import */ var _styles_dynamic_app_title_css_raw__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/dynamic-app/title.css?raw */ "./src/styles/dynamic-app/title.css?raw");
/* harmony import */ var _styles_dynamic_app_title_css_raw__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_title_css_raw__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// TitleDivider component (no flicker on enter/leave)




const isTriplet = v => Array.isArray(v) && v.length === 3 && v.every(x => typeof x === 'string');
const TitleDivider = ({
  svgIcon,
  movingTextColors,
  pauseAnimation
}) => {
  (0,_utils_context_providers_style_injector_ts__WEBPACK_IMPORTED_MODULE_1__.useStyleInjection)((_styles_dynamic_app_title_css_raw__WEBPACK_IMPORTED_MODULE_2___default()), 'dynamic-app-style-title');

  // ----- visibility of this component -----
  const rootRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [isVisible, setIsVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setIsVisible(!!entry.isIntersecting), {
      threshold: 0.01
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ----- stable palette that only changes when visible -----
  const defaultTriplet = ['#70c6b0', '#5670b5', '#50b0c5'];
  const incoming = isTriplet(movingTextColors) ? movingTextColors : defaultTriplet;
  const [stableColors, setStableColors] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(incoming);
  const pendingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // shallow compare helper
  const sameTriplet = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

  // When palette prop changes: apply immediately if visible, else stash it.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isTriplet(incoming)) return;
    if (isVisible) {
      setStableColors(prev => sameTriplet(prev, incoming) ? prev : incoming);
      pendingRef.current = null;
    } else {
      // hold for later to avoid flicker while hidden
      pendingRef.current = incoming;
    }
  }, [incoming, isVisible]);

  // When we become visible, commit any pending palette once.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isVisible && pendingRef.current && !sameTriplet(stableColors, pendingRef.current)) {
      setStableColors(pendingRef.current);
      pendingRef.current = null;
    }
  }, [isVisible, stableColors]);

  // ----- brightness adjust + smooth transition -----
  const adjustBrightness = (hex, mul) => {
    if (!/^#[0-9a-f]{6}$/i.test(hex)) return hex;
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.min(255, Math.max(0, Math.floor(r * mul)));
    g = Math.min(255, Math.max(0, Math.floor(g * mul)));
    b = Math.min(255, Math.max(0, Math.floor(b * mul)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  const colors = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => [adjustBrightness(stableColors[0], 1.05), adjustBrightness(stableColors[1], 1.25), adjustBrightness(stableColors[2], 1.10)], [stableColors]);
  const textSegments = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => [{
    text: 'Institute Gallery',
    suffix: ''
  }, {
    text: 'Dyna',
    suffix: 'mic Media'
  }, {
    text: 'Dyn',
    suffix: 'mic Media'
  }], []);
  const renderMovingContent = (repeatCount = 2) => [...Array(repeatCount)].flatMap((_, repeatIndex) => textSegments.map((segment, i) => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
    className: "moving-text",
    style: {
      color: colors[i],
      transition: 'color 180ms linear'
    },
    children: [segment.text, (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: "logo-container",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "svg-icon"
        // If your injected SVG respects currentColor, you could instead set color here.
        ,
        style: {
          fill: colors[i],
          transition: 'fill 180ms linear'
        },
        dangerouslySetInnerHTML: {
          __html: svgIcon
        }
      })
    }), segment.suffix]
  }, `${repeatIndex}-${i}`)));
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "title-container",
    ref: rootRef,
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "static-title",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h1", {
        children: "MassArt 2024"
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: `moving-title ${pauseAnimation ? 'paused' : ''}`,
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h1", {
        className: "title-with-icon moving-text-wrapper",
        children: renderMovingContent()
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TitleDivider);

/***/ }),

/***/ "./src/dynamic-app/lib/colorString.ts":
/*!********************************************!*\
  !*** ./src/dynamic-app/lib/colorString.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorMapping: () => (/* binding */ colorMapping)
/* harmony export */ });
// Student → color set mapping
const colorMapping = {
  'Yiner Xu ': ['#e9b2c2', '#ffc3d4', '#5f4f53', '#ffc9d8'],
  'Simone Schwartz': ['#d2b098', '#f0be9b', '#5b4e44', '#f2c5a5'],
  'Seth Abrahamson ': ['#a9a9a9', '#b9b9b9', '#292929', '#c0c0c0'],
  'Sanna Anwar': ['#e9d0a0', '#ffe4af', '#2f2d28', '#ffe7b7'],
  'Javi Ortiz': ['#e9afbd', '#ffbfcf', '#2f2a2b', '#ffc5d4'],
  'Janhvi Gokalgandhi': ['#a0e1e9', '#aff7ff', '#282e2f', '#b7f8ff'],
  'Andrew Adamides': ['#bef9da', '#7ca08d', '#262a28', '#9dccb4'],
  'Shozab Raza': ['#e9e0a7', '#fff6b6', '#2f2e29', '#fff7bd'],
  'Baopu Wang': ['#b3c2e9', '#c4d4ff', '#4f535f', '#cad8ff'],
  'Efe Ozalp': ['#6fc1e9', '#78d3ff', '#242b2f', '#85d7ff'],
  'Harry Liao ': ['#abcdb2', '#b5e7be', '#292d2a', '#bceac5'],
  'Jawad Naik': ['#97cfac', '#9bedb9', '#272d29', '#a5efc0']
};

/***/ }),

/***/ "./src/dynamic-app/lib/fetchGallery.js":
/*!*********************************************!*\
  !*** ./src/dynamic-app/lib/fetchGallery.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_sanity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/sanity */ "./src/utils/sanity.ts");
// Fetch gallery images for the navigation menu

const fetchGallery = async () => {
  const query = `
    *[_type == "gallery"]{
      _id,
      images[] {
        image {
          asset-> {
            url
          }
        },
        altText
      }
    }
  `;
  try {
    const data = await _utils_sanity__WEBPACK_IMPORTED_MODULE_0__["default"].fetch(query);

    // Flatten and randomize images
    const flattenedImages = data.flatMap(gallery => gallery.images.map((img, index) => ({
      url: img.image?.asset?.url || '',
      alt: img.altText || 'Default Alt Text',
      cssClass: `gallery-image-${index}` // Generate unique class names here if needed
    })));
    const shuffledImages = flattenedImages.sort(() => Math.random() - 0.5);
    return shuffledImages;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return [];
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchGallery);

/***/ }),

/***/ "./src/dynamic-app/lib/setupAltObserver.js":
/*!*************************************************!*\
  !*** ./src/dynamic-app/lib/setupAltObserver.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let currentlyActiveAlt1 = null;
let highestVisibility = 0;
let debounceTimeout = null;
const setupAltObserver = (onActivate, onDeactivate, rootElement = document) => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: Array.from(Array(101).keys(), x => x / 100)
  };
  const observerCallback = entries => {
    entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    entries.forEach(entry => {
      const element = entry.target;
      const imageElement = element.querySelector('.ui-image1');
      if (imageElement) {
        const alt1Value = imageElement.getAttribute('alt');
        const visibility = entry.intersectionRatio;
        if (visibility > 0.1 && visibility > highestVisibility) {
          if (currentlyActiveAlt1 !== alt1Value) {
            if (currentlyActiveAlt1) {
              onDeactivate(currentlyActiveAlt1);
            }
            onActivate(alt1Value);
            currentlyActiveAlt1 = alt1Value;
            highestVisibility = visibility;
          }
        } else if (visibility <= 0.1 && currentlyActiveAlt1 === alt1Value) {
          onDeactivate(alt1Value);
          currentlyActiveAlt1 = null;
          highestVisibility = 0;
        }
      }
    });
  };
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  const triggerInitialActivation = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const cards = Array.from(rootElement.querySelectorAll('.card-container'));
      const entries = cards.map(card => {
        const boundingRect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const visibility = Math.max(0, Math.min(boundingRect.height, viewportHeight - boundingRect.top) / boundingRect.height);
        return {
          target: card,
          intersectionRatio: visibility
        };
      });
      observerCallback(entries);
    }, 50);
  };
  rootElement.querySelectorAll('.card-container').forEach(card => observer.observe(card));
  triggerInitialActivation();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setupAltObserver);

/***/ }),

/***/ "./src/dynamic-app/lottie/pauseButton.json":
/*!*************************************************!*\
  !*** ./src/dynamic-app/lottie/pauseButton.json ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"v":"5.12.1","fr":30,"ip":0,"op":20,"w":1024,"h":1024,"nm":"PauseButton","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[550.752,510.464,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":0,"s":[112,112,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,1.147]},"t":5,"s":[112,112,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,2.855]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":9,"s":[117,117,100]},{"t":10,"s":[112,112,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-42,-167],[-129,-167],[-129,169],[-42,169],[-41.917,2.38]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":10,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-42,-167],[-129,-167],[-129,169],[-42,169],[-41.917,2.38]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":15.333,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-27.778,-125.889],[-129,-167],[-129,169],[-27.556,128.333],[46.165,1.794]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":16,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-26,-120.75],[-129,-167],[-129,169],[-25.75,121.583],[57.175,1.721]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":16.667,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-24.222,-115.611],[-129,-167],[-129,169],[-23.111,116.361],[68.185,1.647]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":17.333,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-22.444,-110.472],[-129,-167],[-129,169],[-21.889,111.222],[79.195,1.574]],"c":true}]},{"t":20,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-15.333,-89.917],[-129,-167],[-129,169],[-14.917,92.75],[123.236,1.281]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0.760784327984,0.760784327984,0.760784327984,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":2,"s":[0.760784327984,0.760784327984,0.760784327984,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":9,"s":[0.270588248968,0.270588248968,0.270588248968,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":10,"s":[0.956862747669,0.956862747669,0.956862747669,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":11,"s":[1,1,1,1]},{"t":20,"s":[0.956862747669,0.956862747669,0.956862747669,1]}],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[120,120],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-42,-167],[-129,-167],[-129,169],[-42,169]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":10,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-42,-167],[-129,-167],[-129,169],[-42,169]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":13.333,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-13.667,-32.833],[-91.5,-86.583],[-91.917,78.583],[-13.667,34.833]],"c":true}]},{"t":20,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-23.667,-12],[-83.583,-59.917],[-81.5,61.083],[-24.5,15.667]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0.760784327984,0.760784327984,0.760784327984,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":2,"s":[0.760784327984,0.760784327984,0.760784327984,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":9,"s":[0.270588248968,0.270588248968,0.270588248968,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":10,"s":[0.956862747669,0.956862747669,0.956862747669,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":11,"s":[1,1,1,1]},{"t":20,"s":[0.956862747669,0.956862747669,0.956862747669,1]}],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[136,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[120,120],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":10,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":18,"s":[100]},{"t":20,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 2","np":3,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"rd","nm":"Round Corners 1","r":{"a":0,"k":59,"ix":1},"ix":3,"mn":"ADBE Vector Filter - RC","hd":false}],"ip":0,"op":20,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[510,514,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":0,"s":[100,100,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,-0.758]},"t":5,"s":[100,100,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.242]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":9,"s":[105,105,100]},{"t":10,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[1028,1028],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":200,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0.760784327984,0.760784327984,0.760784327984,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":2,"s":[0.760784327984,0.760784327984,0.760784327984,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":9,"s":[0.270588368177,0.270588368177,0.270588368177,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":10,"s":[0.956862745098,0.956862745098,0.956862745098,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":11,"s":[1,1,1,1]},{"t":20,"s":[0.956862747669,0.956862747669,0.956862747669,1]}],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[135]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":5,"s":[135]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":9,"s":[115]},{"t":10,"s":[135]}],"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[2,-2],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[79,79],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":20,"st":0,"ct":1,"bm":0}],"markers":[],"props":{}}');

/***/ }),

/***/ "./src/styles/dynamic-app/UIcards.css?raw":
/*!************************************************!*\
  !*** ./src/styles/dynamic-app/UIcards.css?raw ***!
  \************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/dynamic-app/index.css?raw":
/*!**********************************************!*\
  !*** ./src/styles/dynamic-app/index.css?raw ***!
  \**********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/dynamic-app/misc.css?raw":
/*!*********************************************!*\
  !*** ./src/styles/dynamic-app/misc.css?raw ***!
  \*********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/dynamic-app/navigation.css?raw":
/*!***************************************************!*\
  !*** ./src/styles/dynamic-app/navigation.css?raw ***!
  \***************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/dynamic-app/sortByStyles.css?raw":
/*!*****************************************************!*\
  !*** ./src/styles/dynamic-app/sortByStyles.css?raw ***!
  \*****************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/dynamic-app/title.css?raw":
/*!**********************************************!*\
  !*** ./src/styles/dynamic-app/title.css?raw ***!
  \**********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/loading-overlay.css?raw":
/*!********************************************!*\
  !*** ./src/styles/loading-overlay.css?raw ***!
  \********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/utils/context-providers/shadow-root-context.tsx":
/*!*************************************************************!*\
  !*** ./src/utils/context-providers/shadow-root-context.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShadowRootProvider: () => (/* binding */ ShadowRootProvider),
/* harmony export */   useShadowRoot: () => (/* binding */ useShadowRoot)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/utils/context-providers/shadow-root-context.tsx


const hasDOM = typeof document !== 'undefined';
const hasConstructedSheets = hasDOM && typeof globalThis.Document !== 'undefined' && 'adoptedStyleSheets' in Document.prototype && typeof globalThis.CSSStyleSheet !== 'undefined' && 'replaceSync' in CSSStyleSheet.prototype;
const isShadowRoot = node => typeof globalThis.ShadowRoot !== 'undefined' && node instanceof globalThis.ShadowRoot;
const ShadowRootContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
let warnedOnce = false;
const useShadowRoot = () => {
  const ctx = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ShadowRootContext);
  if (!ctx) {
    if (!warnedOnce) {
      // Dev-friendly, harmless in prod too; only once.
      console.warn('useShadowRoot called outside provider; falling back to document.');
      warnedOnce = true;
    }
    const injectStyle = (css, id) => {
      if (!hasDOM) return;
      const existing = document.head.querySelector(`style[data-style-id="${id}"]`);
      if (existing) return;
      const style = document.createElement('style');
      style.dataset.styleId = id;
      style.textContent = css;
      document.head.appendChild(style);
    };
    const injectLink = (href, id) => {
      if (!hasDOM) return;
      const selector = id ? `link[data-style-id="${id}"]` : `link[rel="stylesheet"][href="${href}"]`;
      if (document.head.querySelector(selector)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      if (id) link.dataset.styleId = id;
      document.head.appendChild(link);
    };
    const removeStyle = id => {
      if (!hasDOM) return;
      document.head.querySelector(`style[data-style-id="${id}"]`)?.remove();
    };
    return {
      getShadowRoot: () => null,
      injectStyle,
      injectLink,
      removeStyle
    };
  }
  return ctx;
};
function ShadowRootProvider({
  getShadowRoot,
  children
}) {
  // Cache constructed sheets per ID (per provider)
  const sheetCacheRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Map());
  const injectStyle = (css, id) => {
    const root = getShadowRoot();

    // If no shadow root, gracefully inject into document.head
    if (!isShadowRoot(root)) {
      if (!hasDOM) return;
      const existing = document.head.querySelector(`style[data-style-id="${id}"]`);
      if (existing) return;
      const style = document.createElement('style');
      style.dataset.styleId = id;
      style.textContent = css;
      document.head.appendChild(style);
      return;
    }

    // Shadow root path
    if (hasConstructedSheets) {
      let sheet = sheetCacheRef.current.get(id);
      if (!sheet) {
        sheet = new CSSStyleSheet();
        sheet.replaceSync(css);
        sheetCacheRef.current.set(id, sheet);
      }
      if (!root.adoptedStyleSheets.includes(sheet)) {
        root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
      }
      return;
    }

    // Fallback <style> in shadow root
    if (root.querySelector(`style[data-style-id="${id}"]`)) return;
    const style = document.createElement('style');
    style.textContent = css;
    style.dataset.styleId = id;
    root.appendChild(style);
  };
  const injectLink = (href, id) => {
    const root = getShadowRoot();

    // If no shadow root, use document.head
    if (!isShadowRoot(root)) {
      if (!hasDOM) return;
      const selector = id ? `link[data-style-id="${id}"]` : `link[rel="stylesheet"][href="${href}"]`;
      if (document.head.querySelector(selector)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      if (id) link.dataset.styleId = id;
      document.head.appendChild(link);
      return;
    }

    // Shadow root link injection
    const selector = id ? `link[data-style-id="${id}"]` : `link[rel="stylesheet"][href="${href}"]`;
    if (root.querySelector(selector)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    if (id) link.dataset.styleId = id;
    root.appendChild(link);
  };
  const removeStyle = id => {
    const root = getShadowRoot();

    // Remove from doc head if no shadow root
    if (!isShadowRoot(root)) {
      if (!hasDOM) return;
      document.head.querySelector(`style[data-style-id="${id}"]`)?.remove();
      return;
    }
    if (hasConstructedSheets) {
      const sheet = sheetCacheRef.current.get(id);
      if (sheet) {
        root.adoptedStyleSheets = root.adoptedStyleSheets.filter(s => s !== sheet);
      }
      return;
    }
    root.querySelector(`style[data-style-id="${id}"]`)?.remove();
  };
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ShadowRootContext.Provider, {
    value: {
      getShadowRoot,
      injectStyle,
      injectLink,
      removeStyle
    },
    children: children
  });
}

/***/ }),

/***/ "./src/utils/context-providers/style-injector.ts":
/*!*******************************************************!*\
  !*** ./src/utils/context-providers/style-injector.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useStyleInjection: () => (/* binding */ useStyleInjection)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shadow_root_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shadow-root-context */ "./src/utils/context-providers/shadow-root-context.tsx");
// injéct stylés whéN it isnt in shadow dom


const injected = (() => {
  if (typeof window !== 'undefined') {
    if (!window.__DYNAMIC_STYLE_IDS__) {
      window.__DYNAMIC_STYLE_IDS__ = new Set();
    }
    return window.__DYNAMIC_STYLE_IDS__;
  }
  return new Set(); // fallback, e.g., SSR
})();
const useStyleInjection = (css, id) => {
  const {
    injectStyle,
    getShadowRoot
  } = (0,_shadow_root_context__WEBPACK_IMPORTED_MODULE_1__.useShadowRoot)() || {};
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!id) {
      if (true) {
        console.warn('useStyleInjection: id is required for dedupe');
      }
      return;
    }
    const shadowRoot = getShadowRoot?.();
    const isInShadow = shadowRoot && shadowRoot !== document;
    if (isInShadow && injectStyle) {
      // Shadow DOM dedupe by ID
      if (!shadowRoot.querySelector(`style[data-style-id="${id}"]`)) {
        injectStyle(css, id); // provider handles DOM append
      }
    } else {
      // Global dedupe by ID
      if (!document.head.querySelector(`style[data-style-id="${id}"]`)) {
        const styleEl = document.createElement('style');
        styleEl.textContent = css;
        styleEl.dataset.styleId = id;
        document.head.appendChild(styleEl);
      }
    }
  }, [css, id, injectStyle, getShadowRoot]);
};

/***/ })

};
;
//# sourceMappingURL=src_dynamic-app_components_IntroOverlay_jsx-src_dynamic-app_components_fireworksDisplay_jsx-s-73dd24.server.js.map