# 📝 Changelog - UNA Zdrava Hrana Website

## [2.1.0] - 2026-06-11

### 🎨 Toplija paleta + ispravke podataka

- Radno vreme ispravljeno: nedelja je RADNA, 08:00–15:00 (pon–sub 07:30–21:00)
- Privatni mobilni broj uklonjen sa sajta — svuda samo fiksni 034 387 257
- Bela pozadina zamenjena toplom parchment paletom: cream gradijenti,
  sage (leaf-50) prelivi, meki zlatno-zeleni odsjaji (glow-blob)
- Kartice na toploj "paper" površini (#FFFDF7) sa suptilnim ring-om
- Kontakt sekcija prerađena u tamnu (forest) sa staklenim panelima —
  vizuelni ritam: tamno-svetlo-tamno

---

## [2.0.0] - 2026-06-11

### 🎬 Kompletni redizajn — "Priroda zna recept"

**Dizajn:**
- Nova premium paleta: duboka šumska zelena (forest), list (leaf), med (honey), krem (cream)
- Novi fontovi: Fraunces (display serif, latin-ext) + Manrope (sans, latin-ext)
- Zrnasta filmska tekstura na tamnim sekcijama, zlatni akcenti

**3D / Animacije:**
- Sinematik three.js hero scena: organske "dišuće" forme + polje čestica,
  parallax na miš i skrol, pauza van viewporta, poštuje prefers-reduced-motion
- Scroll-driven storytelling (Framer Motion): reveal animacije, 3D tilt kartice,
  animirani brojači, marquee traka, parallax fotografija prodavnice

**Sadržaj / Storytelling:**
- Nova sekcija "Naša priča" (3 poglavlja: Koren → Izbor → Susret)
- Nova FAQ sekcija (5 pitanja)
- Nova "Posetite nas" full-bleed parallax sekcija (zamenila Gallery)
- Ujednačeno radno vreme na svim mestima: pon–sub 07:30–21:00

**SEO:**
- JSON-LD: GroceryStore (NAP + geo + radno vreme), WebSite, FAQPage
- sitemap.xml, robots.txt, web manifest, dinamička OG slika (1200×630)
- Keyword-optimizovan title/description za "zdrava hrana Kragujevac"
- `src/lib/site.ts` — single source of truth za sve podatke prodavnice
- lang="sr-Latn", canonical, metadataBase preko NEXT_PUBLIC_SITE_URL

**Higijena:**
- SUPPLIERS.md i suppliers_contacts.json dodati u .gitignore (interni podaci)
- next/image za sve fotografije, lazy Google mapa

---

## [1.0.0] - 2026-02-03

### ✨ Initial Release

**Kreirano:**
- ✅ Kompletna Next.js 14 aplikacija sa TypeScript-om
- ✅ Modern, responsive dizajn (mobile-first)
- ✅ 7 glavnih sekcija (Hero, About, Products, Location, Contact, Header, Footer)
- ✅ TailwindCSS sa custom color palette (zelena + zlatna tema)
- ✅ Framer Motion animacije
- ✅ SEO optimizacija (meta tags, OG images ready)
- ✅ Google Maps integracija
- ✅ Kontakt forma sa validacijom
- ✅ 6 kategorija proizvoda
- ✅ Social media links (Facebook, Instagram)

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- Lucide Icons

**Features:**
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast loading (optimizovano za performance)
- 🎨 Modern UI/UX sa smooth animacijama
- 🔍 SEO friendly
- ♿ Accessibility best practices

**Files Created:**
- `/src/app/` - Next.js App Router structure
- `/src/components/` - Reusable React components
- Configuration files (tailwind, tsconfig, package.json)
- Documentation (README, SETUP, CHANGELOG)
- Launcher scripts (START_DEV.bat, BUILD.bat)

---

## Planned Features (Future)

### Version 1.1.0
- [ ] E-commerce integracija (Snipcart ili Shopify Buy)
- [ ] Blog sekcija (saveti o zdravoj ishrani)
- [ ] Newsletter subscription (Mailchimp)
- [ ] Galerija proizvoda sa filterima
- [ ] Customer testimonials sekcija
- [ ] Multilanguage support (EN)

### Version 1.2.0
- [ ] Online naručivanje sa košaricom
- [ ] User accounts (login/register)
- [ ] Wishlist funkcionalnost
- [ ] Product reviews i ratings
- [ ] Live chat support

### Version 2.0.0
- [ ] Admin panel za upravljanje proizvodima
- [ ] Inventory management
- [ ] Order tracking
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

---

**Autor:** Lazar Milićević  
**Klijent:** UNA Zdrava Hrana, Kragujevac  
**Datum:** 2026-02-03
