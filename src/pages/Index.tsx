
import { useState, useEffect } from 'react';
import FaucetForm from '@/components/FaucetForm';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <header className="py-4 px-4 flex justify-end">
        <div className="bg-white rounded-md px-4 py-2 text-gray-700 font-medium shadow-md">
          Ethereum Sepolia
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center pt-10 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-100 mb-6 tracking-wide font-serif">
            🌙 MoonDrip
          </h1>
        </div>

        <FaucetForm />
      </main>
    </div>
  );
};

export default Index;
