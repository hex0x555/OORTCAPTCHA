
import { useState, useEffect } from 'react';
import { CoinsIcon, GlobeIcon, WalletIcon } from 'lucide-react';
import FaucetForm from '@/components/FaucetForm';
import { toast } from 'sonner';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
 
  
  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex justify-between items-center">
            <div className={`flex items-center gap-2 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              <CoinsIcon className="h-6 w-6 text-primary" />
              <span className="font-medium text-xl">TestnetFaucet</span>
            </div>
            <nav className={`transition-all duration-500 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              <ul className="flex items-center gap-6">
                <li>
                  <a href="#how-it-works" className="text-sm text-yellow-100/80 hover:text-yellow-100 transition-colors">
                    How it Works
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-20">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <div className="inline-block px-3 py-1 rounded-full bg-yellow-100/20 text-yellow-100 text-sm font-medium mb-4">
                Free Testnet Tokens
              </div>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                MoonDrip 🌙
              </h1>
              <p className={`text-lg text-yellow-100/80 mx-auto max-w-2xl transition-all duration-700 delay-150 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                Request tokens for testing your applications on popular blockchain test networks. Simple, fast, and completely free.
              </p>
            </div>

            <div className={`glass-card rounded-xl p-6 md:p-8 max-w-4xl mx-auto shadow-xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <FaucetForm />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 bg-secondary/50">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <GlobeIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">1. Select Network</h3>
                <p className="text-muted-foreground">
                  Choose from our supported test networks where you need tokens.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <WalletIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">2. Enter Address</h3>
                <p className="text-muted-foreground">
                  Input your wallet address to receive the testnet tokens.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CoinsIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">3. Receive Tokens</h3>
                <p className="text-muted-foreground">
                  Tokens will be sent to your wallet immediately with no wait time.
                </p>
              </div>
            </div>
          </div>
        </section>
   
      </main>

      <footer className="py-8 border-t border-blue-900/30">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CoinsIcon className="h-5 w-5 text-yellow-100" />
              <span className="font-medium text-yellow-100">TestnetFaucet</span>
            </div>
            
            <div className="text-sm text-yellow-100/60">
              © {new Date().getFullYear()} TestnetFaucet. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
