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
        body: `TerraLink Multipurpose Cooperative formally closes Q2 2026 with an exceptional 15% increase in total assets, marking an outstanding milestone in our fiscal history. This growth was primarily fueled by a record-breaking surge in regular and institutional member deposits, alongside aggressive yet prudently managed loan deployments across key micro-retail and agricultural sectors.

Our net savings institutional reserves also expanded by 9% compared to the same period last year, solidifying our overall asset quality. This sustained financial health allows the cooperative to maintain competitive dividend baselines for the next half of the year. The Board of Directors extends its deepest gratitude to our loyal members for their unwavering trust.

Members may access the full, audited financial statements through the secured online portal or request a printed copy at any branch office. Moving forward into Q3, our treasury management team will focus on expanding green asset investments and strengthening our structural liquidity buffers to ensure long-term stability and resilience against inflationary pressures.`,
        date: "June 10, 2026",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Loans", "Solar", "Sustainability", "Green"],
        title: "New Solar Loan Initiative",
        body: `To actively support eco-friendly transitions and sustainable community development, TerraLink proudly introduces the Solar Home Loan Initiative. This dedicated financing program is specifically designed to help regular members shift to clean, renewable energy without facing immediate financial strain.

The cooperative offers highly competitive preferential interest rates starting at just 4.5% per annum, with flexible and accommodating repayment timelines stretching up to 60 full months. The loan package comprehensively covers the direct purchase and structural installation of high-tier solar panel setups, hybrid inverter systems, and deep-cycle battery storage units.

By minimizing initial capital barriers, we aim to drastically reduce the monthly electricity expenses of our member households while directly contributing to carbon footprint reduction. Applications are now officially accepted at all regional branch offices and via our mobile app's dedicated credit facility window. Interested members must submit their latest utility bills and a professional site technical assessment form, which can be arranged through our certified solar installer partners.`,
        date: "June 5, 2026",
        img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["CoopMart", "Local", "Events", "Community"],
        title: "CoopMart Local Artisan Fair",
        body: `CoopMart is incredibly proud to host its first comprehensive Local Artisan Fair this coming weekend at all major satellite and main branch parking complexes. This community-centric event aims to showcase unique, high-quality handcrafted items produced by over 30 talented community makers and micro-entrepreneurs.

Visitors can look forward to exploring diverse booths featuring hand-woven traditional baskets, functional ceramic pottery, organic natural soap gift sets, and premium locally roasted highland coffee blends. By eliminating standard middleman retail fees, 100% of the event proceeds will go directly to supporting the livelihood of our partner micro-retailers.

In addition, the cooperative has sponsored live acoustic music sessions and local food trucks to create a vibrant weekend atmosphere for everyone. Entry is completely free of charge for all registered TerraLink members, their immediate dependents, and the general public. Come join us to discover exceptional local talent, support community enterprise development, and enjoy a rewarding weekend shopping experience with friends and family.`,
        date: "June 1, 2026",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Community", "Education", "Youth", "Financial Literacy"],
        title: "Youth Financial Literacy Workshop",
        body: `TerraLink firmly believes that sustainable financial empowerment and structural poverty alleviation start with educating the younger generation. Our Education Committee is hosting a free summer workshop series open to teenagers and young adults aged 13 to 22 years old.

The comprehensive curriculum covers essential budgeting principles, saving frameworks, compound interest dynamics, and the critical dangers of irresponsible credit card or digital loan use. Sessions are scheduled to run every Saturday throughout June inside the Main Branch's newly renovated Training Hall.

To make the learning process highly engaging, our financial experts will utilize interactive board games, mobile budgeting simulation tools, and group case studies. Parents are strongly encouraged to accompany younger participants to foster healthy financial conversations at home. Complimentary snacks, learning modules, and a certificate of completion will be provided to all attendees. Seats are strictly limited to ensure an optimal teacher-to-student ratio, so please secure a slot early through the member mobile application.`,
        date: "May 30, 2026",
        img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Membership", "Health", "Partnership", "Insurance"],
        title: "Expanded Health Insurance Options",
        body: `Your comprehensive well-being and physical health remain the highest operational priority for the TerraLink Cooperative management team. We have successfully signed a mutual partnership agreement with three of the country's leading healthcare insurance providers to offer exclusive group medical packages.

These customized health plans are available at subsidized rates exclusively for regular members in good standing, with premium baselines starting at an affordable ₱350 per month. The coverage features free unlimited outpatient consultations at accredited hospitals, annual preventative physical check-ups, and extensive emergency inpatient hospitalization support.

Members can also choose to add their immediate family dependents to the policy at a similarly discounted rate during this open enrollment window. Please visit any active branch office to speak with a dedicated insurance representative, compare coverage matrix tables, and fill out the medical history declaration sheets. Active insurance coverage will officially commence within exactly 15 days following the successful validation of the first monthly premium payment.`,
        date: "May 25, 2026",
        img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Announcement", "Assembly", "Governance", "Voting"],
        title: "Annual General Assembly 2026",
        body: `All registered members are cordially invited to attend TerraLink’s highly anticipated Annual General Assembly, the primary democratic governance event of our cooperative. This year's assembly focuses on reinforcing structural transparency, discussing fiscal achievements, and voting for key corporate changes.

The formal agenda will include the comprehensive presentation of audited financial statements, election of new members to the Board of Directors, and ratification of critical by-law amendments. Furthermore, we will hold a dedicated open-floor forum to address member questions regarding dividend distribution timelines and proposed micro-loan policy updates.

Active physical or virtual attendance is strongly urged, as reaching a strict legal quorum is mandatory to pass binding organizational resolutions. Complete logistics regarding date schedules, digital streaming access tokens, and localized assembly venues will be pushed out via broadcast SMS and the member portal. Let us actively participate in the collective decision-making process that constructively shapes the progressive future of our shared cooperative institution.`,
        date: "May 22, 2026",
        img: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["CoopMart", "Organic", "Agriculture", "Local Produce"],
        title: "New Organic Supply in CoopMart",
        body: `An authentic, highly sustainable farm-to-table shopping experience is finally arriving across all physical retail branches of our CoopMart stores. Starting this upcoming weekend, all storefront locations will unveil a dedicated fresh-produce aisle showcasing certified organic items sourced from our local partner farms.

Available stock will include premium seasonal vegetables, native root crops, premium organic brown and heirloom rice varieties, and farm-fresh free-range eggs. By directly connecting rural agricultural cooperatives with urban consumers, we effectively remove expensive third-party distributor markups.

This operational model ensures that prices remain exceptionally member-friendly, making healthy nutritional choices genuinely accessible to all family income brackets. New fresh shipments are scheduled to arrive every Friday morning to guarantee peak freshness for weekend shoppers. Cooperative members who purchase from the organic aisle will also enjoy an additional 2% point discount upon presenting their valid digital membership cards at the checkout counters.`,
        date: "May 18, 2026",
        img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Announcement", "Digital", "App", "Technology"],
        title: "Digital Banking App Update",
        body: `We are thrilled to announce the official public deployment of a massive architectural update to the TerraLink mobile banking application. Version 3.2 introduces seamless, instant peer-to-peer fund transfers between cooperative members entirely free of any service charges.

The home screen features a completely redesigned graphical dashboard that provides real-time balance tracking, accumulated dividend computations, and active loan repayment schedules. To significantly improve user data safety, the app now fully integrates native biometric fingerprint and facial recognition support alongside multi-factor authentication protocols.

Additionally, members can now access an end-to-end encrypted live chat channel to communicate directly with our customer support and credit assessment teams. The update is currently available for download on both the Apple App Store and Google Play Store. Existing users will receive an automated system prompt to update their application upon their next login sequence under a stable internet connection.`,
        date: "May 15, 2026",
        img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Community", "Grant", "Farming", "Agriculture"],
        title: "Agricultural Support Grant",
        body: `As a cornerstone of TerraLink’s institutional mandate to protect rural livelihoods, a ₱2.5 million agricultural support grant has been officially approved. This fund is strictly dedicated to assisting vulnerable partner smallholder farmers operating within Cebu's critical upland agricultural barangays ahead of the intense dry season.

The financial grant will be utilized to install automated drip irrigation setups, build robust rainwater harvesting facilities, and purchase premium climate-resilient seed varieties. Over fourteen farming households have been thoroughly screened and selected to receive capital disbursements during the initial phase of implementation.

Local agricultural engineers from our community outreach office will provide on-site technical supervision to ensure correct equipment deployment. By fortifying our farmers against harsh seasonal weather shifts, we protect local food supply chains and secure stable family income baselines. Regular progress updates and field reports will be published monthly via the sustainability section of our official cooperative website.`,
        date: "May 12, 2026",
        img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Financial", "Rates", "Policy", "Time Deposit"],
        title: "Interest Rate Adjustment Notification",
        body: `In direct response to recent benchmark updates and monetary policy shifts announced by the central banking authority, TerraLink has strategically adjusted its interest rate tiers. These modifications will formally take effect on June 1, 2026, aiming to optimize member yields while preserving our asset-liability balancing margins.

While our standard regular savings accounts will comfortably maintain their stable baseline of 2.5% per annum, our high-yield 12-month time deposits are receiving an upward revision to an attractive 5.0%. This policy change offers a secure, high-performing shelter for members looking to protect their hard-earned capital reserves against volatile market fluctuations.

Members holding active time deposit accounts are advised to visit their nearest branch location at their earliest convenience to receive official passbook validations. For detailed conversations regarding customized wealth growth or alternative capital placements, please secure an appointment with our financial services advisory desk.`,
        date: "May 10, 2026",
        img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Financial", "Dividends", "Investment", "Members"],
        title: "Investment Dividend Distribution",
        body: `The executive management of TerraLink Cooperative is extremely pleased to communicate that the semi-annual dividend distribution has been successfully executed. All qualified Growth Investment Plan accounts have been systematically reviewed, audited, and credited as of the end of the business day on May 8, 2026.

Thanks to our disciplined risk management and profitable loan deployments, the average annualized payout rate for this cycle reached a stellar 7.2%. This performance continues to outpace standard commercial banking alternatives, reflecting our commitment to maximizing real value returns for our investing members.

Members can easily verify their precise credited dividend amounts by logging into the mobile app, request a physical passbook printout, or visit any local branch teller counter. The board remains fully committed to maintaining this upward momentum by pursuing low-risk, diversified financial portfolios throughout the remainder of the fiscal year.`,
        date: "May 8, 2026",
        img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Membership", "Onboarding", "Batch", "New Members"],
        title: "New Member Onboarding — Batch 2026",
        body: `TerraLink is officially welcoming applications for our second comprehensive cooperative membership onboarding intake for the fiscal year 2026. Becoming an active member of our growing institution unlocks immediate entry to competitive micro-loan products, high-yielding investment plans, and exclusive shopping rewards at CoopMart outlets.

The mandatory onboarding documentation checklist requires the presentation of one valid government-issued photo ID card, two recent 2x2 colored ID pictures, and a fully accomplished membership form. Upon receiving formal committee approval, a one-time minimum share capital contribution of ₱500 must be deposited to establish regular membership standing.

The standard background verification and account creation process requires approximately 3 to 5 business days to complete. Interested individuals are encouraged to drop by any nearby branch office to participate in our mandatory pre-membership educational seminar or complete the preliminary application modules online via our web portal.`,
        date: "May 5, 2026",
        img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["CoopMart", "Eco-friendly", "Campaign", "Sustainability"],
        title: "CoopMart Zero-Waste Campaign",
        body: `CoopMart is embarking on an ambitious green retail journey, and we are callously inviting our entire cooperative family to actively join the movement. Starting next week, all CoopMart brick-and-mortar retail outlets will enforce a strict bring-your-own-bag policy to reduce single-use checkout plastic waste.

To encourage this sustainable shift, members who bring reusable shopping bags will instantly earn 5 bonus loyalty points per commercial transaction. These accumulated eco-points can be seamlessly redeemed for cash discounts during future checkout sessions or donated directly to community tree-planting funds.

For shoppers caught without a bag, heavy-duty reusable canvas totes will be available for purchase at all cashier counters for a nominal fee of ₱25. We deeply appreciate your cooperative understanding and active partnership as we systematically reshape our daily consumer habits to protect our local ecosystems.`,
        date: "May 2, 2026",
        img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Loans", "Relief", "Calamity", "Emergency"],
        title: "Special Loan Program for Calamity Victims",
        body: `In swift response to the severe damage caused by recent natural weather disturbances, TerraLink is mobilizing an emergency financial relief loan facility. This zero-interest calamity assistance program is structured to provide urgent capital relief of up to ₱20,000 per affected member household.

To ensure maximum breathing room for recovery, the loan features a relaxed 12-month total repayment schedule paired with an absolute 3-month payment grace period. Eligible applicants must simply present basic proof of locality impact, a valid membership identification card, and a completed emergency credit request sheet.

Our internal credit committee has streamlined the approval workflow, reducing target processing times down to an unprecedented 24-hour turnaround matrix. Special recovery assistance officers have been deployed across on-site field tents to help members navigate the application paperwork without standing in long branch lines. This program will remain fully open for applications until June 30, 2026.`,
        date: "April 28, 2026",
        img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Announcement", "Meeting", "Townhall", "Policy"],
        title: "Member Townhall Meeting Schedule",
        body: `Because democratic participation and collective transparency form the absolute core of our organizational identity, TerraLink is scheduling a series of virtual townhall meetings. These digital sessions are designed to gather direct member feedback on upcoming micro-credit adjustment models and structural product rollouts before final board votes.

Key discussion topics include proposed updates to multi-purpose loan eligibility matrices, geographical expansion plans for new CoopMart branches, and technical details on our upcoming high-yield digital savings product. The virtual meetings will be hosted via a secure video conferencing link, featuring live question-and-answer panels with our board directors and department heads.

Complete scheduling parameters and individual digital entry tokens will be broadcasted to all active emails and registered mobile numbers over the coming week. Members who cannot attend live are highly encouraged to submit their questions in advance using the mobile app’s townhall forum tab.`,
        date: "April 20, 2026",
        img: "https://images.unsplash.com/photo-1591522811280-a8759970b03f?auto=format&fit=crop&w=600&q=80"
    },
    {
        tags: ["Community", "Environment", "Volunteer", "Eco-Drive"],
        title: "TerraLink Eco-Drive: Tree Planting Event",
        body: `TerraLink is officially opening registration for our annual Eco-Drive Tree Planting Event, a major environmental volunteer milestone organized by our Community Development Committee. This year, our target is to successfully plant over 1,000 native seedling varieties across critical public watershed protection zones in the upland regions of Cebu.

The cooperative will provide free round-trip bus transportation from our main corporate headquarters directly to the planting sites, alongside complimentary snacks, hydration packs, and specialized planting tools. This outdoor volunteer event is completely free and open to all registered cooperative members, youth civic groups, and environmental enthusiasts.

It offers an excellent opportunity for family bonding while taking real, measurable action to combat local deforestation and climate impacts. Volunteer registration modules will remain open until June 5, 2026, accessible through any physical branch customer desk or via the community events tab inside the TerraLink mobile application.`,
        date: "April 15, 2026",
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80"
    }
];

