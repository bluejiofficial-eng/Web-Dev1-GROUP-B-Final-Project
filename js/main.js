// ============================================================
// TerraLink Cooperative — main.js
// Handles: Hero Carousel + News Modal + Static news cards + Site Settings
// ============================================================

const SANITY_CONFIG = {
    projectId: "ltk0qh4a",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: true,
};

const { createClient } = globalThis.SanityClient;
const client = createClient(SANITY_CONFIG);
const builder = globalThis.SanityImageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

// ============================================================
// NEWS DATA (Static — 6 articles)
// ============================================================
const STATIC_NEWS = [
    {
        tag: "Announcement",
        title: "Annual General Assembly 2026",
        body: "Join us this coming month for our democratic voting session, financial transparency review, and new policy ratification updates. All members are encouraged to attend and participate in the decision-making process that shapes our cooperative's future.",
        date: "May 22, 2026",
        img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "CoopMart",
        title: "New Organic Supply in CoopMart",
        body: "We are expanding our local farm supply chains! Enjoy fresh, direct-from-farm organic goods at all storefront branches starting this weekend. Products include seasonal vegetables, root crops, and certified organic rice from our partner farms.",
        date: "May 18, 2026",
        img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "Financial",
        title: "Interest Rate Adjustment Notification",
        body: "In alignment with standard central banking indicators, we have optimized our investment dividend payouts to offer stable returns. Members with active time deposits will receive updated passbooks at the nearest branch within the month.",
        date: "May 10, 2026",
        img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "Membership",
        title: "New Member Onboarding — Batch 2026",
        body: "We are now accepting new member applications for the second batch of 2026. Applicants must submit valid government-issued ID, two 2x2 photos, and a duly accomplished membership form. Processing time is 3–5 business days.",
        date: "May 5, 2026",
        img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "Loans",
        title: "Special Loan Program for Calamity Victims",
        body: "TerraLink Cooperative is extending a zero-interest emergency loan program for members affected by recent calamities. Eligible members may apply for up to ₱20,000 with a 12-month repayment period. Applications are open until June 30, 2026.",
        date: "April 28, 2026",
        img: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "Community",
        title: "TerraLink Eco-Drive: Tree Planting Event",
        body: "As part of our commitment to sustainable community growth, TerraLink Cooperative will be hosting a tree planting event this June. Members, officers, and volunteers are welcome to join. Registration is free and open to all member families.",
        date: "April 15, 2026",
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80"
    }
];

// ============================================================
// MODAL
// ============================================================
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'news-modal';
    modal.innerHTML = `
        <div class="modal-overlay" id="modal-overlay">
            <div class="modal-box">
                <button class="modal-close" id="modal-close">&times;</button>
                <div class="modal-img" id="modal-img"></div>
                <div class="modal-body">
                    <span class="news-tag" id="modal-tag"></span>
                    <h3 id="modal-title"></h3>
                    <p id="modal-body-text"></p>
                    <span class="news-date" id="modal-date"></span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('modal-overlay')) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(article) {
    document.getElementById('modal-img').style.backgroundImage = `url('${article.img}')`;
    document.getElementById('modal-tag').textContent  = article.tag;
    document.getElementById('modal-title').textContent = article.title;
    document.getElementById('modal-body-text').textContent = article.body;
    document.getElementById('modal-date').textContent  = article.date;
    document.getElementById('modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================================
// RENDER — Static 6 news cards
// ============================================================
function renderStaticNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = '';
    STATIC_NEWS.forEach((article) => {
        const card = document.createElement('article');
        card.className = 'news-card';
        card.innerHTML = `
            <div class="news-img" style="background-image: url('${article.img}');"></div>
            <div class="news-body">
                <span class="news-tag">${article.tag}</span>
                <h4>${article.title}</h4>
                <p>${article.body}</p>
                <span class="news-date">${article.date}</span>
            </div>
        `;
        card.addEventListener('click', () => openModal(article));
        container.appendChild(card);
    });
}

// ============================================================
// SANITY — Hero Carousel (all 4 hero slides)
// ============================================================
let currentSlide = 0;
let slides = [];
let carouselTimer = null;

function buildCarousel(heroItems) {
    const heroSection = document.getElementById('hero-container');
    heroSection.innerHTML = '';

    // Slides wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-wrapper';

    heroItems.forEach((item, index) => {
        const imgUrl = item.backgroundImage
            ? urlFor(item.backgroundImage).width(1920).height(1080).fit('crop').url()
            : 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1920&q=80';

        const slide = document.createElement('div');
        slide.className = `hero-slide carousel-slide${index === 0 ? ' active' : ''}`;
        slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('${imgUrl}')`;
        slide.innerHTML = `
            <div class="container hero-content">
                <span class="badge">TerraLink Cooperative</span>
                <h1>${item.title}</h1>
                <p>${item.subtitle}</p>
                <div class="hero-buttons">
                    <a href="membership.html" class="btn btn-primary">${item.ctaLabel}</a>
                    <a href="loans-regular.html" class="btn btn-secondary">Learn More</a>
                </div>
            </div>
        `;
        wrapper.appendChild(slide);
        slides.push(slide);
    });

    // Prev / Next buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn carousel-prev';
    prevBtn.innerHTML = '&#8592;';
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));

    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn carousel-next';
    nextBtn.innerHTML = '&#8594;';
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Dot indicators
    const dots = document.createElement('div');
    dots.className = 'carousel-dots';
    heroItems.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot${i === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dots.appendChild(dot);
    });

    heroSection.appendChild(wrapper);
    heroSection.appendChild(prevBtn);
    heroSection.appendChild(nextBtn);
    heroSection.appendChild(dots);

    // Auto-play every 5s
    carouselTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function goToSlide(index) {
    const total = slides.length;
    currentSlide = (index + total) % total;

    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));

    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));

    // Reset timer on manual navigation
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

async function loadHeroCarousel() {
    const HERO_QUERY = `*[_type == "hero"] | order(_createdAt asc) {
        title, subtitle, ctaLabel, backgroundImage
    }`;

    try {
        const heroItems = await client.fetch(HERO_QUERY);
        if (heroItems && heroItems.length > 0) {
            buildCarousel(heroItems);
        }
    } catch (err) {
        console.error("Failed to fetch Hero data:", err);
    }
}

// ============================================================
// SANITY — Site Settings (footer 주소/이메일)
// ============================================================
async function loadSiteSettings() {
    const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{ address, emails }`;
    try {
        const settings = await client.fetch(SETTINGS_QUERY);
        if (settings) {
            const addressEl = document.getElementById('footer-address');
            const emailEl   = document.getElementById('footer-email');
            if (addressEl && settings.address)
                addressEl.textContent = `📍 ${settings.address}`;
            if (emailEl && settings.emails && settings.emails.length > 0)
                emailEl.textContent = `📧 ${settings.emails[0]}`;
        }
    } catch (err) {
        console.error("Failed to fetch Site Settings:", err);
    }
}

// ============================================================
// INIT
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
    createModal();
    renderStaticNews();
    loadHeroCarousel();
    loadSiteSettings();
});