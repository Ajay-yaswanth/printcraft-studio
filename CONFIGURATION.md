# PrintCraft Studio - Configuration Guide

Complete setup and customization guide for production deployment.

---

## 🎯 Pre-Launch Configuration

### 1. Contact Information

**File**: `index.html`

Replace all instances of:

```html
<!-- BEFORE -->
<a href="tel:+919999999999">+91 99999 99999</a>
<a href="mailto:hello@printcraftstudio.com">hello@printcraftstudio.com</a>

<!-- AFTER -->
<a href="tel:+91YOUR_PHONE_NUMBER">+91 YOUR PHONE NUMBER</a>
<a href="mailto:your.email@domain.com">your.email@domain.com</a>
```

**Files to Update:**
- `index.html` (multiple locations)
- `js/script.js` (phoneNumber variable)
- `DEPLOYMENT.md` (example sections)

### 2. WhatsApp Integration

**Current Setup**: Form submits to WhatsApp with pre-filled message

**To Configure:**

1. Update phone number in `js/script.js`:
```javascript
const phoneNumber = "919999999999"; // Replace with your number
```

2. Update WhatsApp links in `index.html`:
```html
<!-- Change from -->
href="https://wa.me/919999999999?text=..."

<!-- Change to -->
href="https://wa.me/YOUR_COUNTRY_CODE+YOUR_NUMBER?text=..."
```

**Example International Numbers:**
- India: `+91 9999999999`
- USA: `+1 2125551234`
- UK: `+44 2071838750`
- Australia: `+61 289600256`

### 3. Domain & URLs

**Update canonical URL** in `<head>` of `index.html`:

```html
<link rel="canonical" href="https://printcraftstudio.com/" />
```

Replace `printcraftstudio.com` with your actual domain.

**Update Open Graph image URL:**

```html
<meta property="og:image" content="https://printcraftstudio.com/og-image.jpg" />
```

Upload your Open Graph image and update the path.

### 4. Branding & Colors

**Primary Colors** - Edit in `css/styles.css`:

```css
:root {
  --primary: #111827;      /* Dark navy - main color */
  --accent: #f59e0b;       /* Gold/amber - highlight */
  --background: #ffffff;   /* White - background */
  --text: #1f2937;         /* Dark gray - text */
  --muted: #6b7280;        /* Gray - secondary text */
  /* Update these to match your brand */
}
```

**How to customize:**
1. Open `css/styles.css`
2. Find `:root` at the top
3. Update color values (hex format)
4. Test in browser to ensure good contrast
5. Update `styles.min.css` when ready for production

### 5. Fonts

**Current Font**: Poppins (Google Fonts)

**To Change:**

1. Update the Google Fonts link in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

2. Update CSS font-family:
```css
body {
  font-family: "YourFont", Arial, sans-serif;
}
```

**Popular Alternatives:**
- Inter (modern, readable)
- Roboto (Google, versatile)
- Playfair Display (elegant, serif)
- IBM Plex Sans (professional)

### 6. Images

**Replace placeholder images:**

All images currently use `placehold.co` for demonstration:

```html
<!-- Before -->
<img src="https://placehold.co/640x460/111827/F59E0B?text=Label+Stickers" />

<!-- After -->
<img src="/images/label-stickers.jpg" />
```

**Recommended approach:**
1. Create `/images` folder
2. Save optimized images there
3. Update all src attributes
4. Test all images load properly

**Image Optimization Tips:**
- Use TinyPNG or ImageOptim to compress
- Aim for <100KB per image
- Use JPG for photos, PNG for logos, WebP for modern browsers
- Maintain consistent aspect ratios

### 7. Analytics Setup

**Google Analytics:**

