# Clinic Website Visual and Interaction Upgrade

## Goal
Enhance the existing clinic website with premium medical imagery, clearer navigation, a polished reviews slider, and a centered appointment popup while preserving all existing copy, colors, and clinic details.

## Changes
- Add a cohesive set of warm, premium physiotherapy and wellness images across the introduction, services, treatment methods, patient journey, team, reviews, and location areas; retain the current clinic image in the opening section.
- Change the desktop and mobile navigation label from “Approach” to “About Us” without changing the section destination.
- Replace the reviews grid with a looping slider that shows three cards on desktop, advances one review every three seconds, animates smoothly, and supports arrow and dot controls. Adapt the visible card count for smaller screens while preserving all five reviews.
- Upgrade the booking popup into a clearly centered, animated dialog with a blurred backdrop, close control, the existing fields, a required consent checkbox, and the existing WhatsApp handoff.
- Ensure every “Book Appointment” and “Book a Visit” action opens the same booking dialog.

## Quality checks
- Verify image loading and cropping, slider autoplay and manual controls, dialog opening from every booking action, validation and WhatsApp message generation.
- Check desktop and mobile layouts, keyboard access, reduced-motion behavior, and browser console errors.

## Technical details
- Generate and bundle the new visual assets with the project for reliable loading rather than depending on third-party image hosts.
- Implement the slider with React state and CSS transitions, including infinite wrapping and cleanup of the autoplay timer.
- Keep the existing TanStack route, semantic color tokens, typography, and all supplied text unchanged.
