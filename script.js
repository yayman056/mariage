
/* =====================================
   1. ANIMATIONS AU DÉFILEMENT
===================================== */
// Empêcher le navigateur de restaurer l'ancienne position après actualisation
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Forcer le retour en haut au chargement
window.scrollTo(0, 0);

window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver((entries, obs) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");
        obs.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => {
    observer.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add("visible");
  });

}


/* =====================================
   2. COMPTE À REBOURS
===================================== */

// Date du mariage : 23 avril 2027 à 15h00
// L'heure est interprétée dans le fuseau local du navigateur.

const weddingDate = new Date(2027, 3, 23, 15, 0, 0).getTime();

const countdownMessage = document.getElementById("countdownMessage");

function updateCountdown() {

  const now = Date.now();
  const difference = weddingDate - now;

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (difference <= 0) {

    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    countdownMessage.textContent =
      "Le grand jour est arrivé. Tous nos vœux de bonheur !";

    return;

  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  daysElement.textContent = days;

  hoursElement.textContent =
    String(hours).padStart(2, "0");

  minutesElement.textContent =
    String(minutes).padStart(2, "0");

  secondsElement.textContent =
    String(seconds).padStart(2, "0");

  countdownMessage.textContent = "";

}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================
   3. MUSIQUE
===================================== */

const music = document.getElementById("music");

const musicButton = document.getElementById("musicButton");

musicButton.addEventListener("click", async () => {

  try {

    if (music.paused) {

      await music.play();

      musicButton.classList.add("playing");

      musicButton.setAttribute(
        "aria-label",
        "Couper la musique"
      );

    } else {

      music.pause();

      musicButton.classList.remove("playing");

      musicButton.setAttribute(
        "aria-label",
        "Activer la musique"
      );

    }

  } catch (error) {

    console.error(
      "Impossible de lancer la musique :",
      error
    );

  }

});


/* =====================================
   4. OUVERTURE DE L'ENVELOPPE
===================================== */

const openButton = document.getElementById("openInvitation");

const envelope = document.getElementById("envelope");

const openingScreen = document.getElementById("opening-screen");

document.body.style.overflow = "hidden";


/* =====================================
   5. EXPLOSION DE COEURS
===================================== */

function createHeartExplosion() {

  const colors = [
    "#b89b6e",
    "#ceb98e",
    "#e8ddcb",
    "#ffffff",
    "#d8bfa0",
    "#f2e5d2"
  ];

  const numberOfHearts = 65;

  for (let i = 0; i < numberOfHearts; i++) {

    const heart = document.createElement("span");

    heart.classList.add("heart-particle");

    heart.textContent = "♥";

    // Direction aléatoire de chaque cœur

    const angle = Math.random() * Math.PI * 2;

    const distance = 130 + Math.random() * 300;

    const x = Math.cos(angle) * distance;

    const y = Math.sin(angle) * distance;

    heart.style.setProperty(
      "--move-x",
      `${x}px`
    );

    heart.style.setProperty(
      "--move-y",
      `${y}px`
    );

    // Couleur

    heart.style.setProperty(
      "--heart-color",
      colors[Math.floor(Math.random() * colors.length)]
    );

    // Taille

    heart.style.setProperty(
      "--heart-size",
      `${12 + Math.random() * 25}px`
    );

    // Durée de l'animation

    heart.style.setProperty(
      "--duration",
      `${1.5 + Math.random() * 0.7}s`
    );

    // Décalage de départ

    heart.style.setProperty(
      "--delay",
      `${Math.random() * 0.3}s`
    );

    // Rotation

    heart.style.setProperty(
      "--rotation",
      `${Math.random() * 360 - 180}deg`
    );

    openingScreen.appendChild(heart);

    // Nettoyage après animation

    heart.addEventListener("animationend", () => {

      heart.remove();

    }, { once: true });

  }

}



/* =====================================
   6. SÉQUENCE COMPLÈTE D'OUVERTURE
===================================== */

openButton.addEventListener("click", async () => {

  if (openButton.disabled) return;

  openButton.disabled = true;
  openButton.textContent = "BIENVENUE...";

  // ÉTAPE 1 : ouverture de l'enveloppe
  envelope.classList.add("open");

  // ÉTAPE 2 : lancement de la musique
  try {
    await music.play();
    musicButton.classList.add("playing");
    musicButton.setAttribute(
      "aria-label",
      "Couper la musique"
    );
  } catch (error) {
    console.error("Impossible de lancer la musique :", error);
  }

  // ÉTAPE 3 : explosion de cœurs
  setTimeout(() => {
    createHeartExplosion();
    envelope.classList.add("exploding");
  }, 850);

  // ÉTAPE 4 : disparition de l'écran
  setTimeout(() => {
    openingScreen.classList.add("leaving");
  }, 3700);

  // ÉTAPE 5 : accès au site
  setTimeout(() => {
    openingScreen.remove();
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
  }, 4750);

});
