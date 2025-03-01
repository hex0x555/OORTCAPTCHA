
import { useState } from 'react';
import { WalletIcon, ArrowRightIcon } from 'lucide-react';

type Network = {
  id: string;
  name: string;
  icon: React.ReactNode;
  tokenSymbol: string;
};

interface NetworkSelectorProps {
  networks: Network[];
  selectedNetwork: Network | null;
  onNetworkSelect: (network: Network) => void;
}

const NetworkSelector = ({ 
  networks, 
  selectedNetwork, 
  onNetworkSelect 
}: NetworkSelectorProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-4 text-center md:text-left text-yellow-100">
        Select Network
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {networks.map((network) => (
          <div
            key={network.id}
            className={`network-card ${selectedNetwork?.id === network.id ? 'active' : ''}`}
            onClick={() => onNetworkSelect(network)}
          >
            <div className="p-3 rounded-full bg-blue-800/50 mb-3 text-yellow-100">
              {network.icon}
            </div>
            <h4 className="font-medium">
              {network.name}
            </h4>
            <p className="text-sm text-yellow-100/70 mt-1">
              {network.tokenSymbol}
            </p>
            {selectedNetwork?.id === network.id && (
              <div className="absolute top-3 right-3 text-yellow-100">
                <ArrowRightIcon size={16} className="opacity-75" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkSelector;
