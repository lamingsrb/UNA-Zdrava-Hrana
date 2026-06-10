# 🌿 UNA - Zdrava Hrana

Sinematik, storytelling website za prodavnicu zdrave hrane u Kragujevcu.

## 📍 Lokacija
**Adresa:** Slobodana Penezića Krcuna (Kod Mosta u Bresnici), Kragujevac
**Radno vreme:** Pon–Sub 07:30–21:00, nedeljom zatvoreno
**Iskustvo:** 15+ godina poverenja

## 🛠️ Tech Stack
- **Frontend:** Next.js 14 (App Router) + TypeScript
- **Styling:** TailwindCSS (custom dizajn sistem: forest / leaf / honey / cream paleta)
- **Animacije:** Framer Motion (scroll-driven storytelling, tilt kartice, counteri)
- **3D:** three.js — sinematik hero scena (organske forme + polje čestica), lazy-loaded
- **Fontovi:** Fraunces (display serif) + Manrope (sans), latin-ext subset
- **SEO:** Metadata API, JSON-LD (GroceryStore + WebSite + FAQPage), sitemap, robots, manifest, dinamička OG slika
- **Deployment:** Vercel (auto-deploy sa GitHub `master` grane)

## 🚀 Struktura sajta
1. **Hero** — 3D sinematik scena, statistike, marquee kategorija
2. **Naša priča** — storytelling u 3 poglavlja (Koren → Izbor → Susret)
3. **Proizvodi** — 6 kategorija sa 3D tilt karticama
4. **O nama** — 15 godina, fotografija prodavnice, vrednosti
5. **Galerija/Posetite nas** — full-bleed parallax fotografija
6. **FAQ** — akordeon + FAQPage schema (rich results)
7. **Lokacija** — Google mapa + NAP podaci
8. **Kontakt** — kanali + mailto forma

## 🔑 Podaci prodavnice
Svi podaci (adresa, telefoni, radno vreme, koordinate) žive na **jednom mestu**:
`src/lib/site.ts` — sekcije i schema.org markup čitaju odatle.
Kada se nešto promeni (npr. radno vreme), menja se samo taj fajl.

## 🧞 Komande
```bash
npm install     # instalacija
npm run dev     # dev server (localhost:3000)
npm run build   # produkcioni build
```

## 🌐 Domen
Canonical URL se podešava env varijablom `NEXT_PUBLIC_SITE_URL`
(fallback: `https://una-zdrava-hrana.vercel.app`). Kada se kupi pravi domen,
dodati varijablu u Vercel projektu — sve SEO reference se automatski ažuriraju.

---

**Verzija:** 2.0
**Klijent:** UNA Zdrava Hrana, Kragujevac
