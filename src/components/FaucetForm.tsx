import { useEffect, useState } from 'react';
import { CopyIcon, ArrowDownIcon } from 'lucide-react';
import NetworkSelector from './NetworkSelector';
import TokenAnimation from './TokenAnimation';
import CaptchaGrid from './CaptchaGrid';
import axios from 'axios';
import { toast } from 'sonner';
import { useSDK } from '@metamask/sdk-react';
import { MetaMaskSDK } from "@metamask/sdk"

const MMSDK = new MetaMaskSDK()
const provider = MMSDK.getProvider()

async function handleConnectAndSign() {
  try {
    const signature = await MMSDK.connectAndSign({ msg: "Hello in one go!" })
    console.log("Signature:", signature)
  } catch (err) {
    console.error("Error with connectAndSign:", err)
  }
}

const networks = [
  {
    id: 'ethereum',
    name: 'Ethereum Testnet',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9978 2L11.8435 2.53101V15.7785L11.9978 15.9327L18.1459 12.143L11.9978 2Z" fill="#343434"/>
      <path d="M11.9978 2L5.84961 12.143L11.9978 15.9327V9.45377V2Z" fill="#8C8C8C"/>
      <path d="M11.9978 16.9736L11.9109 17.0802V21.7778L11.9978 22L18.15 13.1855L11.9978 16.9736Z" fill="#3C3C3B"/>
      <path d="M11.9978 22V16.9736L5.84961 13.1855L11.9978 22Z" fill="#8C8C8C"/>
      <path d="M11.9978 15.9327L18.1459 12.143L11.9978 9.45377V15.9327Z" fill="#141414"/>
      <path d="M5.84961 12.143L11.9978 15.9327V9.45377L5.84961 12.143Z" fill="#393939"/>
    </svg>,
    tokenSymbol: '',
  },
  {
    id: 'polygon',
    name: 'Polygon Mumbai',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 7L12 12L3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 17L12 12L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    tokenSymbol: '',
  },
  {
    id: 'sepolia',
    name: 'Sepolia Testnet',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    tokenSymbol: '',
  },
];

const FaucetForm = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<typeof networks[0] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  const [gridImages, setGridImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [message, setMessage] = useState('Please verify your identity');
  const [signature, setSignature] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = (success: boolean) => {
    if (success) {
      setVerified(true);
      toast.success("Verification successful!");
    } else {
      toast.error("Verification failed. Please try again.");
    }
  };




  const handleVerifyCaptcha = () => {
    axios.post('http://localhost:5000/verify_captcha', { selectedImages })
      .then(response => {
        if (response.data.result === 'Correct') {
          setVerified(true);
          toast.success('CAPTCHA verified successfully');
          handleConnectAndSign();
        } else {
          toast.error('CAPTCHA verification failed');
        }
      })
      .catch(error => {
        console.error('Error verifying CAPTCHA:', error);
      });
  };

  

  const handleNetworkSelect = (network: typeof networks[0]) => {
    setSelectedNetwork(network);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(transactionHash);
    toast.success("Transaction hash copied to clipboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedNetwork) {
      toast.error("Network required!");
      return;
    }

    if (!walletAddress) {
      toast.error("Wallet address required");
      return;
    }

    if (!verified) {
      setShowCaptcha(true);
      return;
    }

    setIsLoading(true);

   
  };

  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
  };

  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <NetworkSelector 
          networks={networks}
          selectedNetwork={selectedNetwork}
          onNetworkSelect={handleNetworkSelect}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-2 text-center md:text-left text-yellow-100">
            Your Wallet Address
          </h3>
          <input
            type="text"
            placeholder="Enter your wallet address (0x...)"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="faucet-input"
            disabled={isLoading}
          />
        </div>

        <TokenAnimation 
          isActive={isSuccess} 
          tokenSymbol={selectedNetwork?.tokenSymbol || 'TOKEN'} 
        />

        {transactionHash && (
          <div className="p-4 bg-blue-800/30 rounded-lg animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-100/70">Transaction Hash</p>
                <p className="font-mono text-xs sm:text-sm truncate max-w-[240px] sm:max-w-md text-yellow-100">
                  {transactionHash}
                </p>
              </div>
              <button 
                type="button"
                onClick={handleCopyToClipboard}
                className="p-2 hover:bg-blue-700/30 rounded-md transition-colors text-yellow-100"
                aria-label="Copy transaction hash"
              >
                <CopyIcon size={16} />
              </button>
            </div>
          </div>
        )}

        {showCaptcha && (
          <div className="pt-4">
            <CaptchaGrid onVerify={handleVerifyCaptcha} />
            <button 
              type="button" 
              className="faucet-button w-full mt-4"
              onClick={handleVerifyCaptcha}
            >
              Verify CAPTCHA
            </button>
          </div>
        )}

        <div className="pt-4">
          <button 
            type="submit" 
            className="faucet-button w-full"
            disabled={isLoading || !selectedNetwork || showCaptcha}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <ArrowDownIcon size={18} className="mr-2" />
                Request {selectedNetwork ? selectedNetwork.tokenSymbol : 'Tokens'}
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FaucetForm;