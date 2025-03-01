
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CopyIcon, ArrowDownIcon } from 'lucide-react';
import NetworkSelector from './NetworkSelector';
import TokenAnimation from './TokenAnimation';

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
    tokenSymbol: 'ETH',
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
    tokenSymbol: 'MATIC',
  },
  {
    id: 'optimism',
    name: 'Optimism Goerli',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 14L12 10L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    tokenSymbol: 'OP',
  },
];

const FaucetForm = () => {
  const { toast } = useToast();
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<typeof networks[0] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  const handleNetworkSelect = (network: typeof networks[0]) => {
    setSelectedNetwork(network);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(transactionHash);
    toast({
      title: "Copied to clipboard",
      description: "Transaction hash copied to clipboard",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedNetwork) {
      toast({
        title: "Network required",
        description: "Please select a network first",
        variant: "destructive",
      });
      return;
    }
    
    if (!walletAddress) {
      toast({
        title: "Wallet address required",
        description: "Please enter your wallet address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTransactionHash('0x' + Math.random().toString(16).substr(2, 64));
      
      toast({
        title: "Tokens sent!",
        description: `${selectedNetwork.tokenSymbol} tokens have been sent to your wallet`,
      });
      
      // Reset success state after animation
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 2000);
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
        
        <div className="pt-4">
          <button 
            type="submit" 
            className="faucet-button w-full"
            disabled={isLoading || !selectedNetwork}
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
