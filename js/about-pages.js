// ============================================================
// TerraLink — About Us page interactions (gallery slideshow)
// ============================================================

const GALLERY_SLIDES = [
    {
        tag: 'Annual Meeting',
        title: 'Annual General Assembly 2026',
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=80',
        description: 'Members gathered for democratic voting, financial transparency review, and cooperative policy updates. Officers presented the annual report and recognized outstanding member contributions.',
        date: 'May 15, 2026'
    },
    {
        tag: 'Outreach',
        title: 'Community Outreach Program',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=80',
        description: 'TerraLink volunteers partnered with local groups to distribute relief supplies and financial literacy materials to families in underserved barangays.',
        date: 'April 22, 2026'
    },
    {
        tag: 'Training',
        title: 'Financial Literacy Workshop',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
        description: 'Members attended sessions on savings habits, loan literacy, and cooperative governance led by TerraLink education officers and guest facilitators.',
        date: 'March 10, 2026'
    },
    {
        tag: 'CoopMart',
        title: 'CoopMart Local Producer Fair',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80',
        description: 'Partner farmers and artisans showcased organic produce and handmade goods at the CoopMart branch, strengthening the cooperative supply chain.',
        date: 'February 18, 2026'
    },
    {
        tag: 'Eco Drive',
        title: 'TerraLink Tree Planting Eco-Drive',
        image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1400&q=80',
        description: 'Officers and member families planted native seedlings along the watershed area as part of TerraLink\'s sustainability and community greening initiative.',
        date: 'January 25, 2026'
    },
    {
        tag: 'Membership',
        title: 'New Member Orientation Batch 2026',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
        description: 'Newly accepted members completed orientation covering share capital, member rights, loan products, and cooperative principles before receiving their IDs.',
        date: 'January 8, 2026'
    }
];

let galleryIndex = 0;
let galleryTimer = null;
const GALLERY_SLIDE_MS = 6000;

function createGalleryModal() {
    const existing = document.getElementById('gallery-modal');
    if (existing && existing.querySelector('.modal-split')) return;
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'gallery-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-box modal-box--split">
            <button class="modal-close" id="gallery-modal-close" type="button" aria-label="Close">&times;</button>
            <div class="modal-split">
                <div class="modal-split__media" id="gallery-modal-img" role="img" aria-hidden="true"></div>
                <div class="modal-split__body modal-body">
                    <span class="news-tag" id="gallery-modal-tag"></span>
                    <h3 id="gallery-modal-title"></h3>
                    <p id="gallery-modal-desc"></p>
                    <span class="news-date" id="gallery-modal-date"></span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('gallery-modal-close').addEventListener('click', closeGalleryModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeGalleryModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeGalleryModal();
    });
}

function openGalleryModal(slide) {
    document.getElementById('gallery-modal-img').style.backgroundImage = `url('${slide.image}')`;
    document.getElementById('gallery-modal-tag').textContent = slide.tag;
    document.getElementById('gallery-modal-title').textContent = slide.title;
    document.getElementById('gallery-modal-desc').textContent = slide.description;
    document.getElementById('gallery-modal-date').textContent = `Date taken: ${slide.date}`;
    document.getElementById('gallery-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function buildGallerySlideshow() {
    const track = document.getElementById('gallery-slideshow-track');
    if (!track) return;

    createGalleryModal();
    track.innerHTML = '';

    GALLERY_SLIDES.forEach((slide, index) => {
        const el = document.createElement('div');
        el.className = `gallery-slide${index === 0 ? ' active' : ''}`;
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-label', `View details: ${slide.title}`);
        el.innerHTML = `
            <div class="gallery-slide__zoom" style="background-image: url('${slide.image}')"></div>
            <span class="gallery-slide__tag">${slide.tag}</span>
            <div class="gallery-slide__overlay"></div>
            <h3 class="gallery-slide__title">${slide.title}</h3>
        `;
        el.addEventListener('click', () => openGalleryModal(slide));
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openGalleryModal(slide);
            }
        });
        track.appendChild(el);
    });

    const thumbs = document.getElementById('gallery-thumbs');
    if (thumbs) {
        thumbs.innerHTML = '';
        GALLERY_SLIDES.forEach((slide, index) => {
            const thumb = document.createElement('button');
            thumb.type = 'button';
            thumb.className = `gallery-thumb${index === 0 ? ' active' : ''}`;
            thumb.style.backgroundImage = `url('${slide.image}')`;
            thumb.setAttribute('aria-label', `Go to slide ${index + 1}`);
            thumb.addEventListener('click', () => goToGallerySlide(index));
            thumbs.appendChild(thumb);
        });
    }

    const prev = document.getElementById('gallery-prev');
    const next = document.getElementById('gallery-next');
    if (prev) prev.addEventListener('click', () => goToGallerySlide(galleryIndex - 1));
    if (next) next.addEventListener('click', () => goToGallerySlide(galleryIndex + 1));

    restartGallerySlideZoom(document.querySelector('.gallery-slide.active'));
    resetGalleryAutoplay();
}

function restartGallerySlideZoom(slide) {
    if (!slide) return;
    const zoom = slide.querySelector('.gallery-slide__zoom');
    if (!zoom) return;
    zoom.style.animation = 'none';
    void zoom.offsetWidth;
    zoom.style.animation = '';
}

function goToGallerySlide(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    const thumbs = document.querySelectorAll('.gallery-thumb');
    const dots = document.querySelectorAll('.gallery-dot');
    const total = slides.length;
    if (total === 0) return;

    galleryIndex = (index + total) % total;

    slides.forEach((s, i) => s.classList.toggle('active', i === galleryIndex));
    thumbs.forEach((t, i) => t.classList.toggle('active', i === galleryIndex));
    dots.forEach((d, i) => d.classList.toggle('active', i === galleryIndex));

    restartGallerySlideZoom(slides[galleryIndex]);
    resetGalleryAutoplay();
}

function resetGalleryAutoplay() {
    clearInterval(galleryTimer);
    galleryTimer = setInterval(() => goToGallerySlide(galleryIndex + 1), GALLERY_SLIDE_MS);
}

function buildGalleryDots() {
    const dotsWrap = document.getElementById('gallery-dots');
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    GALLERY_SLIDES.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `gallery-dot${index === 0 ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Slide ${index + 1}`);
        dot.addEventListener('click', () => goToGallerySlide(index));
        dotsWrap.appendChild(dot);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    buildGallerySlideshow();
    buildGalleryDots();
});
