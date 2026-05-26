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
    if (!container) return;
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
    if (!heroSection) return;
    heroSection.innerHTML = '';

    // Slides wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-wrapper';

    heroItems.forEach((item, index) => {
        const imgUrl = item.backgroundImage
            ? urlFor(item.backgroundImage).width(1920).height(1080).fit('crop').url()
            : 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1920&q=80';
        const ctaHref = item.ctaHref || getHeroCtaHref(item);

        const slide = document.createElement('div');
        slide.className = `hero-slide carousel-slide${index === 0 ? ' active' : ''}`;
        slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('${imgUrl}')`;
        slide.innerHTML = `
            <div class="container hero-content">
                <span class="badge">TerraLink Cooperative</span>
                <h1>${item.title}</h1>
                <p>${item.subtitle}</p>
                <div class="hero-buttons">
                    <a href="${ctaHref}" class="btn btn-primary">${item.ctaLabel}</a>
                    <a href="loans/loans-regular.html" class="btn btn-secondary">Learn More</a>
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
        title, subtitle, ctaLabel, ctaHref, backgroundImage
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

function getHeroCtaHref(item) {
    const label = typeof item?.ctaLabel === 'string' ? item.ctaLabel.toLowerCase() : '';
    const title = typeof item?.title === 'string' ? item.title.toLowerCase() : '';
    const subtitle = typeof item?.subtitle === 'string' ? item.subtitle.toLowerCase() : '';

    const combinedText = `${title} ${subtitle} ${label}`;

    if (combinedText.includes('coopmart')) {
        return 'coopmart.html';
    }

    if (combinedText.includes('journey') || combinedText.includes('history')) {
        return 'about/about-history.html';
    }

    if (combinedText.includes('assembly') || combinedText.includes('voice') || combinedText.includes('direction')) {
        return 'membership.html';
    }

    if (combinedText.includes('application') || combinedText.includes('apply')) {
        return 'support/support-application.html';
    }

    if (combinedText.includes('calculator') || combinedText.includes('amortization')) {
        return 'support/support-calculator.html';
    }

    if (combinedText.includes('loan')) {
        return 'loans/loans-regular.html';
    }

    if (combinedText.includes('member') || combinedText.includes('join')) {
        return 'membership.html';
    }

    if (combinedText.includes('save') || combinedText.includes('invest')) {
        return 'investments.html';
    }

    if (label.includes('read more')) {
        return 'about/about-profile.html';
    }

    return 'membership.html';
}

function getInitials(name) {
    if (typeof name !== 'string') return 'TL';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'TL';

    return parts
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}

function getDirectorAvatarLabel(containerId) {
    return containerId === 'officers-container' ? 'Corporate officer photo' : 'Director photo';
}

function renderDirectors(containerId, directors) {
    const container = document.getElementById(containerId);
    if (!container || !Array.isArray(directors) || directors.length === 0) return;

    container.innerHTML = '';

    directors.forEach((director) => {
        if (!director || !director.name) return;

        const card = document.createElement('article');
        card.className = containerId === 'officers-container' ? 'service-box' : 'highlight-card';

        const avatar = document.createElement('div');
        avatar.className = containerId === 'officers-container' ? 'service-icon director-avatar' : 'director-avatar';

        if (director.image && director.image.asset) {
            avatar.classList.add('director-avatar--image');
            avatar.style.backgroundImage = `url('${urlFor(director.image).width(320).height(320).fit('crop').url()}')`;
            avatar.setAttribute('aria-label', getDirectorAvatarLabel(containerId));
            avatar.textContent = '';
        } else {
            avatar.textContent = getInitials(director.name);
        }

        const name = document.createElement('h3');
        name.textContent = director.name;

        const role = document.createElement('p');
        role.className = 'director-role';
        role.textContent = director.role || 'Director';

        card.appendChild(avatar);
        card.appendChild(name);
        card.appendChild(role);
        container.appendChild(card);
    });
}

function renderTimelineEntries(entries) {
    const container = document.getElementById('timeline-container');
    if (!container || !Array.isArray(entries) || entries.length === 0) return;

    container.innerHTML = '';

    entries.forEach((entry) => {
        if (!entry || !entry.title) return;

        const item = document.createElement('article');
        item.className = 'timeline-entry';

        const hasImage = Boolean(entry.mainImage && entry.mainImage.asset);

        if (hasImage) {
            const imageWrap = document.createElement('div');
            imageWrap.className = 'timeline-image-wrap';

            const image = document.createElement('div');
            image.className = 'timeline-image';
            image.style.backgroundImage = `url('${urlFor(entry.mainImage).width(1200).height(675).fit('crop').url()}')`;

            imageWrap.appendChild(image);
            item.appendChild(imageWrap);
        } else {
            item.classList.add('timeline-entry--text-only');
        }

        const content = document.createElement('div');
        content.className = 'timeline-content';

        const meta = document.createElement('span');
        meta.className = 'timeline-meta';
        meta.textContent = [entry.eventDate, entry.category].filter(Boolean).join(' • ');

        const title = document.createElement('h3');
        title.textContent = entry.title;

        const description = document.createElement('p');
        description.textContent = entry.description || '';

        content.appendChild(meta);
        content.appendChild(title);
        content.appendChild(description);

        if (entry.keyMetric) {
            const metric = document.createElement('span');
            metric.className = 'timeline-metric';
            metric.textContent = entry.keyMetric;
            content.appendChild(metric);
        }

        item.appendChild(content);

        container.appendChild(item);
    });
}

async function loadDirectors() {
    const DIRECTOR_QUERY = `*[_type == "director"] | order(_createdAt asc) { name, role, image }`;

    try {
        const directors = await client.fetch(DIRECTOR_QUERY);
        renderDirectors('directors-container', directors);
        renderDirectors('officers-container', directors);
    } catch (err) {
        console.error('Failed to fetch director data:', err);
    }
}

async function loadTimeline() {
    const TIMELINE_QUERY = `*[_type == "timeline"] | order(eventDate asc) { title, eventDate, category, description, keyMetric, mainImage }`;

    try {
        const timelineEntries = await client.fetch(TIMELINE_QUERY);
        renderTimelineEntries(timelineEntries);
    } catch (err) {
        console.error('Failed to fetch timeline data:', err);
    }
}

// ============================================================
// SANITY — Site Settings 
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
// SANITY — About Us (Cooperative Live Vision Statement)
// ============================================================
async function loadCoopVision() {
    const ABOUT_QUERY = `*[_type == "aboutUs"][0]{ vision }`;
    try {
        const aboutData = await client.fetch(ABOUT_QUERY);
        
        let footerAboutEl = document.getElementById('footer-about-text');
        if (!footerAboutEl) {
            footerAboutEl = document.querySelector('.footer-about p');
        }

        if (footerAboutEl) {
            if (aboutData && typeof aboutData.vision === 'string' && aboutData.vision.trim()) {
                footerAboutEl.textContent = aboutData.vision.trim();
            } else {
                footerAboutEl.textContent = "The USC and Community Multipurpose Cooperative envision to be a sustainable open-type cooperative by ensuring effective governance and management, expanding membership, adopting relevant infrastructure, leveraging on quality linkages and offering essential services.";
            }
        }

        const companyVisionEl = document.getElementById('company-vision-text');
        if (companyVisionEl) {
            if (aboutData && typeof aboutData.vision === 'string' && aboutData.vision.trim()) {
                companyVisionEl.textContent = aboutData.vision.trim();
            } else {
                companyVisionEl.textContent = 'Loading TerraLink vision from Sanity...';
            }
        }
    } catch (err) {
        console.error("Failed to fetch Cooperative Vision statement:", err);
    }
}
// ============================================================
// INIT
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
    createModal();
    renderStaticNews();
    loadHeroCarousel();
    loadDirectors();
    loadTimeline();
    loadSiteSettings();    
    loadCoopVision(); 
});