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
        tags: ["Financial", "Report", "Q2", "Performance"],
        title: "Q2 Financial Performance Report",
        body: "TerraLink closes Q2 2026 with a 15% increase in total assets, reaching a new cooperative milestone. Strong member deposit growth and strategic loan deployments across key sectors were the primary drivers. Net savings also grew by 9% compared to the same period last year. Members may access the full audited report through the online portal or request a printed copy at any branch.",
        date: "June 10, 2026",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Loans", "Solar", "Sustainability", "Green"],
        title: "New Solar Loan Initiative",
        body: "TerraLink introduces the Solar Home Loan — a dedicated financing program to help members transition to clean, renewable energy. Enjoy preferential rates starting at 4.5% per annum, with flexible repayment terms of up to 60 months. The program covers solar panel installation, inverter systems, and battery storage units. Applications are now open at all branch offices.",
        date: "June 5, 2026",
        img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["CoopMart", "Local", "Events", "Community"],
        title: "CoopMart Local Artisan Fair",
        body: "CoopMart is proud to host its first Local Artisan Fair this weekend at all major branch locations. Discover handcrafted goods from over 30 community makers — from woven baskets and pottery to natural soaps and locally roasted coffee. All purchases directly support partner micro-entrepreneurs. Entry is free for all TerraLink members and their families.",
        date: "June 1, 2026",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Community", "Education", "Youth", "Financial Literacy"],
        title: "Youth Financial Literacy Workshop",
        body: "TerraLink believes financial empowerment starts young. Our upcoming free workshop, open to teens and young adults aged 13–22, covers budgeting basics, understanding savings and interest, and responsible credit use. Sessions run every Saturday in June at the Main Branch Training Hall. Parents are encouraged to accompany younger participants. Seats are limited — register at the branch or through the app.",
        date: "May 30, 2026",
        img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Membership", "Health", "Partnership", "Insurance"],
        title: "Expanded Health Insurance Options",
        body: "Your health is our priority. TerraLink has partnered with three leading healthcare providers to offer exclusive group health insurance packages available only to regular members. Plans start at ₱350/month and include outpatient consultations, annual physical exams, and emergency hospitalization coverage. Visit any branch to compare plans and enroll. Coverage begins within 15 days of activation.",
        date: "May 25, 2026",
        img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Announcement", "Assembly", "Governance", "Voting"],
        title: "Annual General Assembly 2026",
        body: "All members are invited to TerraLink's Annual General Assembly, the cooperative's most important democratic event of the year. The assembly will include the presentation of audited financial statements, election of new board directors, ratification of amended by-laws, and open-floor discussions on proposed policy changes. Attendance is strongly encouraged, as quorum is required for binding resolutions. Date, time, and venue details will be announced via SMS and the member portal.",
        date: "May 22, 2026",
        img: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["CoopMart", "Organic", "Agriculture", "Local Produce"],
        title: "New Organic Supply in CoopMart",
        body: "Fresh, farm-to-table is now a reality at CoopMart. Starting this weekend, all storefront branches will carry a new line of certified organic produce sourced directly from TerraLink's partner farms. Available items include seasonal vegetables, native root crops, heirloom rice varieties, and free-range eggs. Prices are kept member-friendly to make healthy eating accessible to all. New stock arrives every Friday morning.",
        date: "May 18, 2026",
        img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Announcement", "Digital", "App", "Technology"],
        title: "Digital Banking App Update",
        body: "We have rolled out a major update to the TerraLink mobile app. Version 3.2 introduces instant peer-to-peer fund transfers between members, a redesigned dashboard with real-time balance and dividend tracking, biometric login support, and end-to-end encrypted messaging with our support team. The update is available now on both the App Store and Google Play. Existing users will be prompted to update automatically.",
        date: "May 15, 2026",
        img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Community", "Grant", "Farming", "Agriculture"],
        title: "Agricultural Support Grant",
        body: "As part of TerraLink's commitment to rural livelihood support, a ₱2.5 million agricultural grant has been allocated to assist partner farmers in Cebu's upland barangays ahead of the dry season. Funds will be used to upgrade drip irrigation systems, install water catchment facilities, and procure drought-resistant seed varieties. Fourteen farming households are expected to benefit from the first disbursement phase.",
        date: "May 12, 2026",
        img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Financial", "Rates", "Policy", "Time Deposit"],
        title: "Interest Rate Adjustment Notification",
        body: "In response to updated central banking benchmarks, TerraLink has adjusted its time deposit interest rates effective June 1, 2026. Regular savings accounts remain at 2.5% per annum, while 12-month time deposits have been revised to 5.0%. Members with existing time deposits will receive updated passbooks reflecting the new rates at any branch within the month. For questions, contact our financial services desk.",
        date: "May 10, 2026",
        img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Financial", "Dividends", "Investment", "Members"],
        title: "Investment Dividend Distribution",
        body: "TerraLink is pleased to announce that the semi-annual dividend distribution for all Growth Investment Plan holders has been successfully processed. Dividends have been credited directly to member accounts as of May 8, 2026. The average payout rate this period is 7.2% — reflecting the cooperative's strong financial performance. Members may verify their credited amount through the app, passbook update, or by visiting their nearest branch.",
        date: "May 8, 2026",
        img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Membership", "Onboarding", "Batch", "New Members"],
        title: "New Member Onboarding — Batch 2026",
        body: "TerraLink is now accepting applications for the second membership batch of 2026. Joining the cooperative opens access to exclusive loan products, investment plans, CoopMart benefits, and community programs. Requirements include a valid government-issued ID, two 2x2 ID photos, and a completed membership application form. A one-time membership share capital of ₱500 is required upon approval. Processing takes 3–5 business days. Visit any branch to get started.",
        date: "May 5, 2026",
        img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["CoopMart", "Eco-friendly", "Campaign", "Sustainability"],
        title: "CoopMart Zero-Waste Campaign",
        body: "CoopMart is going green — and we want you with us. Starting May 15, all CoopMart branches will implement a strict bring-your-own-bag policy as part of TerraLink's broader sustainability commitment. Members who bring reusable bags will earn 5 bonus loyalty points per transaction, redeemable for discounts on future purchases. Reusable bags are also available at the checkout counter for ₱25. Together, let's reduce plastic waste one shopping trip at a time.",
        date: "May 2, 2026",
        img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Loans", "Relief", "Calamity", "Emergency"],
        title: "Special Loan Program for Calamity Victims",
        body: "TerraLink stands with members affected by recent natural calamities. The Cooperative has launched a zero-interest emergency loan program offering up to ₱20,000 per qualified member, with a 12-month repayment period and a 3-month grace period before first payment. Required documents include proof of calamity impact, a valid ID, and accomplished application form. Applications are accepted at all branch offices until June 30, 2026. Recovery assistance officers are available on-site to assist applicants.",
        date: "April 28, 2026",
        img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Announcement", "Meeting", "Townhall", "Policy"],
        title: "Member Townhall Meeting Schedule",
        body: "Your voice matters. TerraLink will be hosting a series of virtual townhall meetings next month to gather member feedback on upcoming policy updates and new product proposals. Sessions will be facilitated by board directors and department heads. Topics include proposed changes to loan eligibility criteria, expansion of CoopMart branches, and the rollout of the new digital savings product. Meeting links and schedules will be sent via email and SMS. Members may also submit questions in advance through the app.",
        date: "April 20, 2026",
        img: "https://images.unsplash.com/photo-1591522811280-a8759970b03f?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Community", "Environment", "Volunteer", "Eco-Drive"],
        title: "TerraLink Eco-Drive: Tree Planting Event",
        body: "Join us this June as TerraLink hosts its annual Eco-Drive Tree Planting Event at partner reforestation sites in the uplands of Cebu. Over 1,000 native seedlings will be planted by volunteers from the cooperative's staff, member families, and youth groups. The event is free and open to all registered members and their dependents. Refreshments and transportation from the main branch will be provided. To sign up, fill out the volunteer form at any branch or through the TerraLink mobile app before June 5.",
        date: "April 15, 2026",
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80"
    }
];


