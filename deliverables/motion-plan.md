# Zijin Electronics Motion Plan

Date: 2026-09-04

## Direction

Motion supports the industrial product hierarchy without turning the site into a demo reel. The selected combination covers narrative entrance, scroll-based content reveal, repeated-card sequencing, and restrained interaction feedback.

## External candidates

### Motion for React

- Reference: https://motion.dev/docs/react-scroll-animations
- Candidate mechanisms: `whileInView`, one-time viewport animation, image mask reveal, reduced-motion hooks.
- Decision: adopt the behavioral pattern, but not the package. The current site can achieve the required one-time reveals with one shared IntersectionObserver and CSS, avoiding another client dependency.

### GSAP ScrollTrigger

- Reference: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Candidate mechanisms: precise scroll positions, timelines, scrub, pinning, and callback control.
- Decision: rejected for this site. Pinning, scrubbed timelines, and complex scroll choreography do not help the purchasing narrative and would add bundle and maintenance cost.

## Adopted scenes

1. **Narrative — Hero entrance:** existing hero label, heading, copy, and actions enter in a restrained 620ms sequence; carousel imagery crossfades without layout movement.
2. **Content — Section reveal:** every homepage section enters once with 24px vertical movement and opacity over 620ms.
3. **Interaction — Card collections:** every product-family, application, manufacturing, quality, and FAQ card receives its own entry animation. Reading-order stagger is 90ms with a 270ms cumulative cap. Desktop hover adds at most 6px lift and restrained image scale.
4. **Industry-specific — Media reveal:** large product and capability media use a subtle inset mask and 1.5% scale correction, emphasizing manufactured form without decorative looping.

## Accessibility and performance

- `prefers-reduced-motion: reduce` disables non-essential opacity, movement, mask, scale, and stagger effects; content remains immediately visible.
- Mobile movement is reduced to 16px and media masks are shallower.
- IntersectionObserver triggers each target once, then unobserves it; cleanup disconnects the observer on unmount.
- No infinite decoration, flashing, floating light balls, pinned scrolling, or scroll hijacking.

## Verification evidence

- Automated contract: `tests/site-rules.test.mjs` verifies the observer, cleanup, reduced-motion rules, and motion coverage across homepage card collections.
- Desktop browser: local Production build verified 6/6 sections, 24/24 cards, and 4/4 product-family visuals reveal once; no horizontal overflow or console errors.
- 390px mobile browser: local Production build verified 6/6 sections, 24/24 cards, and 4/4 product-family visuals reveal once; no horizontal overflow or console errors.
- Reduced-motion browser emulation: first animated card computed to `opacity: 1`, `transform: none`, and `clip-path: none`.
