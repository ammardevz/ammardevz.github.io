// Dynamic project list from GitHub
async function loadProjects() {
    const out = document.getElementById("term-output");
    try {
        const res = await fetch(
            "https://api.github.com/users/ammardevz/repos?sort=updated&per_page=10",
        );
        if (!res.ok) throw new Error("bad response");
        const repos = await res.json();
        const visible = repos.filter((r) => !r.fork).slice(0, 6);
        if (!visible.length) throw new Error("empty");

        out.innerHTML = visible
            .map(
                (r, i) => `
            <a class="repo-row" href="${r.html_url}" target="_blank" rel="noopener"
               style="animation-delay:${i * 60}ms">
                <span class="repo-name">${r.name}</span>
                <span class="repo-meta">${r.language ?? "—"} &middot; &#9733; ${r.stargazers_count}</span>
            </a>`,
            )
            .join("");
    } catch (err) {
        out.innerHTML = `<p class="terminal-muted">couldn't reach github right now —
            <a href="https://github.com/ammardevz" target="_blank" rel="noopener">view the profile directly</a>.</p>`;
    }
}
loadProjects();

// Reveal sections as they enter view
const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
).matches;

if (!reduceMotion) {
    const revealTargets = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 },
    );
    revealTargets.forEach((el) => io.observe(el));

    // Orbs drift toward the cursor slightly
    const orbA = document.querySelector(".orb-a");
    const orbB = document.querySelector(".orb-b");
    window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        orbA.style.setProperty("--mx", `${x}px`);
        orbA.style.setProperty("--my", `${y}px`);
        orbB.style.setProperty("--mx", `${-x}px`);
        orbB.style.setProperty("--my", `${-y}px`);
    });
} else {
    document
        .querySelectorAll("[data-reveal]")
        .forEach((el) => el.classList.add("is-visible"));
}
