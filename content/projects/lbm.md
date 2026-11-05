---
headline: "Lattice Boltzmann, MPI and CUDA"
meta: "EPFL · MATH-454 Parallel and High-Performance Computing · spring 2026 · solo"
lede: "A fluid flowing past an obstacle, simulated cell by cell, and made to run about 100 times faster: once across 128 CPU cores, once on a single GPU."
---

## The situation

The starting point was a serial D2Q9 Lattice Boltzmann solver: 21.6 million lattice updates per second (MLUPS), 889 s for the reference run. Almost all the time goes into the per-cell sweep (collide 73 %, stream 25 %), and each cell only reads its neighbours, so nearly all of it can run in parallel.

## The system

- **MPI:** the grid is cut into vertical slabs, one per rank. Only 3 of the 9 directions cross a slab boundary, so each halo exchange sends 3 values per row instead of 9, with non-blocking sends.
- **CUDA:** one thread per cell, a structure-of-arrays layout so the 32 reads of a warp merge into one memory transaction, and collision fused with bounce-back, which saves a full read and write of the lattice at each step.
- Both versions reproduce the Kármán vortex street of the serial code (Strouhal number ≈ 0.16): parallelising changed the run time, not the result.

## Results

- On the reference grid (800 × 400), one V100 runs about **2,265 MLUPS**, ~105× the serial code; 128 MPI ranks on 8 nodes reach 2,128.
- On a larger grid (1600 × 800), one GPU (2,596 MLUPS) matches 128 MPI ranks (2,550).
- The CUDA kernel uses 87 % of the GPU's memory bandwidth on the largest lattice. MPI keeps about 96 % weak-scaling efficiency up to 8 nodes, one rank per node.

Benchmarks on SCITAS, EPFL, 2026.

## Try it

The same method, rewritten in WebGL for this page and running on your GPU: a fluid flows past a cylinder and leaves a Kármán vortex street behind it. Drag across the flow to stir it.

## What I learned

Both versions hit the same wall: memory bandwidth, not compute. On the CPU, efficiency went above 100 % once a rank's slab fit in cache (most likely; I did not profile cache misses), and fell as soon as ranks shared a node's bandwidth. The lesson I wrote in the report: grow the problem with the core count.
