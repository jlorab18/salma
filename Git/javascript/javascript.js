const envelopeWrapper = document.getElementById("envelope");
const envelopeBody = document.querySelector(".envelope"); // Seleccionamos el cuerpo
const heartSpawner = document.getElementById("heart-spawner");
const letter = document.querySelector(".letter");

let opened = false;
let lock = false; // Bloqueo total durante animaciones

// 1. EL CLIC SOLO EN EL CUERPO DEL SOBRE (No en el wrapper que envuelve la carta fuera)
envelopeBody.addEventListener("click", (e) => {
    if (opened || lock) return; 
    
    opened = true;
    lock = true; // Bloqueamos clics hasta que termine de abrir
    envelopeBody.classList.add("open");
    spawnHearts();

    // Después de que termine de abrir (0.6s), liberamos el bloqueo
    setTimeout(() => { lock = false; }, 600);
});

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

/* 2. BOTÓN CERRAR CON BLOQUEO DE SEGURIDAD */
const closeBtn = document.createElement("div");
closeBtn.className = "close-btn";
closeBtn.innerText = "X";
letter.appendChild(closeBtn);

closeBtn.addEventListener("click", (e) => {
    // Evitamos que el clic "atraviese" la X hacia el sobre
    e.stopPropagation(); 
    e.preventDefault();

    if (lock) return; // Si se está moviendo, no hacer nada

    envelopeBody.classList.remove("open");
    opened = false;
    lock = true; // Bloqueamos para que no se reabra accidentalmente mientras baja

    // Tiempo de espera para que la carta baje totalmente antes de dejar abrir otra vez
    setTimeout(() => {
        lock = false;
    }, 600); 
});

/* 3. LÓGICA DE BOTONES (PANTALLA INICIO) */
const startScreen = document.getElementById("startScreen");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

yesBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
});

noBtn.addEventListener("mouseenter", () => {
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 60);
    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
});