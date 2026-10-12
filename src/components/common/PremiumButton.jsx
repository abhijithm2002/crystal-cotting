import { ArrowRight } from 'lucide-react'

const base =
  'premium-button inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold transition duration-300 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-royal/25'

const styles = {
  cta:
    'bg-amber-cta text-charcoal shadow-sm hover:-translate-y-0.5 hover:brightness-110',
  blue: 'bg-royal text-white shadow-sm hover:-translate-y-0.5 hover:bg-royal-600',
  glass:
    'border border-white/25 bg-white/12 text-white backdrop-blur-xl hover:-translate-y-0.5 hover:bg-white/20',
  outline:
    'border border-royal/18 bg-white text-royal shadow-sm hover:-translate-y-0.5 hover:border-royal hover:bg-royal-100',
}

export function PremiumButton({
  children,
  href,
  onClick,
  variant = 'cta',
  icon,
  className = '',
  showArrow = false,
  type = 'button',
  ...props
}) {
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {showArrow ? <ArrowRight size={17} aria-hidden="true" /> : null}
    </>
  )

  const classes = `${base} ${styles[variant]} ${className}`

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} type={type} onClick={onClick} {...props}>
      {content}
    </button>
  )
}
