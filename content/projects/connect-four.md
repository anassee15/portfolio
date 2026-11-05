---
headline: "Connect Four, read by a webcam"
meta: "HES-SO · Image processing II · 2023 · with David Crevoiserat"
lede: "A webcam reads a real Connect Four board, and an AI picks its next move."
---

## The situation

An image processing project, in pairs. The webcam finds the grid with Hough circles and reads each token's colour with HSV masks; an alpha-beta search, five moves deep, picks the next move. The game starts once the grid is empty, in front of a white background, with decent light.

## Results

It plays live against a person, on a real board.
