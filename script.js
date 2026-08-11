const projects = [
  {title:"Outpost HUD", category:"HUD", filter:"hud", type:"Survival RPG", image:"assets/work/outpost-hud.svg", role:"UI Designer / Scripter", tools:"Figma · Roblox Studio", description:"A survival-focused HUD concept built around a dark, damaged-outpost atmosphere with clear health, stamina, quest, and status information."},
  {title:"Quest Interface", category:"QUESTS", filter:"quest", type:"Quest System", image:"assets/work/quest-interface.svg", role:"UI Designer", tools:"Figma", description:"A cinematic quest interface designed to make objectives, rewards, and progression easy to scan without breaking the game's atmosphere."},
  {title:"Inventory System", category:"INVENTORY", filter:"inventory", type:"Inventory", image:"assets/work/inventory.svg", role:"UI Designer / Scripter", tools:"Figma · Roblox Studio", description:"A modular inventory layout with equipment slots, item grid, rarity treatment, and a strong visual hierarchy."},
  {title:"Site Selection", category:"SCP", filter:"scp", type:"Team Selection", image:"assets/work/site-selection.svg", role:"UI Designer", tools:"Figma", description:"A dark SCP-inspired selection screen using restrained typography, system-style labels, and a high-contrast information hierarchy."},
  {title:"Dark Fantasy Menu", category:"DARK FANTASY", filter:"fantasy", type:"Main Menu", image:"assets/work/dark-fantasy.svg", role:"UI Designer", tools:"Figma", description:"A dark fantasy menu direction built around old-world framing, restrained color, and cinematic presentation."},
  {title:"Ability Bar", category:"HUD", filter:"hud", type:"Combat HUD", image:"assets/work/ability-bar.svg", role:"UI Designer / Scripter", tools:"Figma · Roblox Studio", description:"A compact ability system focused on readable cooldowns, keybinds, and fast combat scanning."},
  {title:"Shop Interface", category:"SHOP", filter:"shop", type:"Store", image:"assets/work/shop.svg", role:"UI Designer", tools:"Figma", description:"A game shop interface balancing item previews, pricing, categories, and purchase actions."},
  {title:"Pause Menu", category:"MENUS", filter:"menu", type:"Pause Menu", image:"assets/work/pause-menu.svg", role:"UI Designer", tools:"Figma", description:"A minimal pause menu with a strong visual hierarchy and simple navigation for gameplay-focused experiences."},
  {title:"Character Loadout", category:"INVENTORY", filter:"inventory", type:"Loadout", image:"assets/work/loadout.svg", role:"UI Designer", tools:"Figma", description:"A loadout screen designed for selecting equipment, abilities, and character configurations."},
  {title:"SCP Terminal", category:"SCP", filter:"scp", type:"System UI", image:"assets/work/scp-terminal.svg", role:"UI Designer", tools:"Figma · Roblox Studio", description:"A terminal-inspired interface for a tactical SCP environment, using system labels and subtle status indicators."},
  {title:"Quest Tracker", category:"QUESTS", filter:"quest", type:"HUD", image:"assets/work/quest-tracker.svg", role:"UI Designer / Scripter", tools:"Figma · Roblox Studio", description:"A lightweight quest tracker designed to stay visible during exploration without taking over the screen."},
  {title:"Settings Menu", category:"MENUS", filter:"menu", type:"Settings", image:"assets/work/settings.svg", role:"UI Designer", tools:"Figma", description:"A clean settings interface with grouped options, sliders, toggles, and a consistent component system."}
];

const grid = document.getElementById("workGrid");
const count = document.getElementById("workCount");
const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const toast = document.getElementById("toast");

function renderProjects(filter="all"){
  grid.innerHTML = "";
  const list = projects.filter(p => filter === "all" || p.filter === filter);
  count.textContent = list.length;
  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "project";
    card.innerHTML = `
      <div class="project-thumb">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <div class="project-overlay"></div>
      </div>
      <div class="project-info">
        <div><div class="project-title">${p.title}</div><div class="project-type">${p.category} · ${p.type}</div></div>
        <div class="project-arrow">↗</div>
      </div>`;
    card.addEventListener("click", () => openProject(p));
    grid.appendChild(card);
  });
}

function openProject(p){
  document.getElementById("modalCategory").textContent = p.category;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDescription").textContent = p.description;
  document.getElementById("modalRole").textContent = p.role;
  document.getElementById("modalTools").textContent = p.tools;
  document.getElementById("modalType").textContent = p.type;
  modalImage.innerHTML = `<img src="${p.image}" alt="${p.title}">`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeProject(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
document.getElementById("modalClose").addEventListener("click", closeProject);
document.getElementById("modalBackdrop").addEventListener("click", closeProject);
document.addEventListener("keydown", e => { if(e.key === "Escape") closeProject(); });

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

const sidebar = document.getElementById("sidebar");
document.getElementById("openMenu").addEventListener("click", () => sidebar.classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => sidebar.classList.remove("open"));
});

const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navLinks.forEach(n => n.classList.toggle("active", n.dataset.section === entry.target.id));
    }
  });
}, {rootMargin:"-30% 0px -55% 0px"});
sections.forEach(s => observer.observe(s));

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
document.querySelectorAll("[data-toast]").forEach(el => {
  el.addEventListener("click", e => { e.preventDefault(); showToast(el.dataset.toast); });
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("footerYear").textContent = new Date().getFullYear();
renderProjects();

document.getElementById("mobileContact").addEventListener("click", () => {
  document.getElementById("contact").scrollIntoView({behavior:"smooth"});
});
