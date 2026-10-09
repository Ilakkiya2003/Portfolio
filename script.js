// ===== Edit this object to make the portfolio yours =====
const profile = {
  name: "Ilakkiya P",
  roles: ["Apex Developer", "Oracle APEX specialist", "SQL and JavaScript developer"],
  intro: "I build data-driven web applications with Oracle APEX, SQL and JavaScript.",
  bio: [
    "I'm an Apex Developer who builds low-code web applications on Oracle APEX, backed by clean SQL and custom JavaScript. I enjoy turning business requirements into simple, reliable apps.",
    "My goal is to grow into a senior Oracle APEX developer who designs complete, scalable solutions for real users."
  ],
  facts: { Location: "Chennai, India", Education: "BE. Computer Science Engineering", Interests: "Oracle APEX, databases, web design", "Career goal": "Senior Oracle APEX Developer" },
  yearsExperience: 1,
  skills: [
    { name: "Oracle APEX", level: 90 }, { name: "SQL", level: 85 }, { name: "JavaScript", level: 75 },
    { name: "HTML", level: 90 }, { name: "CSS", level: 80 }
  ],
  projects: [
    { title: "Employee Management App", desc: "An Oracle APEX app to add, search and report on employee records.", tech: ["Oracle APEX", "SQL"], link: "#" },
    { title: "Sales Dashboard", desc: "Interactive charts and reports built from SQL queries.", tech: ["Oracle APEX", "SQL", "JavaScript"], link: "#" },
    { title: "Personal Portfolio", desc: "This responsive portfolio website with light and dark themes.", tech: ["HTML", "CSS", "JavaScript"], link: "#" }
  ],
  experience: [
    { role: "Apex Developer", company: "Your Company ", period: "2025 – Present", points: ["Built and maintained Oracle APEX applications for business teams.", "Wrote SQL queries and PL/SQL for reports, forms and validations."] }
  ],
  contact: [
    { label: "Email", value: "your.email@example.com", href: "mailto:your.email@example.com" },
    { label: "GitHub", value: "github.com/your-username", href: "#" },
    { label: "LinkedIn", value: "linkedin.com/in/your-profile", href: "#" }
  ]
};
const sections = ["home","about","skills","projects","experience","contact"];
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function render(){
  const initials = profile.name.split(" ").map(w => w[0]).join("").slice(0,2);
  $("mark").textContent = initials;
  $("logoName").textContent = profile.name;
  $("hello").textContent = "Hi, I'm " + profile.name;
  $("intro").textContent = profile.intro;
  // To use your own photo: $("avatar").src = "animated_girl.jpg"

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0e7c86"/><stop offset="1" stop-color="#14b8a6"/></linearGradient></defs><rect width="340" height="340" fill="url(#g)"/><circle cx="170" cy="135" r="58" fill="rgba(255,255,255,.88)"/><path d="M52 340c0-78 54-120 118-120s118 42 118 120z" fill="rgba(255,255,255,.88)"/></svg>`;
$("avatar").src = "animated_girl.jpg";  
$("links").innerHTML = sections.map(s => `<li><a href="#${s}" data-s="${s}">${s[0].toUpperCase()+s.slice(1)}</a></li>`).join("");
  const techCount = new Set(profile.projects.flatMap(p => p.tech)).size;
  $("stats").innerHTML = [[profile.yearsExperience + "+","Year of experience"],[profile.projects.length,"Projects built"],[techCount,"Technologies"]].map(([n,l]) => `<div class="stat"><b>${n}</b><span>${l}</span></div>`).join("");
  $("bio").innerHTML = profile.bio.map(p => `<p>${esc(p)}</p>`).join("");
  $("facts").innerHTML = Object.entries(profile.facts).map(([k,v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
  $("skillList").innerHTML = profile.skills.map(s => `<div class="skill"><div class="ring" role="img" aria-label="${esc(s.name)}: ${s.level}%" data-v="${s.level}"><span>0%</span></div><b>${esc(s.name)}</b></div>`).join("");
  $("expList").innerHTML = profile.experience.map(e => `<li class="job"><div class="job-head"><div><h3>${esc(e.role)}</h3><div class="co">${esc(e.company)}</div></div><span class="when">${esc(e.period)}</span></div><ul>${e.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul></li>`).join("");
  $("contactList").innerHTML = profile.contact.map(c => `<li><small>${esc(c.label)}</small><a href="${esc(c.href)}">${esc(c.value)}</a></li>`).join("");
  $("foot").textContent = `© ${new Date().getFullYear()} ${profile.name}. Built with HTML, CSS and JavaScript.`;
  const techs = ["All", ...new Set(profile.projects.flatMap(p => p.tech))];
  $("filters").innerHTML = techs.map((t,i) => `<button class="chip" aria-pressed="${i===0}" data-t="${esc(t)}">${esc(t)}</button>`).join("");
  renderProjects("All");
}
function renderProjects(f){
  const list = f === "All" ? profile.projects : profile.projects.filter(p => p.tech.includes(f));
  $("projectGrid").innerHTML = list.map(p => {
    const h = (profile.projects.indexOf(p) * 47 + 175) % 360;
    return `<article class="card"><div class="thumb" style="background:linear-gradient(135deg,hsl(${h} 65% 38%),hsl(${(h+40)%360} 70% 52%))" aria-hidden="true">${esc(p.title[0])}</div><div class="body"><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><ul class="tags">${p.tech.map(t => `<li>${esc(t)}</li>`).join("")}</ul><a href="${esc(p.link)}">View project</a></div></article>`;
  }).join("") || "<p>No projects use that technology yet.</p>";
}
$("filters").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if(!b) return;
  document.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === b));
  renderProjects(b.dataset.t);
});

