/**
 * Obrada medija prodavnice → web-optimizovani asseti + manifest.
 *
 * Šta radi:
 *   1. Iz `Media/` (ili `_imgprev/` za poster) uzme izvorne 4K fotke,
 *      auto-rotira (EXIF), smanji na maks. 1920px i snimi kao kvalitetan
 *      JPEG u `public/images/store/`. (next/image dalje pravi AVIF/WebP
 *      varijante po uređaju — ovde čuvamo samo lagani master.)
 *   2. Za svaku sliku napravi sićušan blur placeholder (base64 data URL)
 *      za `placeholder="blur"` — smooth učitavanje bez layout skoka.
 *   3. Ispiše `src/lib/gallery.ts` (GENERISANO) sa svim metapodacima
 *      koje galerija, Visit i About sekcija + JSON-LD čitaju.
 *
 * Pokretanje:  node scripts/process-store-media.mjs
 * Zahteva:     sharp (već u devDependencies); video se enkodira ffmpeg-om
 *              odvojeno (vidi README / commit poruku).
 */

import sharp from 'sharp'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC_DIR = path.join(ROOT, 'Media')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'store')
const MANIFEST = path.join(ROOT, 'src', 'lib', 'gallery.ts')

const MAX_WIDTH = 1920
const JPEG_QUALITY = 82

/**
 * Kurirana selekcija (preskočeni near-duplikati). `feature: true` =
 * slika dobija veći kadar u galeriji. `out` je i ime fajla i ključ.
 */
const PHOTOS = [
  {
    src: 'IMG_20260617_155803.jpg',
    out: 'store-front',
    kind: 'exterior',
    feature: true,
    alt: 'Izlog prodavnice UNA Zdrava Hrana kod mosta u Bresnici, Kragujevac',
  },
  {
    src: 'IMG_20260617_155858.jpg',
    out: 'store-interior-bulk',
    kind: 'interior',
    feature: true,
    alt: 'Police sa rinfuz suvim voćem, koštunjavim plodovima i superhranom u prodavnici UNA',
  },
  {
    src: 'IMG_20260617_155732.jpg',
    out: 'store-entrance',
    kind: 'exterior',
    feature: false,
    alt: 'Ulaz u prodavnicu UNA sa suncobranima i rashladnim vitrinama, Bresnica',
  },
  {
    src: 'IMG_20260617_155715.jpg',
    out: 'store-sign',
    kind: 'exterior',
    feature: false,
    alt: 'Ulična tabla Slobodana Penezića Krcuna na uglu prodavnice UNA u Bresnici',
  },
  {
    src: 'IMG_20260617_155907.jpg',
    out: 'store-interior-wide',
    kind: 'interior',
    feature: false,
    alt: 'Unutrašnjost prodavnice UNA — police pune zdravih namirnica, čajeva i suplemenata',
  },
  {
    src: 'IMG_20260617_155758.jpg',
    out: 'store-street',
    kind: 'exterior',
    feature: false,
    alt: 'Prodavnica UNA na uglu kod mosta u Bresnici, pogled iz ulice',
  },
]

// Poster za video šetnju — koristimo oštru interijer fotku (frejmovi iz
// snimka su blago zamućeni od ručnog pokreta).
const POSTER = {
  src: 'IMG_20260617_155907.jpg',
  out: 'store-walkthrough-poster',
  alt: 'Šetnja kroz prodavnicu UNA — pogled na police iznutra',
}

async function blurDataURL(input) {
  const buf = await sharp(input)
    .rotate()
    .resize(24)
    .jpeg({ quality: 40 })
    .toBuffer()
  return `data:image/jpeg;base64,${buf.toString('base64')}`
}

const KINDS = ['exterior', 'interior']

async function process(entry) {
  if (!KINDS.includes(entry.kind)) {
    throw new Error(
      `Nepoznat kind "${entry.kind}" za ${entry.src} — dozvoljeno: ${KINDS.join(' | ')}. ` +
        'Generisani gallery.ts mora ostati u StoreImage uniji.',
    )
  }
  const inPath = path.join(SRC_DIR, entry.src)
  const outPath = path.join(OUT_DIR, `${entry.out}.jpg`)

  const pipeline = sharp(inPath)
    .rotate()
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })

  const info = await pipeline.toFile(outPath)
  const blur = await blurDataURL(inPath)

  return {
    out: entry.out,
    alt: entry.alt,
    kind: entry.kind,
    feature: Boolean(entry.feature),
    width: info.width,
    height: info.height,
    blurDataURL: blur,
  }
}

function tsLiteral(obj) {
  return JSON.stringify(obj, null, 2)
    .replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, '$1:')
    .replace(/\n/g, '\n  ')
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const photos = []
  for (const entry of PHOTOS) {
    const meta = await process(entry)
    photos.push(meta)
    console.log(`✓ ${entry.out}.jpg  ${meta.width}×${meta.height}`)
  }

  const poster = await process({ ...POSTER, kind: 'interior', feature: false })
  console.log(`✓ ${POSTER.out}.jpg  ${poster.width}×${poster.height}`)

  const galleryItems = photos.map((p) => ({
    src: `/images/store/${p.out}.jpg`,
    alt: p.alt,
    kind: p.kind,
    feature: p.feature,
    width: p.width,
    height: p.height,
    blurDataURL: p.blurDataURL,
  }))

  const ts = `/**
 * GENERISANO — ne menjati ručno.
 * Izvor: scripts/process-store-media.mjs  (node scripts/process-store-media.mjs)
 *
 * Metapodaci medija prodavnice: putanje, dimenzije, alt tekstovi i blur
 * placeholderi. Čitaju ih Gallery, About i Visit sekcije te JSON-LD
 * (slike za GroceryStore schema).
 */

export interface StoreImage {
  src: string
  alt: string
  kind: 'exterior' | 'interior'
  feature: boolean
  width: number
  height: number
  blurDataURL: string
}

export const galleryImages: StoreImage[] = ${tsLiteral(galleryItems)}

/** Glavni izlog — About sekcija + GroceryStore JSON-LD slika. */
export const storeFront = galleryImages.find((i) => i.src.endsWith('/store-front.jpg'))!

/** Poster za video šetnju kroz radnju. */
export const walkthroughPoster = {
  src: '/images/store/${POSTER.out}.jpg',
  alt: ${JSON.stringify(POSTER.alt)},
  width: ${poster.width},
  height: ${poster.height},
  blurDataURL: ${JSON.stringify(poster.blurDataURL)},
}

/** Video šetnja kroz prodavnicu (720p H.264, bez zvuka, faststart). */
export const walkthroughVideo = '/images/store/store-walkthrough.mp4'
`

  await writeFile(MANIFEST, ts, 'utf8')
  console.log(`\n✓ manifest → src/lib/gallery.ts (${galleryItems.length} slika)`)
}

main().catch((err) => {
  console.error('FATAL', err)
  process.exit(1)
})
