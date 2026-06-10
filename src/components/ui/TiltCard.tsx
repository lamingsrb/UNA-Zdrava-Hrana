'use client'

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
}

/** 3D nagib kartice ka kursoru, sa blagim sjajem koji prati pokret. */
export default function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 180,
    damping: 22,
  })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), {
    stiffness: 180,
    damping: 22,
  })
  const glareX = useTransform(mx, [0, 1], ['20%', '80%'])
  const glareY = useTransform(my, [0, 1], ['15%', '85%'])
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgb(255 255 255 / 0.25), transparent 65%)`
  )

  const handlePointerMove = (event: React.PointerEvent) => {
    if (reduce) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((event.clientX - rect.left) / rect.width)
    my.set((event.clientY - rect.top) / rect.height)
  }

  const handlePointerLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        // framer-motion transform prop — ugrađuje perspective(900px) u transform
        transformPerspective: 900,
      }}
      className={className}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glare }}
      />
    </motion.div>
  )
}
