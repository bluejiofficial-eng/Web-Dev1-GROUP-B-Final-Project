// ============================================================
// TerraLink — Shared About Us page animations
// ============================================================

let aboutRevealObserver = null;
let aboutAnimationsReady = false;

function observeAboutRevealElements() {
    if (!aboutRevealObserver) return;

    document.querySelectorAll('.about-reveal:not([data-reveal-watched])').forEach((el) => {
        el.dataset.revealWatched = '1';
        const stagger = el.closest('[data-reveal-stagger]');
        if (stagger) {
            const siblings = [...stagger.querySelectorAll('.about-reveal')];
            const idx = siblings.indexOf(el);
            if (idx >= 0) el.style.transitionDelay = `${idx * 0.08}s`;
        }
        aboutRevealObserver.observe(el);
    });
}

function initAboutScrollReveal() {
    aboutRevealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                aboutRevealObserver.unobserve(entry.target);
            });
        },
        { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.12 }
    );

    observeAboutRevealElements();

    const mutationObserver = new MutationObserver(() => {
        observeAboutRevealElements();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
}

function animateCountEl(el) {
    const target = Number(el.dataset.count);
    if (Number.isNaN(target)) return;

    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function initAboutStatCounters() {
    const stats = document.querySelectorAll('[data-count]:not([data-count-watched])');
    if (!stats.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.dataset.countWatched = '1';
                animateCountEl(entry.target);
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.4 }
    );

    stats.forEach((el) => observer.observe(el));
}

window.initAboutPageAnimations = function initAboutPageAnimations() {
    if (!document.body.classList.contains('about-page')) return;

    if (!aboutAnimationsReady) {
        aboutAnimationsReady = true;
        initAboutScrollReveal();
        initAboutStatCounters();
        return;
    }

    observeAboutRevealElements();
    initAboutStatCounters();
};

window.addEventListener('DOMContentLoaded', () => {
    initAboutPageAnimations();
});
