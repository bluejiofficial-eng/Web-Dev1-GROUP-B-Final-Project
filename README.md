# TerraLink Cooperative — Shared Development Prompt

> Copy everything between **START PROMPT** and **END PROMPT** and paste it into Cursor.
> Only fill in **Section 8** with your assigned pages.
> Cursor will automatically generate all corresponding HTML files with base code.

---

## Project Folder Structure

```
📁 WEB-DEV1-GROUP-B-FINAL-PROJECT/
 ├── 📁 about/
 │    ├── about-profile.html
 │    ├── about-history.html
 │    ├── about-bod.html
 │    ├── about-officers.html
 │    ├── about-awards.html
 │    └── about-gallery.html
 ├── 📁 loans/
 │    ├── loans-regular.html
 │    └── loans-special.html
 ├── 📁 support/
 │    ├── support-helpdesk.html
 │    ├── support-application.html
 │    └── support-calculator.html
 ├── 📁 js/
 │    └── main.js
 ├── index.html
 ├── membership.html
 ├── investments.html
 ├── coopmart.html
 ├── style.css
 └── README.md
```

> **Note:** Files inside `about/`, `loans/`, and `support/` folders use `../` prefix for all paths.
> Files in the root folder (`membership.html`, `investments.html`, `coopmart.html`) use normal paths.

---

## START PROMPT

You are an expert frontend developer working on **"TerraLink Cooperative"**, a cooperative banking website. Generate new HTML pages that strictly follow our centralized modular project architecture.

For each page in the assigned section, automatically create the corresponding HTML file with the correct filename, base structure, navbar, footer, and script. Apply Sanity integration only if the page requires dynamic data (see Section 6).

---

### 1. Link These Files (Head Section)

**For files inside a subfolder (`about/`, `loans/`, `support/`):**
```html
<link rel="stylesheet" href="../style.css">
<script src="https://unpkg.com/@sanity/client@6/umd/sanityClient.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@sanity/image-url@1.0.2/lib/browser/image-url.umd.js"></script>
```

**For files in the root folder (`membership.html`, `investments.html`, `coopmart.html`):**
```html
<link rel="stylesheet" href="style.css">
<script src="https://unpkg.com/@sanity/client@6/umd/sanityClient.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@sanity/image-url@1.0.2/lib/browser/image-url.umd.js"></script>
```

---

### 2. Copy This Navbar Exactly

**For files inside a subfolder (`about/`, `loans/`, `support/`):**
```html
<header class="navbar">
    <div class="container nav-container">
        <a href="../index.html" class="logo">
            <span class="logo-green">Terra</span><span class="logo-text">Link</span>
        </a>
        <button class="hamburger" id="hamburger" aria-label="Toggle navigation menu">
            <span></span><span></span><span></span>
        </button>
        <nav class="nav-menu" id="nav-menu">
            <div class="dropdown">
                <a href="#" class="nav-link">About Us</a>
                <div class="dropdown-content">
                    <a href="../about/about-profile.html">Company Profile</a>
                    <a href="../about/about-history.html">History & Timeline</a>
                    <a href="../about/about-bod.html">BOD & Officers</a>
                    <a href="../about/about-officers.html">Corporate Officers</a>
                    <a href="../about/about-awards.html">Awards & Distinction</a>
                    <a href="../about/about-gallery.html">Event Gallery</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="../membership.html" class="nav-link">Membership</a>
            </div>
            <div class="dropdown">
                <a href="../loans/loans-regular.html" class="nav-link">Loans</a>
                <div class="dropdown-content">
                    <a href="../loans/loans-regular.html">Regular Loan</a>
                    <a href="../loans/loans-special.html">Special Loan</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="../investments.html" class="nav-link">Investments</a>
            </div>
            <div class="dropdown">
                <a href="../coopmart.html" class="nav-link">CoopMart</a>
            </div>
            <div class="dropdown">
                <a href="#" class="nav-link">Support</a>
                <div class="dropdown-content">
                    <a href="../support/support-helpdesk.html">Help Desk (FAQ)</a>
                    <a href="../support/support-calculator.html">Loan Calculator</a>
                    <a href="../support/support-application.html">Online Application</a>
                </div>
            </div>
        </nav>
    </div>
</header>
```

**For files in the root folder (`membership.html`, `investments.html`, `coopmart.html`):**
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
                    <a href="about/about-profile.html">Company Profile</a>
                    <a href="about/about-history.html">History & Timeline</a>
                    <a href="about/about-bod.html">BOD & Officers</a>
                    <a href="about/about-officers.html">Corporate Officers</a>
                    <a href="about/about-awards.html">Awards & Distinction</a>
                    <a href="about/about-gallery.html">Event Gallery</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="membership.html" class="nav-link">Membership</a>
            </div>
            <div class="dropdown">
                <a href="loans/loans-regular.html" class="nav-link">Loans</a>
                <div class="dropdown-content">
                    <a href="loans/loans-regular.html">Regular Loan</a>
                    <a href="loans/loans-special.html">Special Loan</a>
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
                    <a href="support/support-helpdesk.html">Help Desk (FAQ)</a>
                    <a href="support/support-calculator.html">Loan Calculator</a>
                    <a href="support/support-application.html">Online Application</a>
                </div>
            </div>
        </nav>
    </div>
