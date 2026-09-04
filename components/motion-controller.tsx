'use client'

import { useEffect } from 'react'

const motionSelector = '.motion-section, .motion-section-heading, .motion-card, .motion-media'

export function MotionController() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const root = document.documentElement
    const targets = Array.from(document.querySelectorAll<HTMLElement>(motionSelector))

    document.querySelectorAll<HTMLElement>('[data-motion-group]').forEach((group) => {
      group.querySelectorAll<HTMLElement>('.motion-card').forEach((card, index) => {
        card.style.setProperty('--motion-delay', `${Math.min(index, 3) * 90}ms`)
      })
    })

    root.classList.add('motion-ready')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

    targets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
      root.classList.remove('motion-ready')
    }
  }, [])

  return null
}
