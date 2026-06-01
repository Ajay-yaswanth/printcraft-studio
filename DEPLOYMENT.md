# PrintCraft Studio - Deployment Guide

A comprehensive guide for deploying the PrintCraft Studio website to GitHub Pages, Netlify, and Vercel.

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [GitHub Pages Deployment](#github-pages-deployment)
3. [Netlify Deployment](#netlify-deployment)
4. [Vercel Deployment](#vercel-deployment)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Domain Setup](#domain-setup)
7. [Performance Tips](#performance-tips)
8. [SEO Configuration](#seo-configuration)

---

## Pre-Deployment Checklist

Before deploying, ensure you've completed these steps:

- [ ] Replace `919999999999` with your actual WhatsApp number in:
  - `index.html` (multiple locations)
  - `js/script.js`
- [ ] Replace placeholder images from `placehold.co` with real product images
- [ ] Update `hello@printcraftstudio.com` with your actual email address
- [ ] Update phone number `+91 99999 99999` with your actual phone
- [ ] Update `og-image.jpg` path with your actual Open Graph image
- [ ] Update canonical URL in `<head>` from example to your actual domain
- [ ] Test all WhatsApp links to ensure they work correctly
- [ ] Test form submission behavior
- [ ] Verify mobile responsiveness on actual devices
- [ ] Test accessibility with screen readers
- [ ] Check all links are working
- [ ] Verify images load properly

---

## GitHub Pages Deployment

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click **New** to create a new repository
3. Name it: `printcraftstudio.github.io` (replace with your username)
4. Make it **Public**
5. Click **Create repository**

### Step 2: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: PrintCraft Studio website"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/printcraftstudio.github.io.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to repository **Settings**
2. Navigate to **Pages** section
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**
6. Your site will be published at: `https://YOUR_USERNAME.github.io`

### Custom Domain (GitHub Pages)

1. In repository settings → **Pages**
2. Under "Custom domain", enter your domain name (e.g., `printcraftstudio.com`)
3. Check "Enforce HTTPS"
4. Update your domain's DNS records:

```
CNAME: www.printcraftstudio.com → YOUR_USERNAME.github.io
A: printcraftstudio.com → GitHub Pages IP (check GitHub docs for current IP)
```

---

## Netlify Deployment

### Step 1: Connect Repository to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/log in
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub** and authorize
4. Select your repository
5. Leave build settings as default (static site, no build command needed)
6. Click **Deploy site**

### Step 2: Configure Netlify

Once deployed, configure these settings:

**Redirects & Rewrites:**

Create a `_redirects` file in your root directory:

```
# Redirect www to non-www
https://www.printcraftstudio.com/* https://printcraftstudio.com/:splat 301!

# Cache HTML files
/*.html 200

# Single Page App redirect (for hash routing)
/* /index.html 200
```

**Environment Variables:**

In Netlify Dashboard → **Site settings** → **Build & deploy** → **Environment**

(Not needed for static sites, but useful for future enhancements)

**Headers:**

Create a `_headers` file in root:

```
# Security headers
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin

# Cache control
/*.html
  Cache-Control: public, must-revalidate, max-age=3600

/css/*
/js/*
/images/*
  Cache-Control: public, immutable, max-age=31536000

# Compression
/
  Content-Encoding: gzip
```

### Step 3: Connect Custom Domain

1. **Domain settings** → **Custom domains** → **Add domain**
2. Enter your domain name
3. Netlify will guide you through DNS setup
4. Point your domain DNS to Netlify nameservers or use CNAME records

---

## Vercel Deployment

### Step 1: Deploy with Vercel CLI

**Install Vercel CLI:**

```bash
npm install -g vercel
```

**Deploy:**

```bash
vercel
```

Follow the prompts to:
- Link to your Vercel account
- Select project name
- Confirm directory structure
- Build configuration (skip, as this is a static site)

### Step 2: Deploy via GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. **Import Git Repository** and select your GitHub repo
4. Configure project:
   - Framework Preset: **Other** (for static HTML)
   - No build command needed
   - Output Directory: `.` (root)
5. Click **Deploy**

### Step 3: Configure Vercel

**vercel.json** (create in root directory):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, s-maxage=3600, stale-while-revalidate"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/css/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, immutable, max-age=31536000"
        }
      ]
    },
    {
      "source": "/js/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, immutable, max-age=31536000"
        }
      ]
    }
  ]
}
```

### Step 4: Connect Custom Domain

1. **Settings** → **Domains**
2. **Add domain**
3. Follow DNS setup instructions:
   - Add A record pointing to Vercel's IP
   - Or add CNAME record for subdomain

---

## Post-Deployment Verification

### Check These Items

1. **HTTPS**: Verify all pages load over HTTPS
2. **Performance**: 
   - Run through [Google PageSpeed Insights](https://pagespeed.web.dev)
   - Target: >90 on desktop, >75 on mobile
3. **SEO**:
   - Submit sitemap to Google Search Console
   - Verify structured data with [Schema.org validator](https://validator.schema.org)
4. **Analytics**:
   - Set up Google Analytics: Add tracking code before `</body>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXX');
   </script>
   ```
5. **Mobile Testing**: Test on iPhone, Android devices
6. **Form Testing**: Verify WhatsApp form submission works
7. **Lighthouse Audit**: Use Chrome DevTools Lighthouse feature
8. **Broken Links**: Check with [Dead Link Checker](https://www.deadlinkchecker.com/)

---

## Domain Setup

### DNS Configuration Examples

**For Google Domains / Namecheap / GoDaddy:**

```
For GitHub Pages:
  A Record: @ → 185.199.108.153
  A Record: @ → 185.199.109.153
  A Record: @ → 185.199.110.153
  A Record: @ → 185.199.111.153
  CNAME Record: www → username.github.io

