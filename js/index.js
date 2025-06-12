// Load and render features
async function loadFeatures() {
  const features = await DataLoader.loadJSON("/json/features.json");
  if (!features) return;

  const container = document.getElementById("features-container");
  container.innerHTML = features
    .map(
      (feature) => `
        <div class="feature-card">
            <div class="feature-icon">${feature.icon}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
    `
    )
    .join("");
}

// Load and render game guide
async function loadGameGuide() {
  const guide = await DataLoader.loadJSON("/json/game-guide.json");
  if (!guide) return;

  const container = document.getElementById("game-guide-container");
  container.innerHTML = `
    <div class="steps">
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          <h3>Controls</h3>
          <ul>
            ${guide.controls
              .map(
                (control) => `
                  <li><strong>${control.key}:</strong> ${control.action}</li>
                `
              )
              .join("")}
          </ul>
        </div>
      </div>
      <div class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          <h3>Objectives</h3>
          <ul>
            ${guide.objectives
              .map(
                (objective) => `
                  <li>${objective}</li>
                `
              )
              .join("")}
          </ul>
        </div>
      </div>
      <div class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          <h3>Pro Tips</h3>
          <ul>
            ${guide.tips
              .map(
                (tip) => `
                  <li>${tip}</li>
                `
              )
              .join("")}
          </ul>
        </div>
      </div>
    </div>
  `;
}

// Load and render reviews
async function loadReviews() {
  const reviews = await DataLoader.loadJSON("/json/reviews.json");
  if (!reviews) return;

  const container = document.getElementById("reviews-container");
  container.innerHTML = reviews
    .map(
      (review) => `
        <div class="review-card">
            <div class="review-header">
                <h3>${review.playerName}</h3>
                <div class="rating">
                    ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
                </div>
            </div>
            <p class="review-text">${review.text}</p>
        </div>
    `
    )
    .join("");
}

// Load and render level types
async function loadLevelTypes() {
  const levels = await DataLoader.loadJSON("/json/levels.json");
  if (!levels) return;

  const container = document.getElementById("levels-container");
  container.innerHTML = levels
    .map(
      (level) => `
        <div class="level-card">
            <h3>${level.name}</h3>
            <p class="level-description">${level.description}</p>
            <div class="level-difficulty">
                <span class="difficulty-label">Difficulty:</span>
                <div class="difficulty-stars">
                    ${"★".repeat(level.difficulty)}${"☆".repeat(
        5 - level.difficulty
      )}
                </div>
            </div>
            <ul class="level-features">
                ${level.features
                  .map(
                    (feature) => `
                    <li>${feature}</li>
                `
                  )
                  .join("")}
            </ul>
        </div>
    `
    )
    .join("");
}

// Load and render upgrades
async function loadUpgrades() {
  const upgrades = await DataLoader.loadJSON("/json/upgrades.json");
  if (!upgrades) return;

  const container = document.getElementById("upgrades-container");
  container.innerHTML = upgrades
    .map(
      (upgrade) => `
        <div class="upgrade-card">
            <div class="upgrade-icon">${upgrade.icon}</div>
            <h3>${upgrade.name}</h3>
            <p class="upgrade-description">${upgrade.description}</p>
            <div class="upgrade-stats">
                ${Object.entries(upgrade.stats)
                  .map(
                    ([stat, value]) => `
                    <div class="stat">
                        <span class="stat-name">${stat}:</span>
                        <span class="stat-value">${value}</span>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    `
    )
    .join("");
}

// Initialize all dynamic content
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    loadFeatures(),
    loadGameGuide(),
    loadReviews(),
    loadLevelTypes(),
    loadUpgrades(),
  ]);
});

// Cookie Bar logic
function showCookieBar() {
  const bar = document.getElementById("cookie-bar");
  if (!bar) return;
  if (localStorage.getItem("cookieConsent") === "accepted") return;
  bar.style.display = "flex";
  const btn = document.getElementById("cookie-accept-btn");
  if (btn) {
    btn.onclick = function () {
      localStorage.setItem("cookieConsent", "accepted");
      bar.style.display = "none";
    };
  }
}

document.addEventListener("DOMContentLoaded", showCookieBar);
