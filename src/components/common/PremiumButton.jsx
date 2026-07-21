import { ArrowRight } from 'lucide-react'

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-black transition duration-300 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-royal/25'

const styles = {
  cta:
    'bg-gradient-to-r from-amber-cta to-orange-cta text-charcoal shadow-[0_18px_40px_rgba(249,115,22,0.32)] hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(249,115,22,0.42)]',
  blue: 'bg-royal text-white shadow-[0_18px_38px_rgba(0,74,173,0.3)] hover:-translate-y-0.5 hover:bg-royal-600',
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
