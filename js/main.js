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

// Safely initialize Sanity Client to prevent crashes if CDN is blocked or offline
let mainSanityClient = null;
let builder = null;

if (typeof globalThis.SanityClient !== 'undefined') {
    mainSanityClient = globalThis.SanityClient.createClient(SANITY_CONFIG);
    if (typeof globalThis.SanityImageUrlBuilder !== 'undefined') {
        builder = globalThis.SanityImageUrlBuilder(mainSanityClient);
    }
}

const urlFor = (source) => (builder ? builder.image(source) : null);

// ============================================================
// NEWS DATA (Static — 6 articles)
// ============================================================
const STATIC_NEWS = [
    {
        tag: "Financial",
        title: "Q2 Financial Performance Report",
        body: "Our Q2 financial results show a 15% increase in total assets, driven by strong member deposits and successful loan deployments. View the full report online.",
        date: "June 10, 2026",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "Loans",
        title: "New Solar Loan Initiative",
        body: "To support sustainable living, TerraLink introduces the Solar Home Loan. Enjoy special low rates for installing solar panels in your residence.",
        date: "June 5, 2026",
        img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "CoopMart",
        title: "CoopMart Local Artisan Fair",
        body: "Join us this weekend as CoopMart hosts a local artisan fair. Support community makers and discover unique handcrafted products.",
        date: "June 1, 2026",
        img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "Community",
        title: "Youth Financial Literacy Workshop",
        body: "Empowering the next generation! Enroll your children in our upcoming free financial literacy workshop designed for teens and young adults.",
        date: "May 30, 2026",
        img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "Membership",
        title: "Expanded Health Insurance Options",
        body: "We have partnered with leading healthcare providers to offer exclusive health insurance packages at discounted rates for all regular members.",
        date: "May 25, 2026",
        img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80"
    },
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
        tag: "Announcement",
        title: "Digital Banking App Update",
        body: "Our mobile app just got better! The latest update includes instant fund transfers, a unified dashboard, and enhanced security features.",
        date: "May 15, 2026",
        img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "Community",
        title: "Agricultural Support Grant",
        body: "TerraLink has allocated a special grant to assist local partner farmers in upgrading their irrigation systems ahead of the dry season.",
        date: "May 12, 2026",
        img: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1b?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "Financial",
        title: "Interest Rate Adjustment Notification",
        body: "In alignment with standard central banking indicators, we have optimized our investment dividend payouts to offer stable returns. Members with active time deposits will receive updated passbooks at the nearest branch within the month.",
        date: "May 10, 2026",
        img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "Financial",
        title: "Investment Dividend Distribution",
        body: "Good news for our investors! The semi-annual dividend distribution for Growth Investment Plans has been processed and credited to member accounts.",
        date: "May 8, 2026",
        img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "Membership",
        title: "New Member Onboarding — Batch 2026",
        body: "We are now accepting new member applications for the second batch of 2026. Applicants must submit valid government-issued ID, two 2x2 photos, and a duly accomplished membership form. Processing time is 3–5 business days.",
        date: "May 5, 2026",
        img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "CoopMart",
        title: "CoopMart Zero-Waste Campaign",
        body: "As part of our eco-drive, CoopMart is implementing a bring-your-own-bag policy. Members using reusable bags will receive bonus loyalty points.",
        date: "May 2, 2026",
        img: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "Loans",
        title: "Special Loan Program for Calamity Victims",
        body: "TerraLink Cooperative is extending a zero-interest emergency loan program for members affected by recent calamities. Eligible members may apply for up to ₱20,000 with a 12-month repayment period. Applications are open until June 30, 2026.",
        date: "April 28, 2026",
        img: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=600&q=80"
    },
    {
        tag: "Announcement",
        title: "Member Townhall Meeting Schedule",
        body: "Have your voice heard. We are scheduling virtual townhall meetings next month to discuss upcoming cooperative policies and new product developments.",
        date: "April 20, 2026",
        img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80"
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
// MODAL (Removed in favor of redirecting to news.html)
// ============================================================

// ============================================================
// RENDER — Static news cards with Search & Sort
// ============================================================
let currentNewsPage = 1;
const NEWS_PER_PAGE = 6;

function renderStaticNews(searchTerm = '', sortBy = 'date-desc', page = 1) {
    const container = document.getElementById('news-container');
    if (!container) return;
    container.innerHTML = '';

    // URL 경로 체크 대신, 해당 요소 유무로 메인 페이지 판별 (로컬/서버 오류 원천 차단)
    const paginationContainer = document.getElementById('news-pagination');
    const isHomePage = !paginationContainer;

    // Map to keep original IDs for article.html redirection
    let filteredNews = STATIC_NEWS.map((article, index) => ({ ...article, originalIndex: index }));

    // 검색 필터 적용
    if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        filteredNews = filteredNews.filter(article => 
            article.title.toLowerCase().includes(lowerTerm) || 
            article.body.toLowerCase().includes(lowerTerm) ||
            article.tag.toLowerCase().includes(lowerTerm)
        );
    }

    // 메인 페이지(index.html)도 항상 최신순 정렬을 적용하기 위해 조건문 밖으로 이동
    filteredNews.sort((a, b) => {
        if (sortBy === 'date-desc') {
            return new Date(b.date) - new Date(a.date);
        } else if (sortBy === 'date-asc') {
            return new Date(a.date) - new Date(b.date);
        } else if (sortBy === 'title-asc') {
            return a.title.localeCompare(b.title);
        } else if (sortBy === 'title-desc') {
            return b.title.localeCompare(a.title);
        }
        return 0;
    });

    if (filteredNews.length === 0) {
        container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: #666; padding: 40px;">No news articles found matching your search.</div>';
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    let paginatedNews = [];
    let totalPages = 1;

    if (isHomePage) {
        // 메인 페이지: 전체 뉴스 중 정렬된 최신 3개만 잘라서 표시
        paginatedNews = filteredNews.slice(0, 3);
    } else {
        // 뉴스 전체 페이지: 페이지네이션 적용
        totalPages = Math.ceil(filteredNews.length / NEWS_PER_PAGE);
        if (page > totalPages) page = totalPages;
        if (page < 1) page = 1;
        currentNewsPage = page;

        const startIndex = (currentNewsPage - 1) * NEWS_PER_PAGE;
        const endIndex = startIndex + NEWS_PER_PAGE;
        paginatedNews = filteredNews.slice(startIndex, endIndex);
    }

    paginatedNews.forEach((article) => {
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
        card.addEventListener('click', () => {
            window.location.href = `article.html?id=${article.originalIndex}`;
        });
        container.appendChild(card);
    });

    // Render Pagination Controls
    if (!isHomePage && paginationContainer) {
        paginationContainer.innerHTML = '';
        if (totalPages > 1) {
            // Previous Button
            const prevBtn = document.createElement('button');
            prevBtn.className = 'btn btn-secondary';
            prevBtn.textContent = 'Prev';
            prevBtn.style.padding = '8px 16px';
            prevBtn.disabled = currentNewsPage === 1;
            if (!prevBtn.disabled) {
                prevBtn.addEventListener('click', () => renderStaticNews(searchTerm, sortBy, currentNewsPage - 1));
            } else {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.cursor = 'not-allowed';
            }
            paginationContainer.appendChild(prevBtn);

            // Page Numbers
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.className = `btn ${i === currentNewsPage ? 'btn-primary' : 'btn-secondary'}`;
                btn.textContent = i;
                btn.style.padding = '8px 16px';
                btn.style.minWidth = '40px';
                btn.addEventListener('click', () => {
                    renderStaticNews(searchTerm, sortBy, i);
                    document.querySelector('.news-controls').scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
                paginationContainer.appendChild(btn);
            }

            // Next Button
            const nextBtn = document.createElement('button');
            nextBtn.className = 'btn btn-secondary';
            nextBtn.textContent = 'Next';
            nextBtn.style.padding = '8px 16px';
            nextBtn.disabled = currentNewsPage === totalPages;
            if (!nextBtn.disabled) {
                nextBtn.addEventListener('click', () => renderStaticNews(searchTerm, sortBy, currentNewsPage + 1));
            } else {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.cursor = 'not-allowed';
            }
            paginationContainer.appendChild(nextBtn);
        }
    }
}

// ============================================================
// RENDER — News Detail Page (article.html)
// ============================================================
function renderNewsDetail() {
    const detailContainer = document.getElementById('news-detail-container');
    if (!detailContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id !== null && STATIC_NEWS[id]) {
        const currentIndex = parseInt(id, 10);
        const article = STATIC_NEWS[currentIndex];
        const hasPrev = currentIndex > 0;
        const hasNext = currentIndex < STATIC_NEWS.length - 1;

        detailContainer.innerHTML = `
            <div class="news-detail-header" style="max-width: 800px; margin: 0 auto 30px; text-align: center;">
                <span class="news-tag" style="margin-bottom: 15px; font-size: 0.9rem; padding: 6px 14px;">${article.tag}</span>
                <h1 style="margin-bottom: 15px; font-size: 2.5rem; color: #1b3d22;">${article.title}</h1>
                <span class="news-date" style="color: #666; font-size: 1rem;">${article.date}</span>
            </div>
            <div class="news-detail-img" style="width: 100%; max-width: 900px; margin: 0 auto 40px; height: 450px; background-image: url('${article.img}'); background-size: cover; background-position: center; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);"></div>
            <div class="news-detail-body" style="max-width: 800px; margin: 0 auto; font-size: 1.15rem; line-height: 1.8; color: #444; text-align: justify;">
                <p>${article.body}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 50px; padding-top: 30px; border-top: 1px solid #eaeaea;">
                    ${hasPrev ? '<a href="article.html?id=' + (currentIndex - 1) + '" class="btn btn-secondary">&larr; Previous</a>' : '<div style="width: 110px;"></div>'}
                    <a href="news.html" class="btn btn-primary">View All News</a>
                    ${hasNext ? '<a href="article.html?id=' + (currentIndex + 1) + '" class="btn btn-secondary">Next &rarr;</a>' : '<div style="width: 110px;"></div>'}
                </div>
            </div>
        `;
    } else {
        detailContainer.innerHTML = `
            <div style="text-align: center; padding: 50px 0;">
                <h2 style="margin-bottom: 20px; color: #1b3d22;">News article not found.</h2>
                <a href="news.html" class="btn btn-primary">Back to News</a>
            </div>
        `;
    }
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
    if (!mainSanityClient) return;
    const HERO_QUERY = `*[_type == "hero"] | order(_createdAt asc) {
        title, subtitle, ctaLabel, ctaHref, backgroundImage
    }`;

    try {
        const heroItems = await mainSanityClient.fetch(HERO_QUERY);
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

//index.html에 들어가 있지 않은 기능

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
    if (!mainSanityClient) return;
    const DIRECTOR_QUERY = `*[_type == "director"] | order(_createdAt asc) { name, role, image }`;

    try {
        const directors = await mainSanityClient.fetch(DIRECTOR_QUERY);
        renderDirectors('directors-container', directors);
        renderDirectors('officers-container', directors);
    } catch (err) {
        console.error('Failed to fetch director data:', err);
    }
}

async function loadTimeline() {
    if (!mainSanityClient) return;
    const TIMELINE_QUERY = `*[_type == "timeline"] | order(eventDate asc) { title, eventDate, category, description, keyMetric, mainImage }`;

    try {
        const timelineEntries = await mainSanityClient.fetch(TIMELINE_QUERY);
        renderTimelineEntries(timelineEntries);
    } catch (err) {
        console.error('Failed to fetch timeline data:', err);
    }
}





// ============================================================
// SANITY — Site Settings 
// ============================================================
async function loadSiteSettings() {
    if (!mainSanityClient) return;
 
    const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{ address, emails }`;
 
    try {
        const settings = await mainSanityClient.fetch(SETTINGS_QUERY);
        
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
    let aboutData = null;
    if (mainSanityClient) {
        try {
            aboutData = await mainSanityClient.fetch(`*[_type == "aboutUs"][0]{ vision }`);
        } catch (err) {
            console.error("Failed to fetch Cooperative Vision statement:", err);
        }
    }
    
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

        // index.html 파일과 관계 없음
        const companyVisionEl = document.getElementById('company-vision-text');
        if (companyVisionEl) {
            if (aboutData && typeof aboutData.vision === 'string' && aboutData.vision.trim()) {
                companyVisionEl.textContent = aboutData.vision.trim();
            } else {
                companyVisionEl.textContent = 'Loading TerraLink vision from Sanity...';
            }
        }
}
// ============================================================
// INIT
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
    // Search & Sort Elements for news.html
    const searchInput = document.getElementById('news-search');
    const sortSelect = document.getElementById('news-sort');

    if (searchInput && sortSelect) {
        // news.html: 현재 드롭다운 세팅(기본 최신순)에 맞춰 초기 렌더링 적용
        renderStaticNews(searchInput.value, sortSelect.value, 1);
        
        const updateNews = () => renderStaticNews(searchInput.value, sortSelect.value, 1);
        searchInput.addEventListener('input', updateNews);
        sortSelect.addEventListener('change', updateNews);
    } else {
        // index.html: 무조건 가장 최신순(date-desc)으로 렌더링하여 최신 뉴스 3개 보장
        renderStaticNews('', 'date-desc', 1);
    }

    renderNewsDetail();
    loadHeroCarousel();
    loadDirectors();
    loadTimeline();
    loadSiteSettings();    
    loadCoopVision(); 
});