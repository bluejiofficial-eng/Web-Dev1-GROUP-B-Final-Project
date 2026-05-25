# Prompt for creating new pages 

 here's the shared prompt for creating new pages on our website. Every time you need to make a new page, just copy and paste the entire prompt into the AI. 
 The only part you need to change is Section 7 at the bottom — fill in your page filename, title, nav item, and a short description of the content. 
 Sections 1–6 are fixed, so don't touch them. 

<br>

## Start prompt(copy the prompt until the 'End prompt')

You are an expert frontend developer working on "TerraLink Cooperative", a cooperative banking website. Generate a new HTML page that strictly follows our centralized modular project architecture.

## 1. Link These External & Centralized Modular Files (Head Section)

```html
<link rel="stylesheet" href="style.css">
<script src="https://unpkg.com/@sanity/client@6/umd/sanityClient.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@sanity/image-url@1.0.2/lib/browser/image-url.umd.js"></script>
```
---

## 2. Copy This Navbar Exactly

```html
<header class="navbar">
    <div class="container nav-container">
        <a href="index.html" class="logo">
            <span class="logo-green">Terra</span><span class="logo-text">Link</span>
        </a>
        <button class="hamburger" id="hamburger" aria-label="Toggle navigation menu">
            <span></span><span></span><span></span>
        </button>
        <nav class="nav-menu" id="nav-menu">
            <div class="dropdown">
                <a href="#" class="nav-link">About Us</a>
                <div class="dropdown-content">
                    <a href="about-profile.html">Company Profile</a>
                    <a href="about-history.html">History & Timeline</a>
                    <a href="about-bod.html">BOD & Officers</a>
                    <a href="about-officers.html">Corporate Officers</a>
                    <a href="about-awards.html">Awards & Distinction</a>
                    <a href="about-gallery.html">Event Gallery</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="membership.html" class="nav-link">Membership</a>
            </div>
            <div class="dropdown">
                <a href="loans-regular.html" class="nav-link">Loans</a>
                <div class="dropdown-content">
                    <a href="loans-regular.html">Regular Loan</a>
                    <a href="loans-special.html">Special Loan</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="investments.html" class="nav-link">Investments</a>
            </div>
            <div class="dropdown">
                <a href="coopmart.html" class="nav-link">CoopMart</a>
            </div>
            <div class="dropdown">
                <a href="#" class="nav-link">Support</a>
                <div class="dropdown-content">
                    <a href="support-helpdesk.html">Help Desk (FAQ)</a>
                    <a href="support-calculator.html">Loan Calculator</a>
                    <a href="support-application.html">Online Application</a>
                </div>
            </div>
        </nav>
    </div>
</header>
```

---
## 3. Copy This Footer Exactly
```html
<footer class="footer">
    <div class="container grid-4">
        <div class="footer-about">
            <h4>TerraLink</h4>
            <p id="footer-about-text"></p>
        </div>
        <div class="footer-links">
            <h5>Quick Links</h5>
            <ul>
                <li><a href="about-profile.html">About Cooperative</a></li>
                <li><a href="membership.html">Membership Qualifications</a></li>
                <li><a href="loans-regular.html">Loan Products</a></li>
                <li><a href="support-calculator.html">Amortization Calculator</a></li>
            </ul>
        </div>
        <div class="footer-links">
            <h5>Services</h5>
            <ul>
                <li><a href="investments.html">Investment Dividends</a></li>
                <li><a href="coopmart.html">CoopMart Stores</a></li>
                <li><a href="support-helpdesk.html">Help Desk & FAQ</a></li>
                <li><a href="support-application.html">Online Membership</a></li>
            </ul>
        </div>
        <div class="footer-contact">
            <h5>Contact Info</h5>
            <p id="footer-address"></p>
            <p id="footer-email"></p>
            <p>📞 +63 (32) 230-0100</p>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="container">
            <p>&copy; 2026 TerraLink Cooperative. All Rights Reserved. Designed by Group B.</p>
        </div>
    </div>
</footer>
```

---

## 4. Copy This Script Exactly (Before `</body>`)

```html
<script>
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('nav-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
</script>
<script src="js/main.js"></script>
```
---
## 5. Available Classes (from style.css)

