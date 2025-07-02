import { useEffect, useRef, useState } from 'react';
import { useProjectVisibility } from '../../utils/project-visibility.tsx';
import BlockGOnboarding from './block-g-onboarding.tsx';
import q5 from 'q5';

const RockEscapade = () => {
  const canvasRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const { setBlockGClick } = useProjectVisibility();

  useEffect(() => {
    if (!initialized) return;

    const enforcePointerEventsNone = () => {
      const canvas = document.querySelector('.evade-the-rock canvas');
      if (canvas) canvas.style.pointerEvents = 'none';
    };

    enforcePointerEventsNone();
    const interval = setInterval(enforcePointerEventsNone, 1000);
    return () => clearInterval(interval);
  }, [initialized]);

  useEffect(() => {
    if (!initialized) setInitialized(true);
  }, [initialized]);

  const handleOnboardingStart = () => {
    console.log('Onboarding overlay clicked – trigger additional logic here');
    setBlockGClick(true);
    // Your additional logic can go here later
  };
  
  useEffect(() => {
    if (!initialized) return;

    const sketch = (p) => {
      let verticalMode = window.innerWidth < 768 && window.innerHeight > window.innerWidth;

      let rectangles = [];
      let octagons = [];
      let particles = [];
      let circle;
      let lastSpawnTime = 0;
      let lastOctagonSpawnTime = 0;
      let maxOctagons = 2;
      let rectangleSpawnRate = 2;
      let coins = 0;
      let gameOver = false;
      let fadeAlpha = 0;

      let movingUp = false;
      let movingDown = false;
      let movingLeft = false;
      let movingRight = false;

      p.setup = () => {
        let w = canvasRef.current?.clientWidth || 400;
        let h = canvasRef.current?.clientHeight || 400;

        if (window.innerWidth < 768) {
          w = window.innerWidth;
          h = window.innerHeight;
          maxOctagons = 1;
          rectangleSpawnRate = 3;
        }

        p.createCanvas(w, h);

        circle = new Circle(p, 240, h / 2, 33);

        for (let i = 0; i < maxOctagons; i++) {
          octagons.push(new Shape(p, true, true, verticalMode));
        }
      };

      p.draw = () => {
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

        let rectanglesInViewport = rectangles.filter(r => r.x + r.w > 0).length;
        if (rectanglesInViewport < 10) rectangleSpawnRate = 5;
        else if (rectanglesInViewport < 13) rectangleSpawnRate = 3;
        else if (rectanglesInViewport < 18) rectangleSpawnRate = 2;
        else rectangleSpawnRate = 0;

        if (rectangleSpawnRate > 0 && p.millis() - lastSpawnTime > 2000 / rectangleSpawnRate && rectangles.length < 25) {
          rectangles.push(new Shape(p, true, false, verticalMode));
          lastSpawnTime = p.millis();
        }

        for (let i = rectangles.length - 1; i >= 0; i--) {
          let r = rectangles[i];
          r.update();
          r.display();
          if (circle.overlaps(r)) gameOver = true;
          if (verticalMode ? r.y - r.h > p.height : r.x + r.w < 0) rectangles.splice(i, 1);
        }

        for (let i = 0; i < rectangles.length; i++) {
          let r1 = rectangles[i];
          for (let j = i + 1; j < rectangles.length; j++) {
            let r2 = rectangles[j];
            if (r1.overlaps(r2)) r1.resolveCollision(r2);
          }
        }

        if (p.millis() - lastOctagonSpawnTime > 2000 && octagons.length < 5) {
          if (p.random() < 0.5) octagons.push(new Shape(p, true, true, verticalMode));
          lastOctagonSpawnTime = p.millis();
        }

        for (let i = octagons.length - 1; i >= 0; i--) {
          let o = octagons[i];
          o.update();
          o.display();

          if (circle.overlaps(o)) {
            coins += 20;
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

        p.fill(255, 223, 0);
        p.textAlign(p.LEFT, p.TOP);
        p.textSize(32);
        p.text("COINS = " + coins, 54, 36);
      };

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

      const restartGame = () => {
        gameOver = false;
        fadeAlpha = 0;
        coins = 0;
        rectangles = [];
        octagons = [];
        particles = [];
        for (let i = 0; i < maxOctagons; i++) octagons.push(new Shape(p, true, true, verticalMode));
        circle = new Circle(p, 240, p.height / 2, 33);
      };

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
            this.vx = 0;
            this.vy = this.p.random(1.5, 3);
          } else {
            this.x = startOffScreen ? this.p.width + this.p.random(10, 40) : this.p.random(this.p.width);
            this.y = this.p.random(this.p.height);
            this.vx = this.p.random(-3, -1.5);
            this.vy = 0;
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
          this.lifespan -= 5;
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
    return () => {
      if (q5Instance && q5Instance.remove) q5Instance.remove();
      if (canvasRef.current) canvasRef.current.innerHTML = '';
    };
  }, [initialized]);

return (
    <section className="block-type-g" id="block-g" style={{ position: 'relative' }}>
      <div className="evade-the-rock" style={{ width: '100%', height: '100%' }} ref={canvasRef}></div>
      <BlockGOnboarding />
    </section>
  );
};

export default RockEscapade;