</header>
```

---

### 3. Copy This Footer Exactly

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
                <li><a href="about/about-profile.html">About Cooperative</a></li>
                <li><a href="membership.html">Membership Qualifications</a></li>
                <li><a href="loans/loans-regular.html">Loan Products</a></li>
                <li><a href="support/support-calculator.html">Amortization Calculator</a></li>
            </ul>
        </div>
        <div class="footer-links">
            <h5>Services</h5>
            <ul>
                <li><a href="investments.html">Investment Dividends</a></li>
                <li><a href="coopmart.html">CoopMart Stores</a></li>
                <li><a href="support/support-helpdesk.html">Help Desk & FAQ</a></li>
                <li><a href="support/support-application.html">Online Membership</a></li>
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

> **Note:** Footer links above are written for root-level files. For subfolder files, add `../` prefix to all href values.

---

### 4. Copy This Script Exactly (Before `</body>`)

**For files inside a subfolder (`about/`, `loans/`, `support/`):**
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
<script src="../js/main.js"></script>
```

**For files in the root folder:**
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

### 5. Available Classes (from style.css)

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

### 6. Sanity CMS Integration

If your page requires dynamic data, use the setup below.
**Sanity Project ID:** `ltk0qh4a`

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

**Available document types and query examples:**

| Page | Document Type | Query |
| :--- | :--- | :--- |
| `about-profile.html` | `aboutUs` | `*[_type == "aboutUs"][0]` |
| `about-history.html` | `timeline` | `*[_type == "timeline"] \| order(eventDate asc)` |
| `about-bod.html` | `director` | `*[_type == "director"]` |
| `about-officers.html` | `director` | `*[_type == "director"]` |
| `loans-regular.html` | `loan` | `*[_type == "loan" && loanCategory == "regular"]` |
| `loans-special.html` | `loan` | `*[_type == "loan" && loanCategory == "special"]` |
| `coopmart.html` | `hero` | `*[_type == "hero" && title match "Cooperative Mart"][0]` |

**Available fields per document type:**

| Document Type | Fields |
| :--- | :--- |
| `hero` | `title`, `subtitle`, `ctaLabel`, `backgroundImage` |
| `loan` | `title`, `category`, `loanCategory`, `interestRate`, `maxTerm`, `marketingDescription`, `availability` |
| `director` | `name`, `role` |
| `timeline` | `title`, `description`, `eventDate`, `keyMetric`, `category`, `mainImage` |
| `aboutUs` | `vision`, `history` |
| `siteSettings` | `address`, `emails` |

> Always wrap fetch calls in `async/await` with `try/catch` for error handling.

---

### 7. Core System Requirements

- Do **not** write any additional media queries. `style.css` already includes all responsive breakpoints (768px / 480px).
- No custom inline styles or overriding stylesheet declarations allowed.
- Ensure grid items use existing classes `.grid-3` / `.grid-4` only.
- Keep all code comments in English.
- Follow the folder structure strictly. Files must be placed in their correct folder.

---

### 8. ⬇️ Page Request (Only fill this part in)

Below is the full page directory. **Only change the `Assigned pages` field** to your assigned section. Cursor will automatically generate all corresponding HTML files with base code, correct filenames, navbar, footer, and Sanity integration where needed.

**Full Page Directory:**

| Section | Folder | Filenames |
| :--- | :--- | :--- |
| About Us | `about/` | `about-profile.html`, `about-history.html`, `about-bod.html`, `about-officers.html`, `about-awards.html`, `about-gallery.html` |
| Membership | root | `membership.html` |
| Loans | `loans/` | `loans-regular.html`, `loans-special.html` |
| Investments | root | `investments.html` |
| CoopMart | root | `coopmart.html` |
| Support | `support/` | `support-helpdesk.html`, `support-application.html`, `support-calculator.html` |

```
Assigned pages: [e.g., About Us / Loans / Support]
```

## END PROMPT

---

## File Name Reference

| Page | Folder | Filename |
| :--- | :--- | :--- |
| Home | root | `index.html` |
| About Us - Company Profile | `about/` | `about-profile.html` |
| About Us - History & Timeline | `about/` | `about-history.html` |
| About Us - BOD & Officers | `about/` | `about-bod.html` |
| About Us - Corporate Officers | `about/` | `about-officers.html` |
| About Us - Awards and Distinction | `about/` | `about-awards.html` |
| About Us - Event Gallery | `about/` | `about-gallery.html` |
| Membership | root | `membership.html` |
| Investments | root | `investments.html` |
| Loans - Regular Loan | `loans/` | `loans-regular.html` |
| Loans - Special Loan | `loans/` | `loans-special.html` |
| CoopMart | root | `coopmart.html` |
| Support - Help Desk | `support/` | `support-helpdesk.html` |
| Support - Online Membership Application | `support/` | `support-application.html` |
| Support - Loan Calculator | `support/` | `support-calculator.html` |

---

## Sanity DB Data Structure

| Type (Table) | Fields | Count |
| :--- | :--- | :--- |
| `hero` | `title`, `subtitle`, `ctaLabel`, `backgroundImage` | 4 |
| `loan` | `title`, `category`, `loanCategory`, `interestRate`, `maxTerm`, `marketingDescription`, `availability` | 18 |
| `director` | `name`, `role` | 9 |
| `timeline` | `title`, `description`, `eventDate`, `keyMetric`, `category`, `mainImage` | 8 |
| `aboutUs` | `vision`, `history (portable text)` | 1 |
| `siteSettings` | `address`, `emails` | 1 |

> To inspect the DB directly, open this URL in your browser and replace `loan` with any document type:
> ```
> https://ltk0qh4a.api.sanity.io/v2024-01-01/data/query/production?query=*[_type=="loan"][0]
> ```
