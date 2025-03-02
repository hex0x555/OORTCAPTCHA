import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { useSignMessage } from "wagmi"


const ConnectAndSignWagmi: React.FC<{ onSignature: (signature: string) => void }> = ({ onSignature }) => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const { signMessage } = useSignMessage({
    onSuccess(data) {
      console.log("Signature:", data);
      onSignature(data);
    },
  });

  if (!isConnected) {
    return (
      <div>
        {connectors.map((connector) => (
          <button key={connector.id} onClick={() => connect({ connector })}>
            Connect with {connector.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      <p>Connected: {address}</p>
      <button onClick={() => signMessage()}>Sign Message</button>
      <button onClick={() => signMessage({ message: "Hello from Wagmi!" })}>Sign Message</button>
    </div>
  );
};

export default ConnectAndSignWagmi;