// Navigation for the complete human review document; no product controllers.
const input = document.getElementById("component-search");
const entries = [...document.querySelectorAll("[data-index]")];
const cards = [...document.querySelectorAll("[data-family]")];
const status = document.getElementById("search-status");
const normalize = (value) =>
  value
    .toLocaleLowerCase("pl")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l");
function filterComponents() {
  const query = normalize(input.value.trim());
  let count = 0;
  for (const entry of entries) {
    const match = normalize(entry.textContent).includes(query);
    entry.hidden = !match;
    const card = cards.find((item) => item.dataset.family === entry.dataset.index);
    if (card) card.hidden = !match;
    if (match) count += 1;
  }
  status.textContent = query
    ? `Wyniki: ${count} z ${entries.length} rodzin`
    : `${entries.length} rodzin`;
}
input.addEventListener("input", filterComponents);
document.addEventListener("click", (event) => {
  const anchor = event.target.closest("a[href^='#']");
  if (!anchor) return;
  const target = document.getElementById(anchor.getAttribute("href").slice(1));
  if (target?.closest("[data-family]")?.hidden) {
    input.value = "";
    filterComponents();
  }
});
