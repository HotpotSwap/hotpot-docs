---
id: hotpot-protocol
title: Hotpot 跨链协议
skug: /reference
sidebar_position: 1
---

Author: [ZeroOne Team](https://01.finance/) Version: 0.1

## Abstract

HotPot Protocol is a decentralized cross-chain swap solution for cryptocurrencies implemented by a set of robust, non-upgradable smart contracts. HotPot Protocol helps users (incl. smart contracts) to seamlessly swap cryptocurrencies on different blockchain networks. It's fast, decentralized, safe, low-cost and with zero slippage. Ultimately, HotPot Protocol will support the requirements to develop programmable cross-chain DeFi.

## Why Hotpot Protocol?

To serve the needs of Flux Protocol's cross-chained lending and borrowing, existing solutions could not meet all requirements. Therefore, in order to achieve true cross-chain lending and borrowing, ZeroOne Labs has developed its own cross-chain solution: HotPot Protocol. The following two points discuss problems HotPot solve:

### Hotpot vs AMM

Existing cross-chain swaps (e.g.: AnySwap, O3) are based on an AMM architecture and require liquidity providers to inject liquidity and the token prices are based on the equation x*y=k.

When users need to cross-chai swap a large amount of assets, the token price will be impacted when the liquidity of the liquidity pair (LP) isn't sufficient. For example, a user wants to cross-chain swap 100,000 DAI for 500 BNB (hypo. market price 1000 DAI / BNB) but can only swap 100,000 DAI for 450 BNB because of insufficient liquidity causing a token price impact and slippage. If the liquidity is small, even small swap orders will experience high price impacts.


Liquidity is of high-priority for swaps! To eliminate the liquidity problem, HotPot will credit borrow (non-collateralized) from ZeroOne's Flux Protocol. During a cross-chain swap, if the liquidity isn't sufficient, HotPot will borrow the required assets to increase the missing liquidity. Once the liquidity is sufficient (or any other given time) HotPot Protocol will pay the outstanding borrowings to Flux Protocol.


Not only does the credited borrow on Flux Protocol resolve the liquidity problems, it also increases Flux Protocol's money market utilization rate.

At the same time, HotPot Protocol also allows any address to provide liquidity through incentives. To eliminate impermanent loss, HotPot's liquidity will be provided by single assets and receive rewards without risks.

### HotPot vs Deposit & Withdrawal

Imagine a user urgently needs to cross-chain 100 ETH from BSC to OEC (OKexChain) to participate in liquidity mining or other DeFi activity. The user needs to:

1) Deposit the 100 ETH from BSC into their centralized Binance Exchange account
2) Withdraw from Binance Exchange and deposit into their Okex Exchange account
3) Withdraw from their Okex Exchange account into the OEC wallet

Even without all 2FA, email verifications, endless clicks and personal security checks, the whole process takes at least 20 minutes. This time consumption is also based on the prerequisite that the user has completed their KYC on both centralized exchanges, without it, the whole process can even take up-to days.


![image-20210813205904914](assets/image-20210813205904914.png)

To provide the industry with a more seamless cross-chain solution, HotPot Protocol reduces wasted operational time of cross-chaining crypto assets to less than 3.5 minutes (depending on the network), one-click and without KYC. Effortless and decentralized!

However, the above solution requires HotPot Protocol to have sufficient liquidity on all networks, and a decentralized cross-chain solution to time-efficiently cross-chain assets.


## Protocol Architecture

### System Architecture

![image-20210813162036099](assets/image-20210813162036099.png)

1. **LP** : Individual or grouped liquidity providers; Flux V1 credit-based borrowing to make up reinforce liquidity; any wallet address can provide liquidity to HotPot Protocol.
2. **Gateway** : Responsible for processing cross-chain swaps and multi-chain communication.
3. **Vault** : Token vault is the treasury allocated separately for each individual token. The assets of liquidity providers are kept in the vault, and no one can directly use the vault.
4. **Cross Bridge**: Cross-chain bridge; any cross-chain swap order information is communicated to the destination network via the Cross Bridge to ensure the correct release of assets on the target network.



### Token

In the early stage, Flux V1 will provide the necessary liquidity, therefore the selection of assets that can be swapped cross-chain are limited by Flux Protocol’s money markets on each network. The initial assets HotPot Protocol enables cross-chain swaps are: USDT, USDC, DAI, BTC, ETH. The first implementation of HotPot Protocol will only support 1:1 cross-chain swaps of the same asset.

Only a minimal amount of gas fee is necessary to cross-chain swap the above mentioned scenario with one-click through HotPot Protocol. Transactions depend on each network’s transaction confirmation time. To transfer ETH from BSC to OEC only takes 3.5 minutes.

| Network        | Cross Bridge Transaction Confirmation Time |
| --------- | ---------------------- |
| Ethereum  | 12 blocks, ~ 10 minutes|
| BSC       | 21 blocks, ~ 63 seconds|
| HECO      | 21 blocks, ~ 63 seconds|
| OKEXChain | 21 blocks, ~ 63 seconds|

![assets/image-20210813162219332.png](assets/image-20210813162219332.png)

### Liquidity  {#liquidity}

HotPot Protocol’s liquidity can be provided by multiple parties. Liquidity providers can be individual wallet holders or liquidity aggregators. To mitigate and kick-start HotPot’s initial liquidity, credited borrowings from Flux V1 will inforce missing liquidity. When liquidity is insufficient, HotPot will borrow from Flux V1, and once the liquidity is sufficient, the credited outstanding borrowings will be returned to Flux Protocol.


