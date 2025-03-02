import React, { useEffect, useState } from 'react';
import { connect, keyStores, WalletConnection, utils } from 'near-api-js';

const App = () => {
  const [wallet, setWallet] = useState(null);
  const [accountId, setAccountId] = useState('');
  const [asset, setAsset] = useState('');
  const [yieldResult, setYieldResult] = useState(null);

  useEffect(() => {
    const initNear = async () => {
      const near = await connect({
        networkId: 'testnet',
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
      });

      const walletConnection = new WalletConnection(near);
      setWallet(walletConnection);

      if (walletConnection.getAccountId()) {
        setAccountId(walletConnection.getAccountId());
      }
    };

    initNear();
  }, []);

  const login = () => {
    wallet.requestSignIn();
  };

  const logout = () => {
    wallet.signOut();
    setAccountId('');
  };

  const handleAssetChange = (e) => {
    setAsset(e.target.value);
  };

  const calculateYield = () => {
    // Placeholder for yield optimization logic
    const yieldValue = asset * 0.1; // Example calculation
    setYieldResult(yieldValue);
  };

  return (
    <div>
      <h1>DeFi Agent</h1>
      {accountId ? (
        <div>
          <p>Logged in as: {accountId}</p>
          <button onClick={logout}>Logout</button>
          <input
            type="number"
            value={asset}
            onChange={handleAssetChange}
            placeholder="Enter asset amount"
          />
          <button onClick={calculateYield}>Calculate Yield</button>
          {yieldResult !== null && (
            <p>Estimated Yield: {yieldResult}</p>
          )}
        </div>
      ) : (
        <button onClick={login}>Login with NEAR Wallet</button>
      )}
    </div>
  );
};

export default App;