// ============================================================
// RENDER — Static news cards with Search & Sort
// ============================================================
let currentNewsPage = 1;
const NEWS_PER_PAGE = 6;

function renderStaticNews(searchTerm = '', searchType = 'all', sortBy = 'date-desc', page = 1) {
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
        filteredNews = filteredNews.filter(article => {
            if (searchType === 'title') {
                return article.title.toLowerCase().includes(lowerTerm);
            } else if (searchType === 'body') {
                return article.body.toLowerCase().includes(lowerTerm);
            } else if (searchType === 'tag') {
                    return article.tags.some(tag => tag.toLowerCase().includes(lowerTerm));
            } else {
                return article.title.toLowerCase().includes(lowerTerm) || 
                       article.body.toLowerCase().includes(lowerTerm) ||
                           article.tags.some(tag => tag.toLowerCase().includes(lowerTerm));
            }
        });
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
        // 메인 페이지: 마키(전광판) 효과를 위해 최신 뉴스 6개 추출
        paginatedNews = filteredNews.slice(0, 6);
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

            const tagsHtml = article.tags.map(t => `<span class="news-tag" style="margin-bottom: 0;">${t}</span>`).join('');

        card.innerHTML = `
            <div class="news-img" style="background-image: url('${article.img}');"></div>
            <div class="news-body">
                    <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 6px;">${tagsHtml}</div>
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

    // 메인 페이지(index.html) 무한 스크롤 전광판을 위한 노드 복제
    if (isHomePage && container.children.length > 0) {
        const originalChildren = Array.from(container.children);
        originalChildren.forEach((child, index) => {
            const clone = child.cloneNode(true);
            const article = paginatedNews[index];
            clone.addEventListener('click', () => {
                window.location.href = `article.html?id=${article.originalIndex}`;
            });
            container.appendChild(clone);
        });
    }

    // Render Pagination Controls
    if (!isHomePage && paginationContainer) {
        paginationContainer.innerHTML = '';
        if (totalPages > 1) {
            // Previous Button
            const prevBtn = document.createElement('button');
            prevBtn.className = 'btn btn-secondary';
            prevBtn.textContent = 'Prev';
            prevBtn.style.padding = '8px 16px';
            prevBtn.style.margin = '0';
            prevBtn.disabled = currentNewsPage === 1;
            if (!prevBtn.disabled) {
                prevBtn.addEventListener('click', () => renderStaticNews(searchTerm, searchType, sortBy, currentNewsPage - 1));
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
                btn.style.margin = '0';
                btn.addEventListener('click', () => {
                    renderStaticNews(searchTerm, searchType, sortBy, i);
                    document.querySelector('.news-controls').scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
                paginationContainer.appendChild(btn);
            }

            // Next Button
            const nextBtn = document.createElement('button');
            nextBtn.className = 'btn btn-secondary';
            nextBtn.textContent = 'Next';
            nextBtn.style.padding = '8px 16px';
            nextBtn.style.margin = '0';
            nextBtn.disabled = currentNewsPage === totalPages;
            if (!nextBtn.disabled) {
                nextBtn.addEventListener('click', () => renderStaticNews(searchTerm, searchType, sortBy, currentNewsPage + 1));
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

        const tagsHtml = article.tags.map(t => `<span class="news-tag">${t}</span>`).join('');

        // 예상 읽기 시간 계산 (단어 수 기준, 평균 200단어/분)
        const wordCount = article.body.trim().split(/\s+/).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));

        detailContainer.innerHTML = `
            <div class="news-detail-header">
                <div class="news-detail-tags">
                    ${tagsHtml}
                </div>
                <h1>${article.title}</h1>
                <span class="news-date">${article.date} &nbsp;&bull;&nbsp; ${readTime} min read</span>
            </div>
            <div class="news-detail-img" style="background-image: url('${article.img}');"></div>
            <div class="news-detail-body">
                <p>${article.body}</p>
                <div class="news-detail-actions">
                    ${hasPrev ? '<a href="article.html?id=' + (currentIndex - 1) + '" class="btn btn-secondary">&larr; Previous</a>' : '<div class="btn-placeholder"></div>'}
                    <a href="news.html" class="btn btn-primary">View All News</a>
                    ${hasNext ? '<a href="article.html?id=' + (currentIndex + 1) + '" class="btn btn-secondary">Next &rarr;</a>' : '<div class="btn-placeholder"></div>'}
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
        const imgUrl = (builder && item.backgroundImage)
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
        return 'coop/coopmart.html';
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
        return 'investments/investments.html';
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

function getLeaderProfileExtras(director, index) {
    const role = director.role || 'Cooperative Leader';
    const name = director.name || 'TerraLink Officer';
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '');

    return {
        description: director.bio || director.description ||
            `${name} serves as ${role} at TerraLink Cooperative, supporting transparent governance, member-focused programs, and sustainable community growth.`,
        email: director.email || `${slug || `leader${index + 1}`}@terralink.coop`,
        phone: director.phone || '+63 (32) 230-0100'
    };
}

