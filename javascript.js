/* ================= ELEMENTOS ================= */
const envelopeBody = document.querySelector(".envelope");
const heartSpawner = document.getElementById("heart-spawner");
const letter = document.querySelector(".letter");
const closeBtn = document.getElementById("close-btn");

const startScreen = document.getElementById("startScreen");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let opened = false;
let lock = false;

/* ================= SONIDOS ================= */
const sOpen = new Audio("sounds/open.mp3");
const sClose = new Audio("sounds/close.mp3");
const sNope = new Audio("sounds/nope.mp3");

[sOpen, sClose, sNope].forEach(a => {
  a.preload = "auto";
  a.volume = 0.6;
});

function playSound(audio) {
  try {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch (_) {}
}

/* ================= VIBRACIÓN ================= */
function vibrate(pattern) {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

/* ================= DESBLOQUEAR AUDIO EN MÓVIL ================= */
function unlockAudioOnce() {
  [sOpen, sClose, sNope].forEach(a => {
    try {
      a.play().then(() => {
        a.pause();
        a.currentTime = 0;
      }).catch(() => {});
    } catch (_) {}
  });
  document.removeEventListener("touchstart", unlockAudioOnce);
  document.removeEventListener("click", unlockAudioOnce);
}
document.addEventListener("touchstart", unlockAudioOnce, { once: true });
document.addEventListener("click", unlockAudioOnce, { once: true });

/* ================= ABRIR SOBRE ================= */
envelopeBody.addEventListener("click", () => {
  if (opened || lock) return;

  opened = true;
  lock = true;
  envelopeBody.classList.add("open");

  vibrate([60, 40, 60]);
  playSound(sOpen);
  spawnHearts();

  setTimeout(() => {
    lock = false;
  }, 600);
});

/* ================= CORAZONES ================= */
function spawnHearts() {
  for (let i = 0; i < 22; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerText = "❤";
      heart.style.left = Math.random() * 250 + "px";
      heart.style.bottom = "10px";
      heartSpawner.appendChild(heart);

      setTimeout(() => heart.remove(), 2600);
    }, i * 100);
  }
}

/* ================= CERRAR SOBRE ================= */
closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();

  if (lock) return;

  envelopeBody.classList.remove("open");
  opened = false;
  lock = true;

  vibrate(40);
  playSound(sClose);

  setTimeout(() => {
    lock = false;
  }, 600);
});

/* ================= PANTALLA INICIAL (FONDO FOTO) ================= */
yesBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  document.body.classList.add("bg-photo"); // 🔥 AQUÍ SE ACTIVA LA FOTO
  vibrate([30, 30, 30]);
});

/* ================= BOTÓN NO (PC + MÓVIL) ================= */
function moveNoBtn() {
  const btnW = noBtn.offsetWidth || 120;
  const btnH = noBtn.offsetHeight || 60;
  const padding = 10;

  const x = Math.random() * (window.innerWidth - btnW - padding * 2) + padding;
  const y = Math.random() * (window.innerHeight - btnH - padding * 2) + padding;

  noBtn.style.position = "fixed";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

// PC
noBtn.addEventListener("mouseenter", moveNoBtn);

// MÓVIL
noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    vibrate(20);
    playSound(sNope);
    moveNoBtn();
  },
  { passive: false }
);

// Por si alguien lo clica
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  vibrate(20);
  playSound(sNope);
  moveNoBtn();
});
