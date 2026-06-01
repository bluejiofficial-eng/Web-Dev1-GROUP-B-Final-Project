// ============================================================
// TerraLink — History & Timeline page
// ============================================================

const FALLBACK_TIMELINE = [
    {
        title: 'Cooperative Foundation',
        description: 'TerraLink began as a community-first cooperative formed to provide dependable financial support and shared opportunities for local members.',
        eventDate: '1998-01-01',
        keyMetric: 'Founding milestone',
        category: 'Foundation',
        imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
    },
    {
        title: 'Member Services Expansion',
        description: 'The cooperative expanded its loan, savings, and member assistance programs to reach more households and small enterprises across the region.',
        eventDate: '2010-06-15',
        keyMetric: 'Expanded member access',
        category: 'Growth',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80'
    },
    {
        title: 'CoopMart & Community Programs',
        description: 'TerraLink launched CoopMart storefronts and outreach initiatives connecting members with local producers and sustainable goods.',
        eventDate: '2018-03-20',
        keyMetric: 'Retail & outreach',
        category: 'Community',
        imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80'
    },
    {
        title: 'Digital Service Improvements',
        description: 'TerraLink strengthened its service channels with online applications, faster support, and improved access to cooperative information.',
        eventDate: '2024-01-01',
        keyMetric: 'Modernized services',
        category: 'Innovation',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80'
    }
];

function getTimelineYear(eventDate) {
    const parsedDate = new Date(eventDate);
    return Number.isNaN(parsedDate.getTime()) ? 'TBA' : parsedDate.getFullYear();
}

function getEntryImageUrl(entry) {
    if (entry?.mainImage?.asset && window.terralinkSanity?.urlFor) {
        return window.terralinkSanity.urlFor(entry.mainImage).width(900).height(520).fit('crop').url();
    }
    if (typeof entry?.imageUrl === 'string') return entry.imageUrl;
    return null;
}

