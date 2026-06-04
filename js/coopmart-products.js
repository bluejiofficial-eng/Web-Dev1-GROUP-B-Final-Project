// CoopMart product preview and detail behavior for category pages
(function () {
    const previewSection = document.getElementById('product-preview');
    const detailSection = document.getElementById('product-detail');
    const heroBadge = document.querySelector('.hero-content .badge');
    const heroHeading = document.querySelector('.hero-content h1');
    const heroCopy = document.querySelector('.hero-content p');
    const pageTitle = document.querySelector('title');

    const previewElements = {
        title: document.getElementById('preview-title'),
        summary: document.getElementById('preview-summary'),
        name: document.getElementById('preview-product-name'),
        price: document.getElementById('preview-price'),
        description: document.getElementById('preview-description'),
        category: document.getElementById('preview-category'),
        origin: document.getElementById('preview-origin'),
        weight: document.getElementById('preview-weight'),
        availability: document.getElementById('preview-availability'),
        storage: document.getElementById('preview-storage'),
        features: document.getElementById('preview-features'),
        image: document.getElementById('preview-image')
    };
    const detailElements = {
        title: document.getElementById('detail-title'),
        summary: document.getElementById('detail-summary'),
        name: document.getElementById('detail-product-name'),
        price: document.getElementById('detail-price'),
        description: document.getElementById('detail-description'),
        category: document.getElementById('detail-category'),
        origin: document.getElementById('detail-origin'),
        weight: document.getElementById('detail-weight'),
        availability: document.getElementById('detail-availability'),
        storage: document.getElementById('detail-storage'),
        features: document.getElementById('detail-features'),
        image: document.getElementById('detail-image')
    };

    const productDetails = {
        'seasonal-vegetable-basket': {
            title: 'Seasonal Vegetable Basket',
            summary: 'Fresh farm produce packed for everyday family meals.',
            category: 'Fresh Produce',
            price: '₱280',
            description: 'A curated basket of leafy greens, root vegetables, and salad favorites sourced from partner farms within 24 hours of harvest.',
            origin: 'Local partner farms',
            weight: '2 kg basket',
            availability: 'Available for pickup and delivery',
            storage: 'Refrigerate and use within 4 days',
            features: ['Rich in vitamins A and C', 'Ready to roast, steam or sauté', 'Perfect for healthy weekly meal planning'],
            imageClass: 'product-img-5'
        },
        'organic-fruit-pack': {
            title: 'Organic Fruit Pack',
            summary: 'A lively fruit selection for snacks, juices and desserts.',
            category: 'Fresh Produce',
            price: '₱320',
            description: 'A mix of seasonal fruits harvested by community growers. Bright, sweet, and ideal for breakfast, smoothies, or family snacks.',
            origin: 'Community growers',
            weight: '3 kg pack',
            availability: 'Available while seasonal stocks last',
            storage: 'Keep cool and consume within 5 days',
            features: ['Sun-ripened for natural sweetness', 'Includes mangoes, bananas, and citrus', 'Excellent source of dietary fiber'],
            imageClass: 'product-img-6'
        },
        'herb-garden-bundle': {
            title: 'Herb Garden Bundle',
            summary: 'Fresh herbs to brighten every dish and beverage.',
            category: 'Fresh Produce',
            price: '₱180',
            description: 'A fragrant collection of basil, lemongrass, and mint grown by our cooperative farmers, ready to enhance soups, sauces, and teas.',
            origin: 'Local herb growers',
            weight: '350 g bundle',
            availability: 'Ready for same-day pickup',
            storage: 'Store in water or wrapped in damp cloth',
            features: ['Adds fresh flavor to every meal', 'Suitable for cooking and herbal drinks', 'Aromatic and pesticide-free'],
            imageClass: 'product-img-7'
        },
        'premium-rice-5kg': {
            title: 'Premium Rice 5kg',
            summary: 'A full bag of fragrant, locally milled rice.',
            category: 'Local Staples',
            price: '₱420',
            description: 'Golden rice produced by cooperative members. The grain cooks fluffy, holds texture well, and brings a naturally sweet aroma to the table.',
            origin: 'Member rice farms',
            weight: '5 kg',
            availability: 'Available for delivery',
            storage: 'Store in a cool dry place',
            features: ['Naturally fragrant grain', 'Perfect for daily family meals', 'Non-GMO and locally grown'],
            imageClass: 'product-img-6'
        },
        'virgin-coconut-oil': {
            title: 'Virgin Coconut Oil',
            summary: 'A pure, cold-pressed coconut oil for kitchen and skin.',
            category: 'Local Staples',
            price: '₱260',
            description: 'Extracted from fresh coconuts and minimally processed to preserve flavor, nutrients, and natural benefits for cooking and personal care.',
            origin: 'Local coconut farms',
            weight: '500 ml bottle',
            availability: 'In stock now',
            storage: 'Keep in a cool dry place',
            features: ['Cold-pressed for freshness', 'Ideal for sautéing, baking, and skin care', 'No additives or preservatives'],
            imageClass: 'product-img-7'
        },
        'cassava-flour': {
            title: 'Cassava Flour',
            summary: 'Gluten-free flour made from locally harvested cassava.',
            category: 'Local Staples',
            price: '₱150',
            description: 'Fine-textured flour crafted from freshly peeled cassava. Great for baking, pancakes, and traditional recipes with a naturally sweet finish.',
            origin: 'Local cassava producers',
            weight: '1 kg bag',
            availability: 'Ready for dispatch',
            storage: 'Keep sealed in a dry place',
            features: ['Gluten-free and light', 'Excellent for baking and cooking', 'Sustainably sourced'],
            imageClass: 'product-img-8'
        },
        'handmade-soap-set': {
            title: 'Handmade Soap Set',
            summary: 'Gentle soaps made with local botanicals.',
            category: 'Eco Goods',
            price: '₱120',
            description: 'A set of artisan soaps crafted from coconut oil, herbs, and natural scents. Designed to nourish skin while reducing plastic packaging waste.',
            origin: 'Cooperative artisans',
            weight: '4 bars',
            availability: 'Limited batch release',
            storage: 'Store in a dry place between uses',
            features: ['Pesticide-free botanical ingredients', 'Ideal for sensitive skin', 'Comes in recyclable packaging'],
            imageClass: 'product-img-3'
        },
        'bamboo-toothbrush-pack': {
            title: 'Bamboo Toothbrush Pack',
            summary: 'Eco-friendly toothbrushes with biodegradable handles.',
            category: 'Eco Goods',
            price: '₱95',
            description: 'A two-pack of soft-bristle toothbrushes made with responsibly harvested bamboo. A sustainable swap for plastic tubes and a cleaner daily routine.',
            origin: 'Sustainable suppliers',
            weight: '2 brushes',
            availability: 'In stock',
            storage: 'Store dry after use',
            features: ['Biodegradable handle', 'Soft bristles for gentle cleaning', 'Packaged in recycled materials'],
            imageClass: 'product-img-8'
        },
        'reusable-produce-bags': {
            title: 'Reusable Produce Bags',
            summary: 'Washable bags built to replace plastic produce packaging.',
            category: 'Eco Goods',
            price: '₱140',
            description: 'A set of mesh bags designed to carry fruits, vegetables and bulk groceries. These breathable bags are machine washable and built for repeated use.',
            origin: 'Sustainable textile makers',
            weight: '4 bags',
            availability: 'Generally available',
            storage: 'Air dry after washing',
            features: ['Washable and reusable', 'Breathable mesh for produce', 'Reduces single-use plastic waste'],
            imageClass: 'product-img-9'
        },
        'beeswax-wrap-set': {
            title: 'Beeswax Wrap Set',
            summary: 'Reusable food wraps made from beeswax and cotton.',
            category: 'Eco Goods',
            price: '₱220',
            description: 'A set of three reusable wraps ideal for covering bowls, wrapping snacks, and keeping food fresh without plastic. Made with sustainably sourced beeswax and organic cotton.',
            origin: 'Local coop makers',
            weight: '3-wrap set',
            availability: 'Stock may vary',
            storage: 'Wash with cool water only',
            features: ['Zero-waste food storage', 'Reusable and naturally scented', 'Works for sandwiches, produce, and leftovers'],
            imageClass: 'product-img-10'
        }
    };

    let activeProductId = null;

    function renderProductSection(product, targetElements) {
        targetElements.name.textContent = product.title;
        targetElements.price.textContent = `Member price: ${product.price}`;
        targetElements.description.textContent = product.description;
        targetElements.category.textContent = product.category;
        targetElements.origin.textContent = product.origin;
        targetElements.weight.textContent = product.weight;
        targetElements.availability.textContent = product.availability;
        targetElements.storage.textContent = product.storage;
        targetElements.features.innerHTML = product.features.map(feature => `<p>• ${feature}</p>`).join('');
        targetElements.image.className = `product-img ${product.imageClass || 'product-img-1'}`;
    }

    function openProductDetail(productId) {
        const product = productDetails[productId];
        if (!product) return;
        activeProductId = productId;
        previewSection.classList.add('page-section-hidden');
        detailSection.classList.remove('page-section-hidden');

        heroBadge.textContent = product.category;
        heroHeading.textContent = product.title;
        heroCopy.textContent = product.description;
        pageTitle.textContent = `TerraLink | CoopMart — ${product.title}`;

        detailElements.title.textContent = product.title;
        detailElements.summary.textContent = product.summary;
        renderProductSection(product, detailElements);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openProductPreview(productId) {
        const product = productDetails[productId];
        if (!product) return;
        activeProductId = productId;
        previewSection.classList.remove('page-section-hidden');
        detailSection.classList.add('page-section-hidden');

        heroBadge.textContent = product.category;
        heroHeading.textContent = product.title;
        heroCopy.textContent = product.summary;
        pageTitle.textContent = `TerraLink | CoopMart — ${product.title}`;

        previewElements.title.textContent = product.title;
        previewElements.summary.textContent = product.summary;
        renderProductSection(product, previewElements);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function returnToCategory() {
        previewSection.classList.add('page-section-hidden');
        detailSection.classList.add('page-section-hidden');
        if (heroBadge) heroBadge.textContent = document.querySelector('.hero-section .badge')?.textContent || 'CoopMart';
        if (heroHeading) heroHeading.textContent = document.querySelector('.hero-section h1')?.textContent || 'CoopMart Marketplace';
        if (heroCopy) heroCopy.textContent = document.querySelector('.hero-section p')?.textContent || '';
        if (pageTitle) pageTitle.textContent = document.title;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function initProductCards() {
        const productCards = document.querySelectorAll('.product-card[data-product-id]');
        productCards.forEach(card => {
            const productId = card.dataset.productId;
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.addEventListener('click', () => openProductPreview(productId));
            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openProductPreview(productId);
                }
            });
        });
    }

    window.addEventListener('DOMContentLoaded', () => {
        document.getElementById('preview-back')?.addEventListener('click', returnToCategory);
        document.getElementById('preview-open-detail')?.addEventListener('click', () => {
            if (activeProductId) openProductDetail(activeProductId);
        });
        document.getElementById('detail-back')?.addEventListener('click', returnToCategory);
        initProductCards();
    });
})();