| Purpose | Class |
| :--- | :--- |
| Center layout wrapper | `.container` |
| 3-column grid | `.grid-3` |
| 4-column grid | `.grid-4` |
| Section title block | `.section-header` + `<h2>` + `<p>` |
| Highlight card | `.highlight-card` + `.icon-box` |
| Service card | `.service-box` + `.service-icon` |
| News card | `.news-card` + `.news-img` + `.news-body` + `.news-tag` |
| Buttons | `.btn.btn-primary` / `.btn.btn-secondary` |
| Tag / Badge | `.badge` / `.news-tag` |
| Text link | `.text-link` |


---
## 6. Sanity CMS Integration
If your page requires dynamic data, use the setup below. Sanity Project ID: **ltk0qh4a**


```javascript
const { createClient } = globalThis.SanityClient;
const client = createClient({
    projectId: "ltk0qh4a",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: true,
});
const builder = globalThis.SanityImageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

```
Available document types and their query examples:

| Page | Document Type | Query |
| :--- | :--- | :--- |
| `about-profile.html` | `aboutUs` | `*[_type == "aboutUs"][0]` |
| `about-history.html` | `timeline` | `*[_type == "timeline"] \| order(eventDate asc)` |
| `about-bod.html` | `director` | `*[_type == "director"]` |
| `about-officers.html` | `director` | `*[_type == "director"]` |
| `loans-regular.html` | `loan` | `*[_type == "loan" && loanCategory == "regular"]` |
| `loans-special.html` | `loan` | `*[_type == "loan" && loanCategory == "special"]` |
| `coopmart.html` | `hero` | `*[_type == "hero" && title match "Cooperative Mart"][0]` |


Available fields per document type:

- hero → title, subtitle, ctaLabel, backgroundImage
- loan → title, category, loanCategory, interestRate, maxTerm, marketingDescription, availability
- director → name, role
- timeline → title, description, eventDate, keyMetric, category, mainImage
- aboutUs → vision, history

Always wrap fetch calls in *async/await* with *try/catch* for error handling.

---
## 7. Core System Requirements
- Do not write any additional media queries. style.css already includes all responsive breakpoints (768px / 480px).
- No custom inline styles or overriding stylesheet declarations allowed.
- Ensure grid items use existing classes .grid-3 / .grid-4 only.
- Keep all code comments in English.
---

## 8. ⬇️ Page Request (Only fill this part in)
Page filename: [filename].html Page title: TerraLink Cooperative | **[Page Name]** Active nav item: **[Which navbar item this page belongs to]** Sanity data needed: **[Document type and fields, or "None - static content"]** Page content: **[Describe what this page should contain]**

Sections 1–7 are fixed. Only fill in Section 8 and send it to the AI each time you need a new page.

## End Prompt

<br><br>
---
# File Name
When creating your assigned pages, make sure the filename matches exactly as listed below. This is important so all the navigation links work correctly across the site.
Please double-check your filename before pushing. All files should be placed in the root folder of the project.

| Page | Filename |
| :--- | :--- |
| Home | `index.html` |
| About Us - History | `about-history.html` |
| About Us - Company Profile | `about-profile.html` |
| About Us - BOD | `about-bod.html` |
| About Us - Corporate Officers | `about-officers.html` |
| About Us - Awards and Distinction | `about-awards.html` |
| About Us - Event Gallery | `about-gallery.html` |
| Membership | `membership.html` |
| Investments | `investments.html` |
| Loans - Regular Loan | `loans-regular.html` |
| Loans - Special Loan | `loans-special.html` |
| CoopMart | `coopmart.html` |
| Support - Help Desk | `support-helpdesk.html` |
| Support - Online Membership Application | `support-application.html` |
| Support - Loan Calculator | `support-calculator.html` |



---

# Sanity DB Data Structure
## Data Structure

| Type (Table) | Fields | Count |
| :--- | :--- | :--- |
| `hero` | `title`, `subtitle`, `ctaLabel`, `backgroundImage` | 4 |
| `loan` | `title`, `category`, `loanCategory`, `interestRate`, `maxTerm`, `marketingDescription`, `availability` | 18 |
| `director` | `name`, `role` | 9 |
| `timeline` | `title`, `description`, `eventDate`, `keyMetric`, `category`, `mainImage` | 8 |
| `aboutUs` | `vision`, `history (portable text)` | 1 |
| `siteSettings` | `address`, `emails` | 1 |
