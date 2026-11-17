---
headline: "UnHateMeme"
meta: "EPFL · EE-559 Deep Learning · spring 2026 · team of 3"
lede: "Spotting a hateful meme is a known problem. Repairing it, while changing the image as little as possible, is not. We built a pipeline that does both, with open-weight models."
---

## The situation

Moderation usually stops at detection: the meme is flagged, or removed. We wanted to go one step further, neutralise the hateful part and keep the rest of the meme. No image from the dataset appears on this page: the originals are hateful, and their licence doesn't allow it.

## The system

- A vision-language model decides whether the meme is hateful, describes what is harmful and plans the edit; a FLUX diffusion model rewrites the image.
- Fine-tuning on the dataset's yes / no labels alone made the model collapse to near-trivial answers. So I used Claude as a teacher: for each training meme, it wrote a structured annotation (why it is hateful, the type of hate, an edit plan), anchored on the human label, with the evaluation memes held out.
- On these annotations I fine-tuned the VLMs with LoRA and QLoRA, one adapter to detect and one to plan the edit. As a cheaper option, I trained a linear classification head on top of the frozen model. I also compared prompt variants, with Grad-CAM to see where the model looks.
- I ran the experiments as a reproducible grid, with repeated runs and GPU batching on the cluster.

## Results

- **The cheapest adaptation did best.** A linear head on the frozen model matched or beat every other option on all three VLMs; on Qwen 3.6 it took detection from 0.71 to 0.84 AUROC.
- LoRA on Claude's annotations clearly helped both Qwen models (Qwen 3.6: 0.71 → 0.80). Gemma 4, the strongest model without any training, gained little.

With 490 memes, gaps under about 0.04 AUROC are within noise.

## Try it

An example I drew to show the idea: not a real output, and not from the dataset. The caption stays, only the picture changes, and the joke stops being cruel. Drag to compare.

## What I learned

- **Our repair score could not rank models.** The model that edited a meme also judged whether the result was still hateful, so a lenient judge passed for a good editor. When LoRA made Gemma 4 flag more memes, its own repair score fell from 84 % to 51 %: that says as much about the judge as about the edits. Comparing models needs one fixed judge, checked against people first. It is how I build evaluation now: [Agentic evaluation →](/projects/agent-evaluation)
- LoRA also roughly halved visual similarity to the original, likely because the fine-tuned models learned to rewrite more of the scene.
