# Painting 3D Visual Fit Note

Date: 2026-07-07

## Fix

- Teaching images must show the full image first.
- Do not crop real teaching posters with `object-fit: cover`.
- Use `object-fit: contain` for linked photo slides and explanation slides.
- The 3D stage must keep safe margins around OK / NG blocks.
- If the road slide looks empty, use a real workshop image softly behind the route.

## Design Direction

- Make the app feel like an invention room / workbench.
- Keep the real image readable before adding mood.
- 3D should explain the invisible coating mechanism, not decorate the page.

## Touch Control Correction

- The main sliders should live inside the 3D stage when the learner is meant to touch the 3D.
- On smartphone, the controls must be visible near the 3D frame, not below a separate side column.
- The 3D canvas must use `touch-action: none` so finger drag can rotate the model.
