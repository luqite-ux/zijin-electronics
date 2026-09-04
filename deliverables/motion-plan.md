# Motion plan — Zijin Electronics

## Design intent

Precise, restrained industrial motion for appliance-switch buyers. Red/black brand cues and real product geometry lead; no floating orbs or continuous decorative animation.

## Selected scenes

1. `MOT-ZIJIN-01` narrative reveal: Hero eyebrow, title, copy and CTA enter in a 70 ms reading-order stagger, 520–640 ms, 20 px maximum travel.
2. `MOT-ZIJIN-02` product rail: representative switch assemblies reveal with a horizontal mask and subtle 1.02 image scale; mobile uses fade-only.
3. `MOT-ZIJIN-03` content cards: every repeated product, capability, FAQ and qualification card receives a one-time staggered viewport reveal with a bounded cumulative delay.
4. `MOT-ZIJIN-04` interaction: product cards lift 4 px and CTA arrows translate 3 px on hover/focus; touch retains full static readability.

## External candidates

- Motion `inView` / `whileInView`: adopted for efficient one-time reveal and observer cleanup.
- MDN `prefers-reduced-motion`: adopted as the accessibility contract; all transforms and stagger are disabled under reduction.

## Recent-combination check

Different from the recent Keding combination through a product-mask rail and red/black editorial composition. No parallax or counter animation is used.

## Required verification

- Desktop and 390 px screenshots must prove first and last cards appear.
- Reduced-motion mode must render all content immediately.
- No initial blank product region, horizontal overflow or delayed first CTA.

