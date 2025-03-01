
import { useState, useEffect } from 'react';
import { CoinsIcon, GlobeIcon, WalletIcon } from 'lucide-react';
import FaucetForm from '@/components/FaucetForm';

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
                  <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
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
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Free Testnet Tokens
              </div>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                Get Testnet Tokens <span className="text-primary">Instantly</span>
              </h1>
              <p className={`text-lg text-muted-foreground mx-auto max-w-2xl transition-all duration-700 delay-150 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
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

        <section id="faq" className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="text-lg font-medium mb-2">What is a testnet faucet?</h3>
                <p className="text-muted-foreground">
                  A testnet faucet is a web application that provides free tokens for blockchain test networks. These tokens have no real-world value but allow developers to test their applications without using real cryptocurrency.
                </p>
              </div>
              
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="text-lg font-medium mb-2">How many tokens can I request?</h3>
                <p className="text-muted-foreground">
                  The amount varies by network, but we provide enough tokens for basic testing purposes. If you need more, you can make another request after 24 hours.
                </p>
              </div>
              
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="text-lg font-medium mb-2">Which networks are supported?</h3>
                <p className="text-muted-foreground">
                  We currently support Ethereum testnets (Goerli, Sepolia), Polygon Mumbai, Arbitrum Goerli, Optimism Goerli, and more. We regularly add support for new testnets.
                </p>
              </div>
              
              <div className="p-6 bg-background rounded-lg border">
                <h3 className="text-lg font-medium mb-2">Is there a rate limit?</h3>
                <p className="text-muted-foreground">
                  Yes, to prevent abuse, we limit requests to once per day per IP address and wallet address. This ensures fair distribution of testnet tokens to all users.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CoinsIcon className="h-5 w-5 text-primary" />
              <span className="font-medium">TestnetFaucet</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TestnetFaucet. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