1. Create account at [google.com/analytics](https://google.com/analytics)
2. Get tracking ID (format: G-XXXXXXXXXX)
3. Add before `</body>` in `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_ID');
</script>
```

**What you'll track:**
- Page views
- User engagement
- Form submissions
- WhatsApp clicks
- Bounce rate

### 8. SEO Configuration

**Google Search Console:**

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your domain
3. Verify ownership (DNS or HTML file method)
4. Submit `sitemap.xml`:
   - Click "Sitemaps" in left menu
   - Enter: `https://yourdomain.com/sitemap.xml`
   - Click Submit

**Update sitemap.xml** with your domain:

```xml
<loc>https://printcraftstudio.com/</loc>
<!-- Replace with -->
<loc>https://yourdomain.com/</loc>
```

**Bing Webmaster Tools:**

1. Go to [bing.com/webmasters](https://bing.com/webmasters)
2. Add site
3. Submit sitemap
4. Monitor search performance

### 9. Social Media Integration

**Update Open Graph Tags:**

```html
<meta property="og:title" content="Your Title" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
<meta property="og:url" content="https://yourdomain.com/" />
```

**Update Twitter Card:**

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Title" />
<meta name="twitter:description" content="Your description" />
<meta name="twitter:image" content="https://yourdomain.com/og-image.jpg" />
<meta name="twitter:creator" content="@yourhandle" />
```

### 10. Email Configuration

**Contact Form Behavior:**

Currently, the form submits directly to WhatsApp. To add email notifications:

1. Use a service like Formspree, Netlify Forms, or SendGrid
2. Update form `action` attribute
3. Add form submission handler

**Netlify Forms Example:**

```html
<form name="lead-form" class="lead-form" id="lead-form" method="POST" netlify>
  <!-- form fields -->
</form>
```

---

## 📊 Content Customization

### Services Section

Edit service cards in `index.html`:

```html
<article class="service-card">
  <div class="service-image">
    <img src="/images/your-image.jpg" alt="Service description" />
  </div>
  <div class="service-body">
    <h3>Your Service Name</h3>
    <p>Your service description here.</p>
    <a class="service-cta" href="https://wa.me/...">Get Quote</a>
  </div>
</article>
```

**To add/remove services:**
1. Copy a service-card div
2. Update image, title, description
3. Update WhatsApp link with service name
4. Adjust grid layout if needed

### Portfolio Section

Add portfolio items:

```html
<article class="portfolio-item" data-category="label-stickers">
  <button class="portfolio-open" type="button" 
    data-title="Project Name" 
    data-category-label="Category"
    data-image="https://your-image.jpg">
    <img src="/images/thumbnail.jpg" alt="Project description" />
    <span class="portfolio-overlay">
      <span>Category</span>
      <strong>Project Name</strong>
    </span>
  </button>
</article>
```

**Available categories:**
- label-stickers
- bottle-labels
- business-cards
- brochures
- mug-printing
- t-shirt-printing
- custom-stickers

### Testimonials Section

Update customer testimonials:

```html
<article class="testimonial-card">
  <div class="testimonial-top">
    <img src="/images/customer.jpg" alt="Customer Name" />
    <div>
      <h3>Customer Name</h3>
      <span>Job Title</span>
    </div>
  </div>
  <div class="stars">★★★★★</div>
  <p>Customer testimonial text here.</p>
</article>
```

### FAQ Section

Update frequently asked questions:

```html
<article class="faq-item">
  <button type="button" aria-expanded="false">
    Your question?
    <span aria-hidden="true">+</span>
  </button>
  <p>Your answer here.</p>
</article>
```

---

## 🚀 Production Checklist

Before deploying:

- [ ] All contact info updated
- [ ] WhatsApp number replaced
- [ ] Email updated
- [ ] Domain configured
- [ ] Images replaced with real files
- [ ] Colors customized to match brand
- [ ] All links tested
- [ ] Mobile tested
- [ ] Analytics configured
- [ ] SEO tags verified
- [ ] Minified CSS/JS in use
- [ ] Performance audit passed (>90)
- [ ] Accessibility audit passed
- [ ] Security headers configured
- [ ] Backup created

---

## 🔧 Common Customizations

### Change Primary Color

1. Open `css/styles.css`
2. Find `:root` CSS variables
3. Update `--primary` and `--accent`
4. Save and test

### Add New Section

1. Copy an existing section (e.g., services)
2. Update the section ID (`id="my-section"`)
3. Update heading and content
4. Add link to navigation menu
5. Update sitemap.xml if SEO section

### Change Mobile Breakpoint

In `css/styles.css`:

```css
/* Current mobile breakpoint is 700px */
@media (min-width: 700px) {
  /* Change 700px to your preferred breakpoint */
}
```

### Disable Animations

For reduced motion support:

```css
/* These are already included */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 📱 Mobile Testing Devices

Test on these devices:
- iPhone 12/13/14
- Samsung Galaxy S21/S22
- iPad/iPad Pro
- Pixel 5/6/7
- Older Android devices

Use Chrome DevTools device emulation for initial testing.

---

## 🔐 Security Headers

If using Netlify or Vercel, add security headers in `_headers` or `vercel.json`:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 🎓 Additional Resources

- [SEO Guide](https://web.dev/lighthouse-seo/)
- [Web Accessibility](https://www.w3.org/WAI/fundamentals/)
- [Web Performance](https://web.dev/performance/)
- [Schema.org](https://schema.org/)

---

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| "WhatsApp link not working" | Verify phone number format includes country code |
| "Images not showing" | Check image paths are relative, not absolute |
| "Colors look wrong" | Clear browser cache (Ctrl+Shift+Delete) |
| "Form not submitting" | Check form service configuration (Netlify/Formspree) |
| "Mobile looks broken" | Clear viewport meta tag hasn't been removed |

---

**Configuration Version**: 1.0  
**Last Updated**: June 1, 2026
