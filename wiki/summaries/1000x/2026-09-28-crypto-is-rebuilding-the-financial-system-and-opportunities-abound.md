---
type: summary
agent: codex
source: ../../raw/1000x/2026-09-28-crypto-is-rebuilding-the-financial-system-and-opportunities-abound.md
title: "Crypto Is Rebuilding The Financial System — And Opportunities Abound"
url: https://www.youtube.com/watch?v=0LiqT2WEd3Y
publish_date: 2026-09-28
created_at: 2026-09-29T22:47:42Z
blurb: "LayerZero’s cofounder argues interoperable assets and integrated trading infrastructure will bring traditional finance on-chain, with Atlas fees supporting ZRO buybacks and burns."
topics: ["crypto"]
---

# Crypto Is Rebuilding The Financial System — And Opportunities Abound

**1000x** · 2026-09-28 · 58:47 · [watch](https://www.youtube.com/watch?v=0LiqT2WEd3Y)

## From broken bridges to a communication layer

LayerZero’s cofounder found Bitcoin through professional poker after US authorities shut down major online poker sites in 2011. Later work in machine learning and early decentralized-exchange trading led his team toward cross-chain infrastructure. While experimenting with a game that used a cheap chain for execution and Ethereum for durable state, they discovered that bridges did not provide the general communication they needed. The larger opportunity was a protocol that let applications trigger events across chains, with bridging as one use case.

He reports **about $150 billion of assets built on LayerZero, $300 billion transferred over its lifetime, and $10–15 billion moved monthly**. It supports roughly 170 chains, including non-Ethereum environments such as Solana, Aptos, Sui, and TON. He describes the core protocol as immutable, making each integration a substantial undertaking; Bitcoin lacks the smart-contract flexibility for the same approach without introducing a separate validator structure.

His thesis requires multiple execution environments, whether two or thousands. Specialized environments can optimize for workloads that general systems handle poorly, though he now expects perhaps five to 30 major general environments rather than thousands. Ethereum and Solana dominate institutional demand, and his last check put roughly half of LayerZero’s volume within Ethereum and its layer-two ecosystem. Assets must move seamlessly between environments for this architecture to work at scale.

## Standards win through useful integrations

He claims LayerZero has roughly 90–91% interoperability market share and that its OFT token standard has consolidated adoption. The reasoning is commercial: issuers and chains gain little from maintaining incompatible versions of the same asset. Stablecoins have increasingly converged on a canonical version per chain; he expects tokenized equities to follow. He prefers proving business value with committed partners to prolonged standards negotiations.

**Tether and PayPal.** He says USDT0 added about $10 billion of assets in its first year by serving chains Tether had considered low-value expansion targets, contributing hundreds of millions of dollars to Tether’s bottom line. Existing deployments, including Arbitrum’s USDT, subsequently migrated to USDT0. PayPal’s PYUSD, previously disconnected across Ethereum and Solana, uses LayerZero; he cites growth from about $300 million to $4–5 billion alongside connectivity and network expansion.

He favors teams with a specific business problem and willingness to build deeply. For ether.fi, LayerZero built sync pools to address restaking from layer twos without a seven-day return journey and lost yield. Other examples include Ethena, Paxos assets, and Ondo’s tokenized equities and Nexus infrastructure. These relationships produce substantial production use; loosely interested partners can remain stuck in proofs of concept.

## Faster transfers still carry finality risk

Messaging speed is partly an issuer’s choice about how much blockchain rollback risk to accept. LayerZero can deliver Ethereum messages quickly, but issuers may choose anything from seconds to much longer waits. The core messaging protocol is established; product work increasingly concerns rapid swaps, execution across assets, regulatory requirements, and transactions of $50–100 million or more.

**Rollbacks remain consequential.** He recalls frequent large Polygon reorganizations, much deeper rollbacks on zero-knowledge chains, and a Cronos rollback after a DeFi hack. Reversing a source chain does not undo transactions already committed on a destination chain. Stablecoin issuers can sometimes freeze or blacklist funds to help rectify losses, but permissionless assets lack that enforcement layer. He estimates a meaningful chain rollback still occurs every three to four months.

Intent-based execution can improve the customer experience by having a solver deliver assets immediately and bear the risk that the source transaction later fails. That prices and transfers finality risk to a counterparty rather than eliminating it.

## Zero targets markets and payments

The team did not initially intend to launch a blockchain. Its research began with dissatisfaction over Ethereum’s scaling approach and upgradable layer-two contracts. Progress in zero-knowledge technology took longer than expected, while a new database structure, QMDB, became a major breakthrough. The guest says their research ultimately reached about two million transactions per second, or roughly one million with Ethereum Virtual Machine overhead.

That capacity changed the product question: ordinary swaps do not need millions of transactions per second, but finance and payments might. **Zero is the new blockchain; Atlas is its specialized trading environment.** Zero uses zero-knowledge technology to support multiple execution environments rather than only a single general-purpose application. Atlas is designed for millions of transactions per second with roughly 10-millisecond block times. LayerZero messaging connects these environments to one another and to external chains.

These are architectural and performance claims about systems under development. Later in the interview, he describes a stable Atlas testnet version at 200,000 transactions per second with sub-millisecond latency, a smaller version at 10,000 with roughly 400-microsecond latency, and a separate research prototype with 28-microsecond median latency. Those figures describe different configurations and stages.

## Atlas combines the exchange infrastructure

Atlas puts matching, settlement, clearing, risk, and credit into one stack. LayerZero will provide the trading engine without operating its own customer-facing exchange. Other companies build the interfaces. Open Atlas serves permissionless markets; institutional deployments are permissioned, typically require identity checks, and operate within applicable licensing rules. An ICE-operated market is offered as a hypothetical deployment, not an announced live product.

The guest names DTCC, ICE, and Citadel among announced partners. He says institutional investments ranged from $10 million to $100 million, primarily in tokens, with some token-and-equity combinations. All investors have token exposure, and the two largest checks were token-only. Most tokens are locked or vest over time. Beyond funding, LayerZero sought partners’ knowledge of market structure and how to bring the technology into production.

He reports four or five of the world’s largest exchanges actively testing on testnet and more than 20 frontends building on Atlas. Several institutions have committed to production deployments, but he withholds names and detailed timing. SEC and CFTC guidance has clarified licensing requirements, though he sees contradictions between older relief and newer guidance. He expects open markets first, followed by institutional launches as partners obtain regulatory certainty.

## How ZRO captures activity

He separates three mechanisms. The existing LayerZero messaging protocol has a governance-controlled fee switch; votes have been strongly favorable but have not reached quorum. His personal expectation is activation within 18 months, rather than a guaranteed schedule. ZRO will also serve as Zero’s native gas token, covering block space and priority fees.

Atlas adds trading-fee revenue. Frontends receive part of the fees, and **75% of the remainder is intended to buy and burn ZRO**. The eventual fee schedule depends on the markets launched: crypto perpetuals, foreign exchange, and equities have different rates and volumes. He argues integrated infrastructure can support competitive total costs while generating token demand through trading activity.

## Tokenization moves from distribution to financial rails

He sees international stablecoin adoption pressuring US institutions to adapt, including banks concerned about deposit competition. He describes DTCC as having a mandate to tokenize about $100 trillion of assets. Institutions are interested both in perpetual futures’ revenues and in replacing fragmented infrastructure: he cites ICE customers maintaining collateral across six clearinghouses and prime brokerage as a $50 billion business.

Today, tokenization mostly distributes existing products to an additional pool of capital. He expects it eventually to change issuance and market infrastructure themselves, including on-chain IPOs. Stablecoins’ integration into Visa, Stripe, and other conventional flows shows how blockchain rails can gradually replace existing systems. Tokenized securities trail stablecoins by several years, but shared infrastructure and broader international distribution provide reasons for adoption. Brokerages may expose these products while hiding the underlying chain from users.

He gives **fall 2026** as the public launch window, with partner coordination, custody, exchange support, and easy deposits still being arranged. LayerZero’s existing asset base should help populate Zero. The host’s closing reference to September is narrower than the guest’s stated window; the guest does not commit to that month.
