---
headline: "Robots that see"
meta: "HES-SO · bachelor · Nov 2022 – summer 2023 · P3 project, then bachelor thesis"
lede: "First, a small NVIDIA robot that stops on its own when its camera sees a target. Then, vine mildew spotted on a leaf, fast enough to run on the same robots."
---

## The situation

Part one, the P3 project (Nov 2022 – Feb 2023): two NVIDIA robots to assemble and bring to life, a JetRacer Pro and a Sparkfun kit, both on a Jetson Nano, with one goal: stop when the camera sees a target. Part two, my bachelor thesis (summer 2023): take the same embedded setup to a real problem, spotting mildew on vine leaves.

## The system

- I built a custom system image (a minimal JetPack 4.6.1 with PyTorch, TensorRT and JupyterLab), flashed it on both robots, and trained on a remote GPU server.
- I took the datasets with the robot's own camera (facing the target, at an angle, far away, half out of frame), then trained AlexNet for classification and MobileNet-SSD for detection. Live demo on 2 February 2023.
- For the mildew, I cleaned about 1,000 hand-annotated images (converting their polygons), compared classification, detection and segmentation, and exported the models to ONNX to run with jetson-inference.

## Results

- Segmentation (FCN-ResNet50): **mIoU 76.5 %**, 93 % pixel accuracy, at 142 FPS.
- Classification (EfficientNet-b0): 92 % accuracy, at 32 FPS. Detection: mAP 0.57 on the test set.

The P3 was graded 6.0 / 6. Bachelor projects: this is where I learned to put a model on a robot, not a robotics specialty.
