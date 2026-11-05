---
headline: "Vision Voyager"
meta: "EPFL · CS-503 Visual Intelligence · spring 2025 · team of 2"
lede: "Voyager is an agent that learns Minecraft by writing its own code. It was blind, and it ran on GPT-4. I gave it eyes, and tried it on open-source models."
---

## The situation

Voyager (NVIDIA) plays Minecraft by writing JavaScript skills, keeping the ones that work in a library and reusing them later. It only reads text: its inventory, its position, the blocks around it. It never sees what it builds. And it depends on GPT-4, which is expensive and closed.

## The system

- I captured the bot's first-person view and fed it to a vision-language model in the curriculum agent, which picks the next task, and in the critic, which checks the task was done.
- I served open models with Ollama on the SCITAS cluster (DeepSeek, Gemma, Mistral, Llama, from 7B to 32B; Codestral and Mistral Small for the code) and benchmarked them against GPT-4.1.
- I added run resumption, then compared runs with and without vision, with and without the skill library, and with one or three images.

## Results

Three full runs, and 172 skills written by the agent itself.

- **With vision, it builds better.** A coherent house with a door and windows, where the text-only agent stacks blocks. It crafts a diamond pickaxe right after mining diamonds.
- **But not faster.** In free exploration, runs with vision discover fewer items in 160 iterations (48 to 54, against about 65 text-only), and the golden sword takes 35 iterations instead of 20.
- **Open models fall behind.** Mistral Small with Codestral plateaus around 16 items, against about 65 for GPT-4.1.

## What I learned

Vision made the agent build better, not faster, and the metric we started with (items discovered) could not see that. The open models I could run were far from GPT-4.1: that gap is the question my master thesis picks up.
