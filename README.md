# Welcome to OORTCaptcha 

## Background

OORT aggregates data from a decentralized network of data contributors. This data is currently verified by a validator community that is incentivized for their work. The validated data is then submitted to OORT Datahub. The problem is that there’s no way to prevent validators from verifying data they’ve contributed themselves, creating a conflict of interest and compromising the accuracy of data labeling. This data validation method also lacks scalability as the volume of community contributed data continues to grow. 

## Our project

OORTCaptcha is an AI data labeling and on-chain data validation protocol; it serves as a scalable solution that enhances the data validation process. OORTCaptcha enhances sybil resistance by decentralizing data validation and expanding the network of data validators to any user of the internet through a familiar process: CAPTCHA verification. 

Our machine learning model is trained on OORT’s pre-validated DataHub dataset and randomly selects an image from the community-contributed data to generate an annotation prediction. This prediction is then used to create a CAPTCHA prompt, presenting a set of images for users to validate the AI’s classification. Once the user verifies the images, the annotation data and the corresponding image link, hosted on OORT’s data storage, are hashed on-chain. 

Reinforcement learning is applied to the hashed metadata, continuously training the model. As new images are contributed to OORT, our AI agent is able to correctly predict the label with 88.3% accuracy and bypass the need for the human-driven data validation. These AI-generated predictions are sent to CAPTCHA for human verification, creating a machine-learning data validation feedback loop that continues to train and reinforce the model. As the model improves, the prediction accuracy is expected to improve significantly, making the validation process more efficient and scalable

The protocol not only streamlines OORT’s data labeling pipeline but also introduces a transparent and incentivized validation mechanism for the decentralized network of data contributors. By recording data validation on-chain, contributors can be rewarded with tokens, reputation scores, or other incentive mechanisms, generating value, accountability, and accuracy in the dataset. This verifiable ledger of data validation creates a trustless environment where high-quality contributions are provably recognized.

The on-chain engagement of human validators solving the CAPTCHA can also serve as a proof-of-humanity metric which can be integrated into broader identity verification frameworks or SDKs, such as Gitcoin Passport, to establish credibility in other applications. OORTCaptcha’s innovative solution not only strengthens AI training and data validation but also expands its utility across Web3 ecosystems, reinforcing sybil resistance and human verification at scale.
