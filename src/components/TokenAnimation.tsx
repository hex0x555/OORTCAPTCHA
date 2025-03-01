
import { useEffect, useState } from 'react';
import { CoinsIcon } from 'lucide-react';

interface TokenAnimationProps {
  isActive: boolean;
  tokenSymbol: string;
}

const TokenAnimation = ({ isActive, tokenSymbol }: TokenAnimationProps) => {
  const [coins, setCoins] = useState<number[]>([]);
  
  useEffect(() => {
    if (isActive) {
      // Create multiple coins with slight delays
      const newCoins = [];
      for (let i = 0; i < 5; i++) {
        newCoins.push(i);
      }
      setCoins(newCoins);
      
      // Reset after animation completes
      const timer = setTimeout(() => {
        setCoins([]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="relative h-24 w-full overflow-hidden my-6">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Pulse background */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring"></div>
          
          {/* Central coin */}
          <div className="relative z-10 p-4 rounded-full bg-primary text-primary-foreground">
            <CoinsIcon size={32} />
          </div>
          
          {/* Falling coins */}
          {coins.map((coin, index) => (
            <div 
              key={index} 
              className="absolute z-20"
              style={{
                top: '-20px',
                left: `${15 + (index * 10)}px`, 
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="text-primary font-bold animate-coin-drop text-xs">
                +{tokenSymbol}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenAnimation;
