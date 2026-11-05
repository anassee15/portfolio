---
headline: "STEM tutor"
meta: "EPFL · CS-552 Modern NLP · spring 2025 · team of 4"
lede: "A small open-source model (0.6B parameters) that answers science multiple-choice questions like a tutor."
---

## The situation

We built the data (24k STEM multiple-choice questions, preference triplets, 62k Wikipedia and arXiv documents), fine-tuned Qwen3-0.6B with SFT then DPO, added retrieval with a fine-tuned encoder, and quantised the model with QLoRA. The models and datasets are published on Hugging Face.

## Results

- **+4 %** accuracy after SFT, and 73 % reward accuracy for the DPO model.
- QLoRA 4-bit halves the model, from 1.1 to 0.5 GB, at equal accuracy.
