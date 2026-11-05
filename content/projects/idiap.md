---
headline: "Looking at hands"
meta: "EPFL × Idiap · research project · Sep 2024 – Jan 2025 · solo"
lede: "Teaching a machine to see when someone looks at a hand, so videos can be pre-annotated automatically."
---

## The situation

Annotating where people look, frame by frame, is slow. I worked on one case, looking at hands: an annotation protocol and a new dataset built on ChildPlay, metrics, and a pre-annotation algorithm that combines gaze with hand boxes (circular and elliptic Gaussian gaze cones, tuned by grid search). ChildPlay frames show children, so none are published here.

## Results

- **F1 0.76** for the baseline, and 0.91 for the simpler question "is this person looking at a hand or not".
- Almost no loss with pseudo-annotated hand boxes, so the method scales to video nobody has annotated.
