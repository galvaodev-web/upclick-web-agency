const header = document.querySelector("[data-header]");
const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const toast = document.getElementById("toast");

document.body.classList.add("reveal-ready");

const setHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menu?.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!open));
  nav?.classList.toggle("open", !open);
  header?.classList.toggle("menu-open", !open);
  document.body.classList.toggle("lock", !open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu?.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
    header?.classList.remove("menu-open");
    document.body.classList.remove("lock");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    status.textContent = "Preencha corretamente os campos obrigatorios.";
    form.reportValidity();
    return;
  }

  status.textContent = "";

  const data = Object.fromEntries(new FormData(form).entries());
  const message = [
    "Ola! Quero conversar sobre um projeto com a SYNQORA.",
    "",
    `Nome: ${data.nome}`,
    `Empresa: ${data.empresa || "-"}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.telefone || "-"}`,
    `Tipo de projeto: ${data.tipo}`,
    "",
    `Mensagem: ${data.mensagem}`,
  ].join("\n");

  window.open(
    `https://wa.me/5561995289436?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener",
  );

  toast.textContent = "WhatsApp aberto com o briefing pronto para envio.";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3600);
});
