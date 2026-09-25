---
type: summary
agent: codex
source: ../../raw/logan-jastremski/2026-09-21-the-bottleneck-isnt-the-chip-with-bubble-boi-ep-166.md
title: "The Bottleneck Isn’t the Chip with Bubble boi | EP 166"
url: https://www.youtube.com/watch?v=qKHzZ14lOVA
publish_date: 2026-09-21
created_at: 2026-09-23T22:16:14Z
blurb: "Bubble boi argues packaging, interconnects, and memory placement govern AI scaling, and favors durable hardware suppliers over competing model labs."
topics: ["ai", "equities"]
---

# The Bottleneck Isn’t the Chip with Bubble boi | EP 166

**Logan Jastremski** · 2026-09-21 · 1:20:25 · [watch](https://www.youtube.com/watch?v=qKHzZ14lOVA)

Chip designer and investor Bubble boi says the useful question in AI hardware is what a system can do economically, not whether one component has a small technical edge. His core bet is that **memory and packaging, both supplied outside Nvidia, increasingly set the pace of AI compute**. He would rather own indispensable hardware and infrastructure than bet on which model lab wins.

## From transistor shrinkage to packaging

Moore's law made transistor density and the returns on new chip investment comparatively predictable. Bubble boi says each new process node now costs vastly more while delivering much smaller density gains. Only a few firms can afford to keep advancing: falling behind loses customers, which in turn removes the money and opportunities needed to improve a node. Clock speeds also stopped rising much because of thermal and switching limits. Multicore CPUs, then GPUs, raised performance by dividing work that can run in parallel; they do little for tasks whose instructions depend on one another.

Graphics and AI both use highly parallel matrix operations. Bubble boi credits Nvidia's lead partly to GPUs designed for programmability, which let them adapt from graphics to scientific computing and then to changing AI workloads. But he thinks future gains depend increasingly on **connecting more dies so they act like one larger chip**, rather than fitting far more transistors into the same area. That makes advanced packaging his “new Moore's law.”

He bought Intel partly because he judged its process investment and EMIB packaging stronger than the market appreciated. His reading of Nvidia's roadmap sharpened that view: successive products require more dies and more high-bandwidth memory (HBM), both constrained by partners' capabilities. He says the proposed four-die Rubin Ultra package has reportedly been scaled back to two packages with two dies each; it has not shipped, and its final design remains uncertain. On reflection, he says printed circuit board makers might have been the better trade. As connected dies move farther apart, the board must carry enough data without degrading the signal. He expects the same challenge to grow with later Nvidia designs.

## Design the rack, not just the chip

Large AI workloads can be split among chips, but the links between them determine how much of that parallelism pays off. Bubble boi distinguishes training, which moves substantial intermediate data and needs bandwidth, from inference, where latency can matter more. A training-oriented interconnect can serve inference, but the software must work around its delays. He contrasts Nvidia's 72-GPU rack and dedicated switches with Google's TPU system, whose chips participate in routing across a much larger connected domain. Better routing can reduce the need to put as much HBM on each chip.

The unit of design is therefore becoming the rack or cluster. Its compute, memory, network, and software must be planned together. Serving a model already benefits from splitting **prefill**, which processes the incoming prompt, from **decode**, which produces subsequent tokens. These stages use hardware differently, so placing them on separate nodes can improve utilization. Bubble boi expects more such specialization. For training, he still regards Nvidia's high compute throughput and bandwidth as strong; further efficiency may depend more on algorithms and moving stored training data between memory tiers than on another chip alone.

This changes which specifications matter. A chip with less on-board memory can still work well if its connected peers supply data quickly enough. Conversely, adding bandwidth to an individual GPU brings limited benefit if traffic stalls at a rack switch or between packages. He argues that designers should choose the interconnect around the workload instead of treating peak GPU throughput as the system's performance.

## Context changes the memory problem

Logan asks whether ever larger models will require ever more accelerator memory. Bubble boi separates model weights from context. Weights may grow less quickly if models reuse them, or if pruning and lower precision remove redundant information. But a service also holds conversations and other context for many simultaneous users. Long histories can occupy a large share of memory even when the advertised context window is difficult to use effectively end to end. Personalization may come from retrieving old conversations, storing more user data, or updating model weights, not simply increasing the live window indefinitely.

Reusing processed context matters because it avoids repeating prefill before each answer. Agent systems particularly benefit: their recurring instructions and conversation state would otherwise be processed again for every call. Bubble boi expects memory and software across the whole serving system to manage this cache. He favors keeping the weights that need fast access in HBM while moving much of the context to cheaper storage, especially flash, and fetching it when needed.

He is less convinced by high-bandwidth flash (HBF) attached to an accelerator. It promises greater capacity at lower cost per bit, and he thinks a controller designed around context's access patterns could manage flash wear. But its bandwidth remains below HBM, while ordinary flash may retrieve less urgent context with similar latency. He says HBF's clearest near-term customers could be buyers unable to obtain HBM, citing secondhand reports of Chinese interest; he stresses that the product and its market are early. A rack of conventional flash, such as Nvidia's proposed approach, may be more useful, though he thinks smarter orchestration and compression can improve on it. No single design is settled: some context might instead be absorbed through post-training or test-time learning.

For an AI lab, **serving more users on the same hardware** may be more valuable than maximizing tokens per second for one user. Caching, flash offload, and scheduling can lower cost per token. CXL interests Bubble boi because attached memory can appear in a familiar programming model, making such offload easier to use. He sees possible value in software that manages data across clusters and in cheaper compute for post-training; many specific suppliers remain private or lack an obvious public-market proxy. He also suggests that firms using agents to cut their own costs, such as insurers, may capture value from adoption.

## Memory locality, power, and useful work

Bubble boi sees more opportunity in where data sits than in raw memory capacity alone. He describes a chip presentation that placed data in memory banks near the compute units that need it. Shorter physical paths can cut latency and power; more local channels can raise usable bandwidth. He is interested in stacking DRAM on logic, though that makes layout and scheduling harder. Knowing *when* a calculation needs a value can also matter more than minimizing every memory-access delay. He is skeptical that optical computing will soon replace electronic matrix multiplication in data centers, arguing that large model dimensions make the physical optical setup unwieldy.

Power efficiency has to be judged against user throughput. Larger batches can serve more people per unit of power, while an exotic low-power chip might sacrifice too much output. Bubble boi says hardware financing, rather than electricity or land, is the dominant cost for a new GPU cloud. He expects servers to add more memory overall, with flash taking much of the increase, while HBM holds the weights that need its bandwidth.

He wants the expensive frontier systems to help discover drugs, materials, or useful mathematics, beyond automating routine computer work. He is unsure what AI labs mean by “pacing the frontier”: slower public releases could redirect compute toward valuable research, serve business interests, or both. A reported mathematical breakthrough, even if real, would not prove comparable ability in every field. He expects open models to commoditize more routine tasks, while truly new discoveries would change AI's value proposition. He and Logan remain bullish that a few valuable discoveries could justify large AI capital spending, but present that as an expectation, not an outcome already demonstrated.

For investing, Bubble boi prefers suppliers whose disappearance would disrupt the whole industry for months—his examples are TSMC and Nvidia—and potentially excellent data-center operators. He doubts the current labs have equally durable moats because models and talent can diffuse between competitors; he views eventual lab listings as possible hedges against a hardware-heavy portfolio. The hosts also question whether “pacing” signals a real spending slowdown while labs continue making multiyear data-center commitments. His position remains long-term bullish on AI demand, with the strongest claim on value in the infrastructure that every lab needs.
