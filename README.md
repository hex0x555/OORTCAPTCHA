# Welcome to OORTCaptcha 

## Project info

OORT takes in data from a decentralized community of data contributors. This data is currently validated by a validator community that is rewarded for their work. The validated data is then submitted to OORT Datahub. The issue with this is that there’s so way to prevent data validators from validating data that they have also contributed, which is a conflict of interest and not an accurate way to ensure correctness of the data-labelling. It also isn’t scalable as the volume of community contributed data flows into OORT. 

Our solution is an AI data labelling and on-chain data validation protocol. OORTCaptcha increases sybil resistance in data validation by reducing the reliance on a subset of OORT users who validate community contributed data, and expands the network of data validators to any user of the internet through a familiar process: CAPTCHA verification. 

Our machine-learning model is trained on OORTs pre-validated data in the Datahub, randomly picks a set of images from the dataset and makes a prediction of the object in the image. This annotation prediction generates a CAPTCHA prompt which presents a set of images for the user to validate the prediction of the AI. Once the user verifies the images, the annotation data and the image link hosted on OORT data storage is hashed on chain. Reinforcement learning is trained on the hashed metadata, and as new images are contributed to OORT, our AI agent is able to correctly predict the label with 88% accuracy and bypass the need for the human-driven data validation. This prediction is sent to CAPTCHA for human verification. This creates a machine-learning data validation pipeline and continues to train and reinforce the model. As the model improves, the prediction accuracy is expected to improve significantly. 

Not only does this improve the data labeling pipeline for OORT, but it also enables the decentralized network of data contributors to be rewarded for contributing valid data through token rewards, reputation, or any other metric by having an on-chain ledger of provable data validation. For the human validators performing the CAPTCHA, their participation in our protocol can be used as a proof of humanity metric which can be further implemented into other protocols or SDKs, such as Gitcoin Passport. 


## What technologies are used for this project?

This project is built with 

- Tensorflow
- Sepolia
- Sample dataset provided by OORT
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
