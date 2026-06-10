'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

/**
 * Sinematik 3D pozadina hero sekcije — organske, "dišuće" forme i polje
 * čestica u tonovima lista i meda, sa blagim parallax-om na pokret miša
 * i skrol. Renderuje se samo dok je vidljiva; uz prefers-reduced-motion
 * iscrtava statičan kadar (i ponovo ga iscrtava posle resize-a).
 * Animacija je delta-time bazirana — ista brzina na 60 i na 144 Hz.
 */

const LEAF_TONES = [0x37985d, 0x27814c, 0x5bb37a, 0x8acb9d]
const HONEY = 0xd9a53c

function makeParticleTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.35, 'rgba(255,255,255,0.6)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

interface Blob {
  mesh: THREE.Mesh
  base: Float32Array
  speed: number
  amp: number
  freq: number
  drift: THREE.Vector3
  rotSpeed: { x: number; y: number } // rad/s
}

export default function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x061a10, 18, 46)

    const camera = new THREE.PerspectiveCamera(
      58,
      host.clientWidth / host.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 22)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(host.clientWidth, host.clientHeight)
    host.appendChild(renderer.domElement)

    // — svetla: meka ambijentalna + topao "medeni" akcenat
    scene.add(new THREE.AmbientLight(0x9fd4b3, 0.55))
    const keyLight = new THREE.DirectionalLight(0xfff3d6, 1.1)
    keyLight.position.set(6, 8, 10)
    scene.add(keyLight)
    const honeyLight = new THREE.PointLight(HONEY, 60, 50, 1.8)
    honeyLight.position.set(-9, 5, 6)
    scene.add(honeyLight)

    // — organske forme koje "dišu"
    const blobs: Blob[] = []
    const blobConfigs = [
      { radius: 3.4, pos: [-8.5, 2.2, -6], color: LEAF_TONES[1], opacity: 0.5 },
      { radius: 2.2, pos: [8, -2.8, -4], color: LEAF_TONES[0], opacity: 0.55 },
      { radius: 1.5, pos: [5.5, 3.6, -8], color: HONEY, opacity: 0.45 },
      { radius: 2.8, pos: [-4, -4.2, -10], color: LEAF_TONES[2], opacity: 0.4 },
      { radius: 1.2, pos: [0.5, 4.8, -12], color: LEAF_TONES[3], opacity: 0.35 },
    ]

    for (const cfg of blobConfigs) {
      // mergeVertices: indeksirana geometrija → glatke normale (bez faseta)
      // i ~6x manje verteksa za CPU deformaciju po frejmu
      const geometry = mergeVertices(new THREE.IcosahedronGeometry(cfg.radius, 5))
      const material = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: 0.35,
        metalness: 0.15,
        transparent: true,
        opacity: cfg.opacity,
        emissive: cfg.color,
        emissiveIntensity: 0.12,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2])
      scene.add(mesh)
      blobs.push({
        mesh,
        base: Float32Array.from(geometry.attributes.position.array),
        speed: 0.35 + Math.abs(Math.sin(cfg.pos[0])) * 0.4,
        amp: 0.16 + cfg.radius * 0.02,
        freq: 0.9 + Math.abs(Math.cos(cfg.pos[1])) * 0.7,
        drift: new THREE.Vector3(
          Math.sin(cfg.pos[0]) * 0.4,
          Math.cos(cfg.pos[1]) * 0.5,
          0
        ),
        rotSpeed: {
          x: 0.02 + Math.abs(Math.sin(cfg.pos[2])) * 0.04,
          y: 0.03 + Math.abs(Math.cos(cfg.pos[0])) * 0.05,
        },
      })
    }

    // — polje čestica (zeleno-zlatni "polen")
    const COUNT = 1600
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const honeyColor = new THREE.Color(HONEY)
    const tmpColor = new THREE.Color()
    for (let i = 0; i < COUNT; i++) {
      const r = 12 + Math.random() * 22
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.6
      positions[i * 3 + 2] = r * Math.cos(phi) - 14
      if (Math.random() < 0.22) {
        tmpColor.copy(honeyColor)
      } else {
        tmpColor.set(LEAF_TONES[Math.floor(Math.random() * LEAF_TONES.length)])
      }
      tmpColor.offsetHSL(0, 0, Math.random() * 0.15)
      colors[i * 3] = tmpColor.r
      colors[i * 3 + 1] = tmpColor.g
      colors[i * 3 + 2] = tmpColor.b
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const particleTexture = makeParticleTexture()
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.34,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // — interakcija
    const pointer = { x: 0, y: 0 }
    let scrollOffset = 0

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    // na touch uređajima vrati kameru u centar kad se dodir završi
    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        pointer.x = 0
        pointer.y = 0
      }
    }
    const onScroll = () => {
      scrollOffset = Math.min(window.scrollY / window.innerHeight, 1.5)
    }
    onScroll()
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerup', onPointerEnd, { passive: true })
    window.addEventListener('pointercancel', onPointerEnd, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    // — render petlja, aktivna samo dok je scena u kadru
    let inView = true
    let frameId = 0
    const clock = new THREE.Clock()
    let t = 0 // akumulirano "aktivno" vreme — ne skače posle pauze

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(host)

    const renderFrame = () => {
      // clamp: posle pauze (tab/viewport) nastavi glatko, bez skoka
      const dt = Math.min(clock.getDelta(), 0.05)
      t += dt

      for (const blob of blobs) {
        const positionAttr = blob.mesh.geometry.attributes
          .position as THREE.BufferAttribute
        const arr = positionAttr.array as Float32Array
        for (let i = 0; i < arr.length; i += 3) {
          const bx = blob.base[i]
          const by = blob.base[i + 1]
          const bz = blob.base[i + 2]
          const wave =
            1 +
            blob.amp *
              Math.sin(t * blob.speed + (bx + by) * blob.freq) *
              Math.cos(t * blob.speed * 0.7 + bz * blob.freq)
          arr[i] = bx * wave
          arr[i + 1] = by * wave
          arr[i + 2] = bz * wave
        }
        positionAttr.needsUpdate = true
        blob.mesh.geometry.computeVertexNormals()
        blob.mesh.rotation.x += blob.rotSpeed.x * dt
        blob.mesh.rotation.y += blob.rotSpeed.y * dt
        blob.mesh.position.x += Math.sin(t * 0.2 + blob.drift.x) * 0.12 * dt
        blob.mesh.position.y += Math.cos(t * 0.16 + blob.drift.y) * 0.15 * dt
      }

      particles.rotation.y = t * 0.016
      particles.position.y = Math.sin(t * 0.1) * 0.6 + scrollOffset * 2.4

      // frame-rate nezavisan lerp kamere
      const lerp = 1 - Math.exp(-3.5 * dt)
      camera.position.x += (pointer.x * 1.6 - camera.position.x) * lerp
      camera.position.y +=
        (-pointer.y * 1.1 - scrollOffset * 2 - camera.position.y) * lerp
      camera.position.z = 22 + scrollOffset * 3
      camera.lookAt(0, 0, -4)

      honeyLight.intensity = 52 + Math.sin(t * 0.8) * 14

      renderer.render(scene, camera)
    }

    const onResize = () => {
      if (!host.clientWidth || !host.clientHeight) return
      camera.aspect = host.clientWidth / host.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(host.clientWidth, host.clientHeight)
      // setSize briše drawing buffer — odmah ponovo iscrtaj
      // (presudno za reduced-motion režim gde nema rAF petlje)
      renderFrame()
    }
    window.addEventListener('resize', onResize)

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      if (!inView || document.hidden) {
        // resetuj delta da pauza ne uđe u sledeći frejm
        clock.getDelta()
        return
      }
      renderFrame()
    }

    if (prefersReducedMotion) {
      renderFrame()
    } else {
      animate()
    }

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerEnd)
      window.removeEventListener('pointercancel', onPointerEnd)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      for (const blob of blobs) {
        blob.mesh.geometry.dispose()
        ;(blob.mesh.material as THREE.Material).dispose()
      }
      particleGeometry.dispose()
      particleMaterial.dispose()
      particleTexture.dispose()
      renderer.dispose()
      // odmah oslobodi WebGL kontekst (bitno za dev StrictMode remount)
      renderer.forceContextLoss()
      host.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
    />
  )
}
