import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// Pointer-only decoration; content and controls remain ordinary accessible HTML.
export function TiltSurface({ children }) {
  const surface = useRef(null)
  const reducedMotion = useReducedMotion()
  function reset() {
    surface.current?.style.setProperty('--tilt-x', '0deg')
    surface.current?.style.setProperty('--tilt-y', '0deg')
  }
  function tilt(event) {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const box = event.currentTarget.getBoundingClientRect()
    surface.current.style.setProperty('--tilt-x', `${((event.clientY - box.top) / box.height - 0.5) * -6}deg`)
    surface.current.style.setProperty('--tilt-y', `${((event.clientX - box.left) / box.width - 0.5) * 8}deg`)
  }
  return <div className="paint-perspective" onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset}>
    <div ref={surface} className="paint-surface">{children}</div>
  </div>
}
