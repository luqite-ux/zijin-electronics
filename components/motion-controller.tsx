'use client'

import { useEffect } from 'react'

const motionSelector = '.motion-section, .motion-section-heading, .motion-card, .motion-media'

export function MotionController() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const setGroupDelays = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>('[data-motion-group]').forEach((group) => {
        group.querySelectorAll<HTMLElement>('.motion-card').forEach((card, index) => {
          card.style.setProperty('--motion-delay', `${Math.min(index, 3) * 90}ms`)
        })
      })
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

    const register = (scope: ParentNode) => {
      setGroupDelays(scope)
      const targets = scope instanceof Element && scope.matches(motionSelector)
        ? [scope, ...scope.querySelectorAll<HTMLElement>(motionSelector)]
        : Array.from(scope.querySelectorAll<HTMLElement>(motionSelector))

      targets.forEach((target) => {
        if (target.classList.contains('is-visible') || target.classList.contains('motion-pending')) return
        target.classList.add('motion-pending')
        observer.observe(target)
      })
    }

    register(document)

    const routeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) register(node)
        })
      })
    })

    routeObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      routeObserver.disconnect()
      observer.disconnect()
      document.querySelectorAll<HTMLElement>(motionSelector).forEach((target) => {
        target.classList.remove('motion-pending')
      })
    }
  }, [])

  return null
}