// Typing effect
function typeRoles(){
  const el = $("role");
  if(matchMedia("(prefers-reduced-motion:reduce)").matches){ el.textContent = profile.roles[0]; return; }
  let r = 0, c = 0, del = false;
  (function tick(){
    const w = profile.roles[r]; c += del ? -1 : 1; el.textContent = w.slice(0,c);
    let t = del ? 40 : 90;
    if(!del && c === w.length){ del = true; t = 1400; }
    else if(del && c === 0){ del = false; r = (r+1) % profile.roles.length; t = 300; }
    setTimeout(tick, t);
  })();
}

// Theme
function applyTheme(t){
  document.documentElement.setAttribute("data-theme", t);
  $("theme").textContent = t === "dark" ? "Light mode" : "Dark mode";
}
let saved = null; try { saved = localStorage.getItem("theme"); } catch(e){}
applyTheme(saved || (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light"));
$("theme").addEventListener("click", () => {
  const n = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(n); try { localStorage.setItem("theme", n); } catch(e){}
});

// Navigation
function toggleMenu(open){ $("links").classList.toggle("open", open); $("menu").setAttribute("aria-expanded", open); }
$("menu").addEventListener("click", () => toggleMenu(!$("links").classList.contains("open")));
$("links").addEventListener("click", e => { if(e.target.closest("a")) toggleMenu(false); });
document.addEventListener("keydown", e => { if(e.key === "Escape") toggleMenu(false); });
function observe(){
  const nav = new IntersectionObserver(es => es.forEach(en => {
    if(en.isIntersecting) document.querySelectorAll("#links a").forEach(a => a.classList.toggle("active", a.dataset.s === en.target.id));
  }), { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(s => nav.observe($(s)));
  const rings = new IntersectionObserver(es => es.forEach(en => {
    if(!en.isIntersecting) return;
    rings.disconnect();
    const start = performance.now();
    (function step(now){
      const k = Math.min((now - start) / 900, 1);
      document.querySelectorAll(".ring").forEach(r => {
        const v = Math.round(r.dataset.v * k);
        r.style.setProperty("--p", v); r.firstChild.textContent = v + "%";
      });
      if(k < 1) requestAnimationFrame(step);
    })(start);
  }), { threshold: .3 });
  rings.observe($("skillList"));
}

// Contact form validation
const rules = {
  fName: { err: "eName", check: v => v.trim().length >= 2 || "Enter your name (at least 2 characters)." },
  fEmail: { err: "eEmail", check: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Enter a valid email, like name@example.com." },
  fMsg: { err: "eMsg", check: v => v.trim().length >= 10 || "Write at least 10 characters so I know how to help." }
};
function validate(id){
  const i = $(id), r = rules[id].check(i.value);
  $(rules[id].err).textContent = r === true ? "" : r;
  i.classList.toggle("invalid", r !== true); i.setAttribute("aria-invalid", r !== true);
  return r === true;
}
Object.keys(rules).forEach(id => $(id).addEventListener("blur", () => validate(id)));
$("form").addEventListener("submit", e => {
  e.preventDefault();
  const ok = Object.keys(rules).map(validate);
  if(ok.includes(false)){ $("status").textContent = "Fix the highlighted fields and send again."; document.querySelector(".invalid").focus(); return; }
  // Demo only: a real site would send this data to a server here.
  $("status").textContent = `Thanks, ${$("fName").value.trim()}. Your message is ready to send.`;
  e.target.reset();
});

render(); observe(); typeRoles();