function animateStatValue(el, target, suffix = '') {
    if (!el || Number.isNaN(target)) return;
    const duration = 1200;
    const start = performance.now();
    const from = 0;

    function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(from + (target - from) * eased);
        el.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function updateHistoryStats(entries) {
    const yearsActiveStat = document.getElementById('years-active-stat');
    const milestoneCountStat = document.getElementById('milestone-count-stat');
    const foundingYearStat = document.getElementById('founding-year-stat');
    const datedYears = entries
        .map((entry) => getTimelineYear(entry.eventDate))
        .filter((year) => Number.isInteger(year));
    const foundingYear = datedYears.length ? Math.min(...datedYears) : new Date().getFullYear();
    const yearsActive = Math.max(new Date().getFullYear() - foundingYear, 0);

    animateStatValue(yearsActiveStat, yearsActive, '+');
    animateStatValue(milestoneCountStat, entries.length, '');
    if (foundingYearStat) foundingYearStat.textContent = foundingYear;
}

function createChip(text, className) {
    const chip = document.createElement('span');
    chip.className = className;
    chip.textContent = text;
    return chip;
}

function toggleMilestone(selected) {
    const isOpen = selected.classList.contains('is-open');
    document.querySelectorAll('#history-timeline .history-milestone').forEach((row) => {
        row.classList.remove('is-open');
        const card = row.querySelector('.history-milestone__card');
        if (card) card.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
        selected.classList.add('is-open');
        selected.querySelector('.history-milestone__card')?.setAttribute('aria-expanded', 'true');
    }

    scheduleTimelineLineUpdate();
}

function updateTimelineLine() {
    const timeline = document.getElementById('history-timeline');
    if (!timeline) return;

    const milestones = timeline.querySelectorAll('.history-milestone');
    if (!milestones.length) {
        timeline.style.setProperty('--timeline-line-height', '0px');
        return;
    }

    const firstDot = milestones[0].querySelector('.history-milestone__dot');
    const lastDot = milestones[milestones.length - 1].querySelector('.history-milestone__dot');
    if (!firstDot || !lastDot) return;

    const timelineRect = timeline.getBoundingClientRect();
    const firstRect = firstDot.getBoundingClientRect();
    const lastRect = lastDot.getBoundingClientRect();

    const top = firstRect.top - timelineRect.top + firstRect.height / 2;
    const bottom = lastRect.top - timelineRect.top + lastRect.height / 2;

    const lineLeft = firstRect.left - timelineRect.left + firstRect.width / 2 - 1.5;

    timeline.style.setProperty('--timeline-line-top', `${top}px`);
    timeline.style.setProperty('--timeline-line-height', `${Math.max(bottom - top, 0)}px`);
    timeline.style.setProperty('--timeline-line-left', `${lineLeft}px`);
}

let timelineResizeTimer;
function scheduleTimelineLineUpdate() {
    clearTimeout(timelineResizeTimer);
    timelineResizeTimer = setTimeout(updateTimelineLine, 100);
}

function initHistoryScrollAnimations() {
    const timeline = document.getElementById('history-timeline');
    const milestones = document.querySelectorAll('.history-milestone');
    if (!timeline || milestones.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.15 }
    );

    milestones.forEach((milestone, index) => {
        milestone.style.transitionDelay = `${index * 0.08}s`;
        observer.observe(milestone);
    });

    requestAnimationFrame(() => {
        updateTimelineLine();

        const lineObserver = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    updateTimelineLine();
                    timeline.classList.add('is-drawn');
                    lineObserver.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        lineObserver.observe(timeline);
    });

    window.addEventListener('resize', scheduleTimelineLineUpdate);
}

function renderHistoryTimeline(entries) {
    const container = document.getElementById('history-timeline');
    if (!container) return;

    container.innerHTML = '';
    container.classList.remove('is-drawn');
    updateHistoryStats(entries);

    entries.forEach((entry, index) => {
        const year = getTimelineYear(entry.eventDate);
        const imageUrl = getEntryImageUrl(entry);
        const description = entry.description || 'A meaningful milestone in TerraLink Cooperative history.';

        const milestone = document.createElement('article');
        milestone.className = 'history-milestone';

        const rail = document.createElement('div');
        rail.className = 'history-milestone__rail';
        rail.setAttribute('aria-hidden', 'true');

        const yearBadge = document.createElement('span');
        yearBadge.className = 'history-milestone__year';
        yearBadge.textContent = year;
        rail.appendChild(yearBadge);
        rail.appendChild(createChip('', 'history-milestone__dot'));

        const cardWrap = document.createElement('div');

        const card = document.createElement('div');
        card.className = 'history-milestone__card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-expanded', 'false');
        card.setAttribute('aria-controls', `history-detail-${index}`);

        if (imageUrl) {
            const media = document.createElement('div');
            media.className = 'history-milestone__media';
            media.style.backgroundImage = `url('${imageUrl}')`;
            media.setAttribute('role', 'img');
            media.setAttribute('aria-label', entry.title || 'Milestone image');
            card.appendChild(media);
        }

        const body = document.createElement('div');
        body.className = 'history-milestone__body';

        const meta = document.createElement('div');
        meta.className = 'history-milestone__meta';
        meta.appendChild(createChip(entry.category || 'Milestone', 'news-tag'));
        if (entry.keyMetric) {
            meta.appendChild(createChip(entry.keyMetric, 'badge'));
        }
        body.appendChild(meta);

        const title = document.createElement('h3');
        title.textContent = entry.title || 'TerraLink Milestone';
        body.appendChild(title);

        const excerpt = document.createElement('p');
        excerpt.className = 'history-milestone__excerpt';
        excerpt.textContent = description;
        body.appendChild(excerpt);

        const toggle = document.createElement('span');
        toggle.className = 'history-milestone__toggle';
        toggle.setAttribute('aria-hidden', 'true');
        toggle.textContent = '▼';
        body.appendChild(toggle);

        card.appendChild(body);

        const detailWrap = document.createElement('div');
        detailWrap.className = 'history-milestone__detail-wrap';

        const detailInner = document.createElement('div');
        detailInner.className = 'history-milestone__detail-inner';

        const detail = document.createElement('div');
        detail.className = 'history-milestone__detail';
        detail.id = `history-detail-${index}`;

        const detailText = document.createElement('p');
        detailText.textContent = description;
        detail.appendChild(detailText);

        const chips = document.createElement('div');
        chips.className = 'history-milestone__detail-chips';
        chips.appendChild(createChip(String(year), 'news-tag'));
        chips.appendChild(createChip(entry.category || 'Milestone', 'news-tag'));
        if (entry.keyMetric) chips.appendChild(createChip(entry.keyMetric, 'news-tag'));
        detail.appendChild(chips);

        detailInner.appendChild(detail);
        detailWrap.appendChild(detailInner);

        cardWrap.appendChild(card);
        cardWrap.appendChild(detailWrap);

        const open = () => toggleMilestone(milestone);
        card.addEventListener('click', open);
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                open();
            }
        });

        milestone.appendChild(rail);
        milestone.appendChild(cardWrap);
        container.appendChild(milestone);
    });

    initHistoryScrollAnimations();
    scheduleTimelineLineUpdate();
}

function showTimelineLoading() {
    const container = document.getElementById('history-timeline');
    if (!container) return;
    container.innerHTML = `
        <div class="history-timeline__loading">
            <h3>Loading timeline...</h3>
            <p>Please wait while TerraLink history entries are loaded.</p>
        </div>
    `;
}

async function loadHistoryTimeline() {
    showTimelineLoading();

    const TIMELINE_QUERY = `*[_type == "timeline"] | order(eventDate asc) {
        title,
        description,
        eventDate,
        keyMetric,
        category,
        mainImage
    }`;

    try {
        const sanity = window.terralinkSanity;
        if (!sanity?.client) {
            renderHistoryTimeline(FALLBACK_TIMELINE);
            return;
        }

        const timelineEntries = await sanity.client.fetch(TIMELINE_QUERY);
        if (Array.isArray(timelineEntries) && timelineEntries.length > 0) {
            renderHistoryTimeline(timelineEntries);
            return;
        }
        renderHistoryTimeline(FALLBACK_TIMELINE);
    } catch (error) {
        console.error('Failed to fetch history timeline data:', error);
        renderHistoryTimeline(FALLBACK_TIMELINE);
    }
}

window.addEventListener('DOMContentLoaded', loadHistoryTimeline);
