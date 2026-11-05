---
headline: "UnHateMeme"
meta: "EPFL · EE-559 Deep Learning · spring 2026 · team of 3"
lede: "Spotting a hateful meme is a known problem. Repairing it, while changing the image as little as possible, is not. We built a pipeline that does both, with open-weight models."
---

## The situation

Moderation usually stops at detection: the meme is flagged, or removed. We wanted to go one step further, neutralise the hateful part and keep the rest of the meme. No image from the dataset appears on this page: the originals are hateful, and their licence doesn't allow it.

## The system

- A vision-language model decides whether the meme is hateful, describes what is harmful and plans the edit; a FLUX diffusion model rewrites the image.
- I fine-tuned the detection (LoRA, a classification head, a weighted loss) and compared prompt variants, with Grad-CAM to see where the model looks.
- I ran the experiments as a reproducible grid, with repeated runs and GPU batching on the cluster.

## Results

- **84 %** of hateful memes are judged non-hateful after the rewrite with Gemma 4, with no fine-tuning, against 63 % for the next best (Qwen 3.6 with LoRA).
- Best detection: AUROC 0.755, F1 0.71, with synthetic few-shot examples.

Means over repeated runs, EE-559 report, EPFL, 2026. These metrics are proxies: none of them says whether the repaired meme keeps its humour, and the report says so.

## What I learned

LoRA raised recall without making detection better: it moved the decision threshold, not the model's ability to tell memes apart. It also roughly halved visual similarity to the original, because the fine-tuned models wrote more aggressive edits.
