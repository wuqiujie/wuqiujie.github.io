// ============ MATRIX RAIN BACKGROUND ============

(function initMatrix() {
  const canvas = document.getElementById("matrix-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+=-";
  const fontSize = 14;
  let columns = Math.floor(w / fontSize);
  let drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -20;
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "#00ff9c";
    ctx.font = fontSize + "px SFMono-Regular, Menlo, monospace";
    
    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(
        Math.floor(Math.random() * letters.length)
      );
      const x = i * fontSize;
      const y = drops[i] * fontSize;
    
      ctx.fillText(text, x, y);
    
      if (y > h && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += Math.random() * 0.8 + 0.6;
    }
    
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    columns = Math.floor(w / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -20;
    }
  });

  draw();
})();

// ============ TYPING EFFECT (首页用) ============

(function initTyping() {
  const typingEl = document.getElementById("typing");
  if (!typingEl) return;

  const roles = [
    "AR / VR Developer",
    "Game Programmer",
    "Graphics & HCI Explorer",
    "Interactive Experience Designer",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      if (charIndex > current.length) {
        deleting = true;
        typingEl.textContent = current;
        setTimeout(typeLoop, 900);
        return;
      }
    } else {
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    
    typingEl.textContent = current.slice(0, charIndex);
    const delay = deleting ? 40 : 80;
    setTimeout(typeLoop, delay);
  }

  typeLoop();
})();

// ============ SCROLL REVEAL ============

(function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
})();

// ============ YEAR ============

(function initYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();