For Netlify:
  CNAME Record: @ → YOUR-SITE.netlify.app

For Vercel:
  A Record: @ → 76.76.19.165
  AAAA Record: @ → 2610:1f1:6:1:0:0:0:a5
  CNAME Record: www → cname.vercel-dns.com
```

---

## Performance Tips

### Image Optimization

1. **Replace placeholder images** with actual product images
2. **Use modern formats**:
   - Convert images to WebP with fallback to JPG/PNG
   - Use `<picture>` tag for responsive images
3. **Compress images**:
   - Use [TinyPNG](https://tinypng.com) or [ImageOptim](https://imageoptim.com)
   - Target: <100KB per image
4. **Lazy loading**: Already configured with `loading="lazy"`

### Code Minification

- Use `styles.min.css` instead of `styles.css` in production
- Use `script.min.js` instead of `script.js` in production
- Update HTML to reference minified files

### Caching

- Static assets (CSS, JS) are cached for 1 year
- HTML files are cached for 1 hour
- Configure via headers/redirects files

---

## SEO Configuration

### Submit to Search Engines

1. **Google Search Console**:
   - Go to [search.google.com/search-console](https://search.google.com/search-console)
   - Add property: Your domain
   - Verify ownership (DNS or HTML file method)
   - Submit `sitemap.xml`
   - Monitor search performance

2. **Bing Webmaster Tools**:
   - Go to [bing.com/webmasters](https://bing.com/webmasters)
   - Add site
   - Submit sitemap
   - Monitor performance

### Local SEO

1. **Google My Business**:
   - Create listing at [google.com/business](https://www.google.com/business)
   - Add business info, hours, photos
   - Encourage reviews

2. **Business Directories**:
   - Add to local directories (India Business Directory, etc.)
   - Ensure consistent NAP (Name, Address, Phone)

### Monitoring

- **Google Analytics**: Track user behavior, conversion sources
- **Google Search Console**: Monitor search keywords, indexing
- **Bing Webmaster Tools**: Monitor Bing search performance
- **Core Web Vitals**: Monitor LCP, FID, CLS via Google Search Console

---

## Maintenance

### Regular Updates

1. **Weekly**: 
   - Monitor Google Analytics for traffic trends
   - Check Google Search Console for crawl errors
2. **Monthly**:
   - Update portfolio/service images with new work
   - Verify all links still work
   - Check Page Speed score
3. **Quarterly**:
   - Update testimonials/case studies
   - Review and optimize underperforming pages
   - Check for security vulnerabilities

### Backup

- Keep code in Git repository (GitHub, GitLab, Bitbucket)
- Store in at least 2 locations
- Backup any custom domain records

---

## Troubleshooting

### Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Domain not pointing" | Allow 24-48 hours for DNS propagation, check DNS records |
| "HTTPS not working" | Wait for SSL cert (Netlify: automatic, Vercel: automatic, GitHub: 5-10 min) |
| "404 errors on pages" | Check file paths, ensure `sitemap.xml` and `robots.txt` exist |
| "Images not loading" | Verify image paths are relative, not absolute URLs |
| "Form not working" | Verify WhatsApp number is correct and phone is receiving messages |
| "Poor performance score" | Compress images, minimize CSS/JS, reduce third-party scripts |

---

## Quick Commands Reference

```bash
# Clone repository
git clone https://github.com/USERNAME/printcraftstudio.git
cd printcraftstudio

# Make changes
git add .
git commit -m "Update content"
git push

# Deploy with Vercel
vercel

# Check performance
# Visit: https://pagespeed.web.dev

# Verify SEO
# Visit: https://validator.schema.org
```

---

## Support & Resources

- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Pages Guide**: https://pages.github.com
- **Google Search Console Help**: https://support.google.com/webmasters
- **Performance Guide**: https://web.dev/performance

---

**Last Updated**: June 1, 2026
