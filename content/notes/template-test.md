---
title: "Template test: one LBM step"
date: 2026-11-05
tags: [gpu, physics]
summary: "A draft that exercises the note template: maths, code, a table, a quote and footnotes. Never published."
draft: true
---

This note only exists to test the template. Inline maths first: a D2Q9 lattice keeps $9$ populations $f_i$ per cell, and the density is $\rho = \sum_i f_i$.

## Collision

Each step relaxes the populations towards a local equilibrium (BGK)[^bgk]:

$$
f_i(\mathbf{x} + \mathbf{c}_i, t + 1) = f_i(\mathbf{x}, t) - \frac{1}{\tau}\left(f_i - f_i^{\mathrm{eq}}\right)
$$

with

$$
f_i^{\mathrm{eq}} = w_i \rho \left(1 + 3\,\mathbf{c}_i \cdot \mathbf{u} + \tfrac{9}{2}(\mathbf{c}_i \cdot \mathbf{u})^2 - \tfrac{3}{2}\,\mathbf{u} \cdot \mathbf{u}\right)
$$

| Directions | Weight $w_i$ |
| --- | --- |
| rest | $4/9$ |
| 4 axis-aligned | $1/9$ |
| 4 diagonal | $1/36$ |

## The same, in code

```python
def equilibrium(rho, u, c, w):
    cu = c @ u  # one dot product per direction
    return w * rho * (1 + 3 * cu + 4.5 * cu**2 - 1.5 * (u @ u))
```

```glsl
float cu = dot(vec2(C[i]), u);
f[i] += omega * (equilibrium(i, rho, u) - f[i]);
```

### A smaller heading

> A quote, to check the style of a blockquote over two lines of text at this width.

1. An ordered list
2. with `inline code`
3. and a [link](/projects/lbm).

[^bgk]: The viscosity comes from the relaxation time: $\nu = (\tau - 1/2)/3$ in lattice units.
