# 🚀 UNA Zdrava Hrana - Setup Uputstvo

## 📋 Preduslovi

- Node.js 18+ (preporučeno 20+)
- npm ili yarn package manager

## ⚡ Brzi Start

### 1. Instalacija Dependencies

```bash
cd UNA_Zdrava_Hrana
npm install
```

### 2. Pokretanje Development Server-a

```bash
npm run dev
```

Website će biti dostupan na: **http://localhost:3000**

### 3. Build za Production

```bash
npm run build
npm start
```

---

## 📁 Struktura Projekta

```
UNA_Zdrava_Hrana/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles + Tailwind
│   │   ├── layout.tsx           # Root layout (SEO, fonts)
│   │   └── page.tsx             # Homepage
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Header.tsx       # Navigation
│   │   │   └── Footer.tsx       # Footer
│   │   └── sections/
│   │       ├── Hero.tsx         # Hero section
│   │       ├── About.tsx        # O Nama
│   │       ├── Products.tsx     # Proizvodi
│   │       ├── Location.tsx     # Lokacija + Mapa
│   │       └── Contact.tsx      # Kontakt forma
│   └── lib/                     # Utility functions
├── public/
│   ├── images/                  # Slike
│   └── fonts/                   # Custom fontovi (optional)
├── tailwind.config.ts           # Tailwind konfiguracija
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
```

---

## 🎨 Customizacija

### Boje

Izmeni `tailwind.config.ts`:

```typescript
colors: {
  primary: { ... },  // Glavna zelena boja
  accent: { ... },   // Zlatna akcentna boja
}
```

### Sadržaj

- **Hero tekst:** `src/components/sections/Hero.tsx`
- **O nama:** `src/components/sections/About.tsx`
- **Proizvodi:** `src/components/sections/Products.tsx` (dodaj/izmeni kategorije)
- **Kontakt info:** `src/components/sections/Location.tsx` & `Footer.tsx`

### Google Maps

U `src/components/sections/Location.tsx`, zameni `iframe src` sa pravom Google Maps embed URL-om za vašu lokaciju.

---

## 📦 Deployment

### Vercel (preporučeno)

1. Push na GitHub
2. Importuj projekat na [vercel.com](https://vercel.com)
3. Deploy automatski!

### Netlify

```bash
npm run build
# Deploy /out folder
```

### Drugi Hosting

Build-ovani fajlovi su u `/.next` folderu.

---

## 🔧 Dodatne Opcije

### Email Integracija

Za funkcionalnu kontakt formu, integriši:
- EmailJS
- SendGrid
- Nodemailer (backend)

### CMS Integracija

Za dinamički content:
- Contentful
- Strapi
- Sanity.io

### E-Commerce

Za online prodaju:
- Snipcart
- Shopify Buy Button
- WooCommerce headless

---

## 📞 Podrška

Za pomoć: **lamingsrb@gmail.com**

---

**Kreirao:** Lazar Milićević  
**Verzija:** 1.0  
**Datum:** 2026-02-03