function createLeaderModal() {
    const existing = document.getElementById('leader-modal');
    if (existing && existing.querySelector('.modal-box--large')) return;
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'leader-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-box modal-box--split modal-box--large">
            <button class="modal-close" id="leader-modal-close" type="button" aria-label="Close">&times;</button>
            <div class="modal-split">
                <div class="modal-split__media" id="leader-modal-img" role="img" aria-hidden="true"></div>
                <div class="modal-split__body modal-body">
                    <p class="director-role" id="leader-modal-role"></p>
                    <h3 id="leader-modal-name"></h3>
                    <p id="leader-modal-desc"></p>
                    <div class="leader-modal-meta">
                        <p><strong>Email:</strong> <span id="leader-modal-email"></span></p>
                        <p><strong>Phone:</strong> <span id="leader-modal-phone"></span></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('leader-modal-close').addEventListener('click', closeLeaderModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLeaderModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLeaderModal();
    });
}

function openLeaderModal(director, imageUrl) {
    createLeaderModal();
    const extras = director.description
        ? director
        : getLeaderProfileExtras(director, 0);
    const imgEl = document.getElementById('leader-modal-img');

    if (imageUrl) {
        imgEl.style.backgroundImage = `url('${imageUrl}')`;
        imgEl.style.display = 'block';
    } else {
        imgEl.style.backgroundImage = 'linear-gradient(135deg, #23743B, #1b3d22)';
        imgEl.style.display = 'block';
    }

    document.getElementById('leader-modal-role').textContent = director.role || 'Director';
    document.getElementById('leader-modal-name').textContent = director.name;
    document.getElementById('leader-modal-desc').textContent = extras.description;
    document.getElementById('leader-modal-email').textContent = extras.email;
    document.getElementById('leader-modal-phone').textContent = extras.phone;
    document.getElementById('leader-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLeaderModal() {
    const modal = document.getElementById('leader-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function renderDirectors(containerId, directors) {
    const container = document.getElementById(containerId);
    if (!container || !Array.isArray(directors) || directors.length === 0) return;

    container.innerHTML = '';
    container.classList.add('leader-grid');
    createLeaderModal();

    directors.forEach((director, index) => {
        if (!director || !director.name) return;

        const extras = getLeaderProfileExtras(director, index);
        const profile = { ...director, ...extras };

        let imageUrl = '';
        const card = document.createElement('article');
        card.className = 'leader-card about-reveal';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View profile for ${director.name}`);

        const media = document.createElement('div');
        media.className = 'leader-card__media';

        if (builder && director.image && director.image.asset) {
            imageUrl = urlFor(director.image).width(600).height(600).fit('crop').url();
            media.style.backgroundImage = `url('${imageUrl}')`;
            media.setAttribute('aria-label', getDirectorAvatarLabel(containerId));
        } else {
            media.classList.add('leader-card__media--initials');
            media.textContent = getInitials(director.name);
        }

        const info = document.createElement('div');
        info.className = 'leader-card__info';

        const name = document.createElement('h3');
        name.className = 'leader-card__name';
        name.textContent = director.name;

        const role = document.createElement('p');
        role.className = 'leader-card__role';
        role.textContent = director.role || 'Director';

        info.appendChild(name);
        info.appendChild(role);
        card.appendChild(media);
        card.appendChild(info);

        const openProfile = () => openLeaderModal(profile, imageUrl);
        card.addEventListener('click', openProfile);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProfile();
            }
        });

        container.appendChild(card);
    });

    if (typeof window.initAboutPageAnimations === 'function') {
        window.initAboutPageAnimations();
    }
}

function renderTimelineEntries(entries) {
    const container = document.getElementById('timeline-container');
    if (!container || !Array.isArray(entries) || entries.length === 0) return;

    container.innerHTML = '';

    entries.forEach((entry) => {
        if (!entry || !entry.title) return;

        const item = document.createElement('article');
        item.className = 'timeline-entry';

        const hasImage = Boolean(builder && entry.mainImage && entry.mainImage.asset);

        if (hasImage) {
            const imageWrap = document.createElement('div');
            imageWrap.className = 'timeline-image-wrap';

            const image = document.createElement('div');
            image.className = 'timeline-image';
            const imgUrl = urlFor(entry.mainImage).width(1200).height(675).fit('crop').url();
            image.style.backgroundImage = `url('${imgUrl}')`;

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
    const searchType = document.getElementById('news-search-type');
    const sortSelect = document.getElementById('news-sort');

    if (searchInput && sortSelect) {
        const getSearchType = () => searchType ? searchType.value : 'all';
        
        // news.html: 현재 드롭다운 세팅(기본 최신순)에 맞춰 초기 렌더링 적용
        renderStaticNews(searchInput.value, getSearchType(), sortSelect.value, 1);
        
        const updateNews = () => renderStaticNews(searchInput.value, getSearchType(), sortSelect.value, 1);
        searchInput.addEventListener('input', updateNews);
        if (searchType) searchType.addEventListener('change', updateNews);
        sortSelect.addEventListener('change', updateNews);
    } else {
        // index.html: 무조건 가장 최신순(date-desc)으로 렌더링하여 최신 뉴스 3개 보장
        renderStaticNews('', 'all', 'date-desc', 1);
    }

    renderNewsDetail();
    loadHeroCarousel();
    loadDirectors();
    loadTimeline();
    loadSiteSettings();    
    loadCoopVision(); 
});