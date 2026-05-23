// Initialize Sanity Client with the professor's live project ID
const SANITY_CONFIG = {
    projectId: "ltk0qh4a", 
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: true,
};

// Extract Sanity client and Image URL builder from global object
const { createClient } = globalThis.SanityClient;
const client = createClient(SANITY_CONFIG);
const builder = globalThis.SanityImageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

/**
 * 2. Fetch and bind Hero Banner data dynamically
 */
async function loadHeroBanner() {
    const HERO_QUERY = `*[_type == "hero" && title match "Stronger Together"][0] {
        title,
        subtitle,
        backgroundImage,
        ctaLabel
    }`;

    try {
        let heroData = await client.fetch(HERO_QUERY);
        
        if (!heroData) {
            const fallbackList = await client.fetch(`*[_type == "hero"] | order(_createdAt asc)`);
            if (fallbackList && fallbackList.length > 0) {
                heroData = fallbackList[2] || fallbackList[0];
            }
        }
        
        if (heroData) {
            const heroSection = document.getElementById('hero-container');
            const heroContent = heroSection.querySelector('.hero-content');

            if (heroData.title) heroContent.querySelector('h1').textContent = heroData.title;
            if (heroData.subtitle) heroContent.querySelector('p').textContent = heroData.subtitle;
            
            if (heroData.ctaLabel) {
                const mainBtn = heroContent.querySelector('.btn-primary');
                if (mainBtn) mainBtn.textContent = heroData.ctaLabel;
            }

            if (heroData.backgroundImage) {
                const imgUrl = urlFor(heroData.backgroundImage).width(1920).height(1080).fit("crop").url();
                heroSection.querySelector('.hero-slide').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${imgUrl}')`;
            }
        }
    } catch (err) {
        console.error("Failed to fetch Hero Banner data:", err);
    }
}

/**
 * 3. Fetch and render 3 latest news articles (post type)
 */
async function loadLatestNews() {
    const NEWS_QUERY = `*[_type == "post"] | order(_createdAt desc)[0...3] {
        title,
        slug,
        _createdAt,
        _updatedAt
    }`;

    try {
        const newsItems = await client.fetch(NEWS_QUERY);
        const newsContainer = document.getElementById('news-container');

        if (newsItems && newsItems.length > 0) {
            newsContainer.innerHTML = "";

            newsItems.forEach((item, index) => {
                const targetDate = item._updatedAt || item._createdAt;
                const formattedDate = new Date(targetDate).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                });

                const categories = ["Announcement", "CoopMart", "Financial"];
                const currentTag = categories[index % categories.length];

                const defaultImages = [
                    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80'
                ];
                const cardImg = defaultImages[index % defaultImages.length];

                const cardHtml = `
                    <article class="news-card">
                        <div class="news-img" style="background-image: url('${cardImg}');"></div>
                        <div class="news-body">
                            <span class="news-tag">${currentTag}</span>
                            <h4>${item.title}</h4>
                            <p>Read the official publication regarding "${item.title}". Documented under routing pathway /${item.slug?.current || 'announcement'}.</p>
                            <span class="news-date">${formattedDate}</span>
                        </div>
                    </article>
                `;
                newsContainer.insertAdjacentHTML('beforeend', cardHtml);
            });
        } else {
            console.log("Sanity returned 0 posts. Keeping the beautiful static fallback UI.");
        }
    } catch (err) {
        console.error("Failed to fetch News data:", err);
    }
}

// Trigger simultaneous fetch operations when HTML DOM ready
window.addEventListener('DOMContentLoaded', () => {
    loadHeroBanner();
    loadLatestNews();
});