// ============================================================
// RENDER — Static news cards with Search & Sort
// ============================================================
let currentNewsPage = 1;
const NEWS_PER_PAGE = 6;

function createModal() {
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
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
    const newsOverlay = document.getElementById('modal-overlay');
    if (newsOverlay) newsOverlay.classList.remove('active');
    const productOverlay = document.getElementById('product-modal-overlay');
    if (productOverlay) productOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function createProductModal() {
    const modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.innerHTML = `
        <div class="modal-overlay" id="product-modal-overlay">
            <div class="modal-box">
                <button class="modal-close" id="product-modal-close">&times;</button>
                <div class="modal-img" id="product-modal-img"></div>
                <div class="modal-body">
                    <h3 id="product-modal-title"></h3>
                    <p id="product-modal-price"></p>
                    <p id="product-modal-caption"></p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('product-modal-close').addEventListener('click', closeModal);
    document.getElementById('product-modal-overlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('product-modal-overlay')) closeModal();
    });
}

function openProductModal(product) {
    const imgEl = document.getElementById('product-modal-img');
    if (imgEl) imgEl.style.backgroundImage = product.imgUrl || 'none';
    document.getElementById('product-modal-title').textContent = product.title || '';
    document.getElementById('product-modal-price').textContent = product.price || '';
    document.getElementById('product-modal-caption').textContent = product.caption || '';
    document.getElementById('product-modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function initProductCards() {
    const cards = document.querySelectorAll('.product-card:not([data-product-id])');
    if (!cards.length) return;

    cards.forEach((card) => {
        const imgDiv = card.querySelector('.product-img');
        if (!imgDiv) return;

        const title = card.querySelector('h4')?.textContent || 'Product';
        const price = card.querySelector('p:not(.product-caption)')?.textContent || '';
        const caption = card.querySelector('.product-caption')?.textContent || '';

        card.addEventListener('click', () => {
            const imageStyle = window.getComputedStyle(imgDiv).backgroundImage;
            const imgUrl = imageStyle && imageStyle !== 'none' ? imageStyle : '';
            openProductModal({ title, price, caption, imgUrl });
        });
    });
}

// ============================================================
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

    paginatedNews.forEach((article, index) => {
        const card = document.createElement('article');
        card.className = isHomePage ? 'news-card' : 'news-card reveal-on-scroll';
        if (!isHomePage) {
            card.style.transitionDelay = `${(index % NEWS_PER_PAGE) * 0.1}s`;
        }

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

    // 새롭게 추가된 동적 카드들에 대해 옵저버 감지 시작
    if (typeof observeElements === 'function') observeElements();
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
            <div class="news-detail-header reveal-on-scroll">
                <div class="news-detail-tags">
                    ${tagsHtml}
                </div>
                <h1>${article.title}</h1>
                <span class="news-date">${article.date} &nbsp;&bull;&nbsp; ${readTime} min read</span>
            </div>
            <div class="news-detail-img reveal-on-scroll" style="background-image: url('${article.img}'); transition-delay: 0.15s;"></div>
            <div class="news-detail-body reveal-on-scroll" style="transition-delay: 0.3s;">
                ${article.body.split(/\n\s*\n/).map(para => `<p>${para.trim()}</p>`).join('\n                ')}
                <div class="news-detail-actions">
                    ${hasPrev ? '<a href="article.html?id=' + (currentIndex - 1) + '" class="btn btn-secondary">&larr; Previous</a>' : '<div class="btn-placeholder"></div>'}
                    <a href="news.html" class="btn btn-primary">View All News</a>
                    ${hasNext ? '<a href="article.html?id=' + (currentIndex + 1) + '" class="btn btn-secondary">Next &rarr;</a>' : '<div class="btn-placeholder"></div>'}
                </div>
            </div>
        `;

        if (typeof observeElements === 'function') observeElements();
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
        description: director.bio || director.description || [
            `${name} serves as ${role} at TerraLink Cooperative, where they champion transparent governance, member-focused programs, and sustainable community growth. With a deep commitment to cooperative principles, they help guide strategic decisions that keep members at the heart of every initiative.`,
            `Beyond day-to-day responsibilities, ${name} actively supports financial literacy outreach, local producer partnerships, and the long-term resilience of the cooperative. Their leadership reflects TerraLink's enduring vision of building a better future together.`
        ].join('\n\n'),
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
                    <div id="leader-modal-desc"></div>
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
        imgEl.classList.remove('modal-split__media--placeholder');
    } else {
        imgEl.style.backgroundImage = '';
        imgEl.style.display = 'block';
        imgEl.classList.add('modal-split__media--placeholder');
    }

    document.getElementById('leader-modal-role').textContent = director.role || 'Director';
    document.getElementById('leader-modal-name').textContent = director.name;

    const descEl = document.getElementById('leader-modal-desc');
    descEl.innerHTML = '';
    String(extras.description)
        .split(/\n{2,}/)
        .map((para) => para.trim())
        .filter(Boolean)
        .forEach((para) => {
            const p = document.createElement('p');
            p.textContent = para;
            descEl.appendChild(p);
        });
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
            media.classList.add('leader-card__media--placeholder');
            media.setAttribute('aria-label', getDirectorAvatarLabel(containerId));
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
function getAssetPrefix() {
    const link = document.querySelector('link[rel="stylesheet"]');
    const href = link ? link.getAttribute('href') : '';
    return href && href.startsWith('../') ? '../' : '';
}

function createContactIcon(fileName, alt) {
    const img = document.createElement('img');
    img.className = 'contact-icon';
    img.src = `${getAssetPrefix()}Images/assets/${fileName}`;
    img.alt = alt;
    return img;
}

function setContactLine(el, fileName, alt, text) {
    el.textContent = '';
    el.appendChild(createContactIcon(fileName, alt));
    el.appendChild(document.createTextNode(` ${text}`));
}

function renderFooterPhoneIcon() {
    const phoneEl = Array.from(document.querySelectorAll('.footer-contact p'))
        .find((p) => p.textContent.includes('📞') || p.textContent.includes('+63'));
    if (!phoneEl) return;
    const number = phoneEl.textContent.replace(/[^\d+()\s-]/g, '').trim();
    setContactLine(phoneEl, 'phone icon.png', 'Phone', number);
}

async function loadSiteSettings() {
    if (!mainSanityClient) return;
 
    const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{ address, emails }`;
 
    try {
        const settings = await mainSanityClient.fetch(SETTINGS_QUERY);
        
        if (settings) {
            const addressEl = document.getElementById('footer-address');
            const emailEl   = document.getElementById('footer-email');
 
            if (addressEl && settings.address)
                setContactLine(addressEl, 'location icon.png', 'Location', settings.address);
 
            if (emailEl && settings.emails && settings.emails.length > 0)
                setContactLine(emailEl, 'mail icon.png', 'Email', settings.emails[0]);

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
// GLOBAL SCROLL REVEAL ANIMATIONS
// ============================================================
const globalScrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

function observeElements() {
    document.querySelectorAll('.reveal-on-scroll:not(.is-visible)').forEach(el => {
        globalScrollObserver.observe(el);
    });
}

// ============================================================
// INIT
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
    createModal();
    createProductModal();

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
    initProductCards();
    observeElements();
    renderFooterPhoneIcon();
});