'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CounterProps {
  value: number
  suffix?: string
  className?: string
}

/**
 * Broj koji se "izbrojava" kada uđe u kadar.
 * U server HTML-u stoji finalna vrednost (SEO i no-JS korisnici je vide),
 * a animacija od nule kreće tek kad element uđe u viewport.
 */
export default function Counter({ value, suffix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()

  const finalText = `${value.toLocaleString('sr-RS')}${suffix}`

  useEffect(() => {
    if (!inView || reduce || !ref.current) return
    const node = ref.current
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest).toLocaleString('sr-RS')}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, value, suffix, reduce])

  return (
    <span ref={ref} className={className}>
      {finalText}
    </span>
  )
}