Costs of borrowing interests are shared amongst all liquidity providers, and the total amount of costs is determined by the cross-chain swap's fees and the duration of the borrowings.

```txt
Liquidity Provider Income = Cross-Chain Swap Fee Dividends + FLUX Borrowing Incentives - Borrowing Interests * Amount * Duration
```


Example, USDT Borrowing APY is 13 %, Flux borrowing incentives are 8.25%, cross-chain swap fee dividends are 0.21%, and the outstanding borrowings are returned in 12hours:


```
Liquidity Provider Income = Amount * 0.21% + Amount * 8.25% / 365 * 0.5 - Amount * 13% / 365
(Amount equals the amount of tokens to be cross-chained)
```

The Liquidity Provider Income is determined by the amount of swaps, the higher the assets utilization rate, the higher the income.


> Notice! The upper limit of any credited borrow on Flux V1 to Hotpot Protocol is $1 Million, once the upper limit is reached, the credited borrow is unavailable.

### Cross-chain transaction {#trade}

When a user cross-chains swaps all assets through Hotpot Protocol into a target network, the Cross Bridge is responsible for communicating the cross-chain information between the source and target network.

![assets/image-20210813161835125.png](assets/image-20210813161835125.png)

Example: User cross-chain swaps 10 BTC from network A (source) to network B (target):

1. 10 BTC are transferred into network A's BTC vault
2. Hotpot network A sends the cross-chain swap information (From: User; To: User; SourceChain: network A; TargetChain: network B; Amount: 10 BTC; Fee: 0.03 BTC)
3. Cross Bridge monitors and receives the cross-chain swap initiation information and automatically initiates the swap's transaction on network B)
4. Network B's Hotpot receives the cross-chain information and transfers 10-0.03 BTC to user. When the liquidity in the BTC Vault is insufficient, the order remains in a pending status, and resumes automatically once the liquidity is sufficient


### Transaction Fees {#trade-fee}

Two transaction fees are required to cross-chain swap into another network with one click, these two transaction fees are listed below:


1. **Cross-chain swap fees** : transaction fees required by the Cross Bridge's infrastructure due to the target chain's native transaction fees aka gas fees, e.g. BNB on BSC network.

  ```txt
  Bridging Fees = Target Network Gas Fees * Target Network Asset Price / Source Network Asset Price
  ```


1. **transaction fee**：

   The default transaction fee asset collected by Hotpot is $FLUX, but the cross-chain asset can also be used to pay for the cross-chain fee. Most of the collected transaction fees are distributed to liquidity providers.


   1. Hotpot will give a 20% rebate to users using $FLUX as the payment medium for transaction fees. With the rebate the transaction fee is 2.4%.
   2. Cross-Chain Asset Amount * Asset Price * 0.0024 / $FLUX Price.

  Users using the cross-chain asset as the payment medium for transaction fees, the transaction fee is 3%.

![assets/image-20210813162355632.png](assets/image-20210813162355632.png)

### Liquidity Rebalance {#liquidity-rebalance}

When certain assets on a specific network are in high demand (due to DeFi FOMO etc.) the liquidity across the networks may be subject to imbalance. To maintain a well-balanced cross-chain across the different networks, Hotpot monitors each network’s liquidity, and automatically adjusts any below-threshold liquidity through advance funds.

Threshold: the ideal liquidity distribution ration of each network is determined based on the cross-chain transaction volume of each network in the past 12 hours. If the vault balance falls below 40%, the position needs to be adjusted.

![image-20210813162427045](assets/image-20210813162427045.png)

### Cross-chain bridge and risk prevention {#risk}

The cross-chain infrastructure is responsible for communicating the orders from Network X to Network Y. To meet Hotpot's cross-chain requirements well-known bridges (Chainlink, Multichain formerly AnySwap, Poly Network) are selected as Hotpot's bridge.

Hotpot doesn’t directly trust any Bridge and adopts a mixed use and secondary confirmation method to avoid a single cross-chain bridge from malicious behaviour (or vulnerability to exploitation). Hotpot Protocol’s cross-chain swap execution requires at least two cross-chain bridges to be separately confirmed according to Hotpot's risk prevention strategy before it can be processed. The risk prevention strategy requires medium to large sized swaps to be confirmed twice, while small sized swaps only need one confirmation by any of the cross-chain bridges.

At the same time, to prevent malfunction of any bridge solution causing troubles for the secondary confirmation, Hotpot is constantly monitoring, and will activate plus allow backup services to complete the secondary confirmation when the requirements are met.


### Programmable cross-chaining {#program-cross}

In the multi-chain era, Hotpot Protocol's vision is to support DeFi developers to create cross-chain products in a secure environment and in a secure fashion. Developers will have access to a unified cross-chain interaction API (applicable to various mainstream networks). DeFi develops shall not worry about single points of failure of cross-chain bridges, and have the ability to seamlessly switch between networks.

Built on Flux Protocol's lending and borrowing scenario at first, Hotpot will further explore and improve for future use-cases. Hotpot aims to provide basic service solutions, such as cross-chain DeFi SDK, including NPM and Multichain Smart Contract Protocol packages.

## Roadmap {#map}

- [x] v1: 主流 Token 跨链兑换
- [ ] v2: 支持任意 Token 跨链兑换
- [ ] v3: 支持任意 DeFi 可编程跨链