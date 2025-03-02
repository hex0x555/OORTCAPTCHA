import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { MetaMaskProvider } from '@metamask/sdk-react';
import React from "react";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <MetaMaskProvider debug={false} sdkOptions={{
      logging:{
          developerMode: false,
        },
        checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
        dappMetadata: {
          name: "OOR TCaptcha",
          url: window.location.host,
        }
    }}>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </MetaMaskProvider>
  </React.StrictMode>
);

// // export default App;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import Web3 from 'web3';
// import './App.css'; // Import the CSS file

// function App() {
// 

//   return (
//     <div className="App">
//       <h1>OORT CAPTCHA</h1>
//       <div className="captcha-grid">
//         {gridImages.map((image, index) => (
//           <img
//             key={index}
//             src={`data:image/png;base64,${image}`}
//             alt="captcha"
//             onClick={() => handleImageClick(index)}
//             className={selectedImages.includes(index) ? 'selected' : ''}
//           />
//         ))}
//       </div>
//       <button onClick={handleVerifyCaptcha}>Verify CAPTCHA</button>
//       {/* <button onClick={handleSignMessage}>Sign Message</button> */}
//       <button onClick={handleVerifySignature}>Verify Signature</button>
//     </div>
//   );
// }

export default App;