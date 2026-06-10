interface MarqueeProps {
  items: readonly string[]
  className?: string
}

/** Beskonačna pokretna traka — sadržaj dupliran radi besprekorne petlje. */
export default function Marquee({ items, className = '' }: MarqueeProps) {
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="flex items-center gap-10 whitespace-nowrap font-sans text-sm font-bold uppercase tracking-widest2"
        >
          {item}
          <span className="text-honey-400" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`mask-fade-x group flex overflow-hidden ${className}`}>
      {/* pauza na hover — WCAG 2.2.2 kontrola pokretnog sadržaja */}
      <div className="flex animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
