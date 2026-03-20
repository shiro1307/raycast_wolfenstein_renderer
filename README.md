# JS Raycasting Engine

A 2.5D raycasting engine built from scratch with JavaScript and HTML5 Canvas. Inspired by classic games like [Wolfenstein 3D](https://en.wikipedia.org/wiki/Wolfenstein_3D), this project turns a simple 2D grid map into a convincing 3D perspective using rays, trigonometry, and real-time rendering.

Includes performance benchmarking and stress testing to evaluate real-time rendering limits.

![2026-02-20 22-29-38 (online-video-cutter com)(2)](https://github.com/user-attachments/assets/cd762768-0299-4181-8c92-6f0553fbd750)

---

## Features

- Grid-based map with walls
- **_DDA raycasting_** for accurate wall detection
- Field of view projection with **_fisheye correction_**
- Distance-based wall scaling and shading
- Smooth player movement with collision detection
- Interactive minimap showing player and rays
- Real-time rendering loop
- Real-time **_performance profiling (FPS, frame time)_**
- Stress-tested with **_large procedural maps_**

---

## Performance Benchmarks

The engine was profiled under increasing ray counts to evaluate scalability and real-time rendering limits. Testing was conducted on large procedural maps to simulate worst-case traversal scenarios.

### Test Conditions

- Map Size: **800 × 800 (~640k cells)**
- Renderer: **HTML5 Canvas**
- Measurement: **Uncapped FPS + frame time (ms)**
- Hardware: Intel EVO i7

### Results

| Rays per Frame | FPS (uncapped) | Frame Time (ms) |
| -------------- | -------------- | --------------- |
| 1500           | ~150           | ~6–7 ms         |
| 3000           | ~90            | ~11 ms          |
| 5000           | ~70            | ~14 ms          |
| 8000           | ~60            | ~16–17 ms       |

### Summary

- Sustains **real-time performance (~60 FPS)** up to ~**8000 rays per frame**
- Demonstrates **near-linear scaling** with increasing ray count
- Maintains stable performance even on **large maps (~640k cells)**

### Key Insight

Performance is primarily bounded by **per-ray computation cost**, not map size, indicating efficient spatial traversal.

## Controls

- `W` / `S` – Move forward / backward
- `A` / `D` – Strafe left / right
- `Arrow Left` / `Arrow Right` – Rotate player

---

## Future Scope

- Add textures for walls and floors
- Render sprites for objects and enemies
- Enhanced lighting and shading effects
