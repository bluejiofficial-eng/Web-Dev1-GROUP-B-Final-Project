/**
 * Shared TerraLink loans page logic (regular + special).
 * Expects: body[data-loan-category="regular"|"special"]
 */
(function () {
    const { createClient } = globalThis.SanityClient;
    const loanCategory = document.body.dataset.loanCategory || "regular";

    const client = createClient({
        projectId: "ltk0qh4a",
        dataset: "production",
        apiVersion: "2024-01-01",
        useCdn: true,
    });

    const LOANS_QUERY = `*[_type == "loan" && loanCategory == $loanCategory]{
        title, category, loanCategory, interestRate, maxTerm, marketingDescription, availability, requirements
    } | order(category asc, title asc)`;

    const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{ address, emails }`;

    const CATEGORY_LABELS = {
        "home-better-living": "Home & Better Living",
        "growth-legacy": "Growth & Legacy",
        "health-compassion": "Health & Compassion",
        "business-financial-freedom": "Business & Financial Freedom",
        "milestones-memories": "Milestones & Memories",
        "member-reliability": "Member Reliability",
    };

    const ICONS = {
        application: "../Images/assets/application%20icon.png",
        clipboard: "../Images/assets/clipbaord%20icon.png",
        compassion: "../Images/assets/compassion%20icon.png",
        graph: "../Images/assets/graph%20icon.png",
        handshake: "../Images/assets/handshake%20icon.png",
        health: "../Images/assets/health%20icon.png",
        home: "../Images/assets/house%20icon.png",
        milestone: "../Images/assets/milestone%20icon.png",
        phone: "../Images/assets/phone%20icon.png",
        assistant: "../Images/assets/virtual%20assistant%20icon.png",
    };

    const CATEGORY_ICONS = {
        "home-better-living": ICONS.home,
        "growth-legacy": ICONS.milestone,
        "health-compassion": ICONS.health,
        "business-financial-freedom": ICONS.graph,
        "milestones-memories": ICONS.milestone,
        "member-reliability": ICONS.compassion,
    };

    const TYPE_LABEL = loanCategory === "special" ? "special" : "regular";

    let allLoans = [];
    let activeCategory = "all";

    const loansGrid = document.getElementById("loans-grid");
    const filtersEl = document.getElementById("category-filters");
    const countEl = document.getElementById("loans-count");

    function getCategoryLabel(value) {
        return CATEGORY_LABELS[value] || value || "General";
    }

    function getCategoryIcon(value) {
        return CATEGORY_ICONS[value] || ICONS.application;
    }

    function createIconImage(src, className) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        img.setAttribute("aria-hidden", "true");
        if (className) img.className = className;
        return img;
    }

    function displayField(value) {
        return value ? String(value) : "—";
    }

    function updateCount(visible) {
        if (!countEl) return;
        const total = allLoans.length;
        const showing = visible !== undefined ? visible : total;
        if (total === 0) {
            countEl.textContent = "0 products";
            return;
        }
        countEl.textContent =
            showing === total
                ? `${total} product${total === 1 ? "" : "s"}`
                : `Showing ${showing} of ${total}`;
    }

    function buildRequirementsContent(requirements) {
        const wrap = document.createElement("div");
        wrap.className = "loan-req-content";

        if (!Array.isArray(requirements) || requirements.length === 0) {
            wrap.textContent = "Contact our loan desk for the latest eligibility checklist.";
            return wrap;
        }

        const list = document.createElement("ul");
        requirements.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
        });
        wrap.appendChild(list);
        return wrap;
    }

    function renderLoanCard(loan) {
        const card = document.createElement("article");
        card.className = "loan-card";
        card.dataset.category = loan.category || "";

        const header = document.createElement("div");
        header.className = "loan-card-header";

        const top = document.createElement("div");
        top.className = "loan-card-top";

        const icon = document.createElement("span");
        icon.className = "loan-card-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.appendChild(createIconImage(getCategoryIcon(loan.category)));

        const titleWrap = document.createElement("div");
        titleWrap.className = "loan-card-title-wrap";

        const badge = document.createElement("span");
        badge.className = "loan-category-badge";
        badge.textContent = getCategoryLabel(loan.category);

        const title = document.createElement("h4");
        title.textContent = loan.title || "Untitled Loan";

        titleWrap.appendChild(badge);
        titleWrap.appendChild(title);
        top.appendChild(icon);
        top.appendChild(titleWrap);
        header.appendChild(top);
        card.appendChild(header);

        const body = document.createElement("div");
        body.className = "loan-card-body";

        const description = document.createElement("p");
        description.className = "loan-card-desc";
        description.textContent =
            loan.marketingDescription ||
            "Member-focused financing with cooperative terms. Expand for requirements and apply when you're ready.";

        const stats = document.createElement("div");
        stats.className = "loan-stats";

        const rateStat = document.createElement("div");
        rateStat.className = "loan-stat";
        rateStat.innerHTML = `<span class="loan-stat-label">Interest Rate</span><span class="loan-stat-value">${displayField(loan.interestRate)}</span>`;

        const termStat = document.createElement("div");
        termStat.className = "loan-stat";
        termStat.innerHTML = `<span class="loan-stat-label">Max Term</span><span class="loan-stat-value">${displayField(loan.maxTerm)}</span>`;

        stats.appendChild(rateStat);
        stats.appendChild(termStat);
        body.appendChild(description);
        body.appendChild(stats);

        if (loan.availability) {
            const availability = document.createElement("p");
            availability.className = "loan-availability";
            availability.textContent = loan.availability;
            body.appendChild(availability);
        }

        const details = document.createElement("details");
        details.className = "loan-requirements";
        const summary = document.createElement("summary");
        summary.textContent = "View requirements";
        details.appendChild(summary);
        details.appendChild(buildRequirementsContent(loan.requirements));
        body.appendChild(details);
        card.appendChild(body);

        const footer = document.createElement("div");
        footer.className = "loan-card-footer";
        const applyBtn = document.createElement("a");
        applyBtn.href = "../support/support-application.html";
        applyBtn.className = "btn btn-primary";
        applyBtn.textContent = "Start Application";
        footer.appendChild(applyBtn);
        card.appendChild(footer);

        return card;
    }

    function renderStateCard(iconSrc, title, message) {
        const card = document.createElement("article");
        card.className = "loan-card loan-card--state";
        const iconWrap = document.createElement("div");
        iconWrap.className = "service-icon";
        iconWrap.appendChild(createIconImage(iconSrc));

        const heading = document.createElement("h4");
        heading.textContent = title;

        const body = document.createElement("p");
        body.textContent = message;

        card.appendChild(iconWrap);
        card.appendChild(heading);
        card.appendChild(body);
        return card;
    }

    function renderLoans() {
        loansGrid.innerHTML = "";

        const visibleLoans =
            activeCategory === "all"
                ? allLoans
                : allLoans.filter((loan) => loan.category === activeCategory);

        updateCount(visibleLoans.length);

        if (visibleLoans.length === 0) {
            loansGrid.appendChild(
                renderStateCard(
                    ICONS.clipboard,
                    "No loans in this category",
                    `There are no ${TYPE_LABEL} loan products here right now. Try another filter or explore our other loan lineup.`
                )
            );
            return;
        }

        visibleLoans.forEach((loan) => {
            loansGrid.appendChild(renderLoanCard(loan));
        });
    }

    function renderFilters() {
        const categories = [
            ...new Set(allLoans.map((loan) => loan.category).filter(Boolean)),
        ].sort();

        filtersEl.innerHTML = "";
        filtersEl.hidden = false;

        const allBtn = document.createElement("button");
        allBtn.type = "button";
        allBtn.className = "btn btn-primary";
        allBtn.dataset.category = "all";
        allBtn.textContent = "All Categories";
        allBtn.setAttribute("aria-pressed", "true");
        allBtn.setAttribute("aria-label", "Show all loan categories");
        filtersEl.appendChild(allBtn);

        categories.forEach((category) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn btn-secondary";
            btn.dataset.category = category;
            btn.textContent = getCategoryLabel(category);
            btn.setAttribute("aria-pressed", "false");
            btn.setAttribute("aria-label", `Show loans in ${getCategoryLabel(category)}`);
            filtersEl.appendChild(btn);
        });

        filtersEl.querySelectorAll("button").forEach((btn) => {
            btn.addEventListener("click", () => {
                activeCategory = btn.dataset.category;
                filtersEl.querySelectorAll("button").forEach((item) => {
                    const isActive = item.dataset.category === activeCategory;
                    item.classList.toggle("btn-primary", isActive);
                    item.classList.toggle("btn-secondary", !isActive);
                    item.setAttribute("aria-pressed", isActive ? "true" : "false");
                });
                renderLoans();
            });
        });
    }

    function showLoadError() {
        loansGrid.innerHTML = "";
        loansGrid.appendChild(
            renderStateCard(
                ICONS.assistant,
                "Unable to load loans",
                "We could not retrieve loan products at this time. Please refresh the page or try again later."
            )
        );
        updateCount(0);
    }

    async function loadSiteSettings() {
        try {
            const settings = await client.fetch(SETTINGS_QUERY);
            if (settings) {
                const addressEl = document.getElementById("footer-address");
                const emailEl = document.getElementById("footer-email");
                if (addressEl && settings.address) {
                    addressEl.textContent = settings.address;
                }
                if (emailEl && settings.emails && settings.emails.length > 0) {
                    emailEl.textContent = settings.emails[0];
                }
            }
        } catch (err) {
            console.error("Failed to fetch Site Settings:", err);
        }
    }

    async function loadLoans() {
        try {
            const loans = await client.fetch(LOANS_QUERY, { loanCategory });
            allLoans = Array.isArray(loans) ? loans : [];

            if (allLoans.length === 0) {
                loansGrid.innerHTML = "";
                loansGrid.appendChild(
                    renderStateCard(
                        ICONS.clipboard,
                        `No ${TYPE_LABEL} loans yet`,
                        "New programs will appear here once they are published. In the meantime, use the calculator or speak with our loan desk."
                    )
                );
                if (filtersEl) filtersEl.hidden = true;
                updateCount(0);
                return;
            }

            renderFilters();
            renderLoans();
        } catch (err) {
            console.error(`Failed to fetch ${TYPE_LABEL} loans:`, err);
            showLoadError();
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        loadLoans();
        loadSiteSettings();
    });
})();
