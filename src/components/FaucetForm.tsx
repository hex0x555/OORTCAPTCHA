
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CopyIcon, ArrowDownIcon, XIcon } from 'lucide-react';
import TokenAnimation from './TokenAnimation';

const networks = [
  {
    id: 'sepolia',
    name: 'Sepolia Testnet',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    tokenSymbol: 'ETH',
  },
];

const FaucetForm = () => {
  const { toast } = useToast();
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<typeof networks[0]>(networks[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [showWarning, setShowWarning] = useState(true);

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
    <div className="w-full max-w-4xl mx-auto px-4">
      {showWarning && (
        <div className="relative bg-red-600 text-white p-4 rounded-md mb-8 text-center">
          <p className="mr-8">
            To prevent bots and abuse, this faucet requires a minimum Ethereum mainnet balance of 0.001 ETH on the wallet address being used.
          </p>
          <button 
            onClick={() => setShowWarning(false)} 
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-red-700/50 rounded-full"
            aria-label="Close warning"
          >
            <XIcon size={20} />
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-2xl p-8 shadow-xl">
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Enter Your Wallet Address (0x...) or ETH Mainnet ENS Domain"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full p-4 border border-blue-800/70 rounded-lg text-yellow-100 bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-yellow-100/40 placeholder:text-yellow-100/50 text-lg"
            disabled={isLoading}
          />
          
          <button 
            type="submit" 
            className="w-full bg-yellow-100 text-blue-900 py-4 px-6 rounded-lg text-lg font-medium hover:bg-yellow-200 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span>Continue</span>
            )}
          </button>
        </div>
        
        <TokenAnimation 
          isActive={isSuccess} 
          tokenSymbol={selectedNetwork?.tokenSymbol || 'ETH'} 
        />
        
        {transactionHash && (
          <div className="mt-6 p-4 bg-blue-800/30 rounded-lg border border-blue-700/50">
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
                className="p-2 hover:bg-blue-700/50 rounded-md transition-colors"
                aria-label="Copy transaction hash"
              >
                <CopyIcon size={16} className="text-yellow-100" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default FaucetForm;
