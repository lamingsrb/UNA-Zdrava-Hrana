import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'UNA Zdrava Hrana — Kragujevac, kod Mosta u Bresnici'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #061A10 0%, #0F2E1E 55%, #16402A 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(217,165,60,0.35) 0%, rgba(217,165,60,0) 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -160,
            left: -100,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(55,152,93,0.3) 0%, rgba(55,152,93,0) 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            color: '#E3BC5F',
            fontSize: 26,
            letterSpacing: 10,
            textTransform: 'uppercase',
          }}
        >
          Zdrava hrana
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 200,
            fontWeight: 700,
            color: '#FBF8F1',
            letterSpacing: -6,
            lineHeight: 1,
            marginTop: 10,
          }}
        >
          UNA
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginTop: 28,
            color: '#B5DFC0',
            fontSize: 30,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: '#D9A53C',
              display: 'flex',
            }}
          />
          Kragujevac · Kod Mosta u Bresnici
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: '#D9A53C',
              display: 'flex',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 18,
            color: '#8ACB9D',
            fontSize: 24,
          }}
        >
          15+ godina poverenja
        </div>
      </div>
    ),
    { ...size }
  )
}
