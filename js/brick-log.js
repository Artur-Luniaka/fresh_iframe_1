// Load and render game updates
async function loadUpdates() {
  const updates = await DataLoader.loadJSON("json/updates.json");
  if (!updates) return;

  const container = document.getElementById("updates-container");
  container.innerHTML = updates
    .map(
      (update) => `
        <article class="update-card">
            <div class="update-header">
                <h3>${update.title}</h3>
                <time datetime="${update.date}">${new Date(
        update.date
      ).toLocaleDateString()}</time>
            </div>
            <div class="update-content">
                <p>${update.description}</p>
                <ul class="update-changes">
                    ${update.changes
                      .map(
                        (change) => `
                        <li>${change}</li>
                    `
                      )
                      .join("")}
                </ul>
            </div>
        </article>
    `
    )
    .join("");
}

// Load and render game news
async function loadGameNews() {
  const news = await DataLoader.loadJSON("json/dev-diaries.json");
  if (!news) return;

  const container = document.getElementById("news-container");
  container.innerHTML = news
    .map(
      (item) => `
        <article class="news-card">
            <div class="news-image-wrapper">
                <img src="${
                  item.images && item.images[0]
                    ? item.images[0].url
                    : "/images/news-placeholder.png"
                }" alt="${
        item.images && item.images[0] ? item.images[0].alt : "Game News"
      }" loading="lazy">
            </div>
            <div class="news-body">
                <h3 class="news-title">${item.title}</h3>
                <div class="news-meta">
                    <time datetime="${item.date}">${new Date(
        item.date
      ).toLocaleDateString()}</time>
                </div>
                <p class="news-description">${item.content}</p>
            </div>
        </article>
    `
    )
    .join("");
}

// Initialize all dynamic content
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([loadUpdates(), loadGameNews()]);
});
