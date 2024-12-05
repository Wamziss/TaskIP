import React, { useState, useEffect } from 'react';
import { Bell, Search } from 'react-bootstrap-icons';
import { useConnect } from '@connect2ic/react';

function Header() {
  const { connect, disconnect, isConnected, principal } = useConnect();
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    // Check if the wallet connection state is stored in localStorage
    const storedConnection = localStorage.getItem('walletConnected');
    if (storedConnection === 'true') {
      reconnectWallet();
    }

    if (isConnected) {
      setWalletConnected(true);
      fetchWalletBalance();
    }
  }, [isConnected]);

  // Function to reconnect to the wallet on page load
  const reconnectWallet = async () => {
    try {
      await connect();
      setWalletConnected(true);
      fetchWalletBalance();
    } catch (error) {
      console.error('Failed to reconnect:', error);
    }
  };

  // Function to check if the wallet is connected
  const checkWalletConnection = async () => {
    if (window.ic?.plug) {
      const connected = await window.ic.plug.isConnected();
      setWalletConnected(connected);
      if (connected) {
        fetchWalletBalance();
      }
    }
  };

  // Function to fetch the wallet balance
  const fetchWalletBalance = async () => {
    try {
      const balance = await window.ic?.plug.requestBalance();
      setWalletBalance(balance?.[0]?.amount || 0);
    } catch (error) {
      console.log('Failed to fetch wallet balance', 'error');
    }
  };

  // Function to handle wallet connection
  const handleConnectClick = async () => {
    if (!walletConnected) {
      try {
        const whitelist = ['ryjl3-tyaaa-aaaaa-aaaba-cai']; // Replace with your canister ID(s)
        const host = 'https://mainnet.dfinity.network'; // Use your preferred network

        const result = await window.ic.plug.requestConnect({
          whitelist,
          host,
        });

        if (result) {
          setWalletConnected(true);
          localStorage.setItem('walletConnected', 'true');
          fetchWalletBalance();
          alert('Wallet connected successfully!', 'success');
        }
      } catch (error) {
        alert('Failed to connect to the Plug wallet', 'error');
        console.error('Connection failed:', error);
      }
    }
  };

  // Function to handle wallet disconnection
  const handleDisconnectClick = () => {
    disconnect();
    setWalletConnected(false);
    localStorage.removeItem('walletConnected');
    alert('Wallet disconnected', 'info');
  };

  // Function to handle payment
  const handlePayment = async () => {
    if (!walletConnected) {
      alert('Please connect your wallet first', 'error');
      return;
    }

    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      alert('Please enter a valid amount', 'error');
      return;
    }

    try {
      const recipientPrincipalId = 'RECIPIENT_PRINCIPAL_ID'; // Replace with actual recipient's principal ID

      const result = await window.ic?.plug.transfer({
        to: recipientPrincipalId,
        amount: Number(paymentAmount),
      });

      if (result) {
        alert('Payment successful!', 'success');
        setShowPaymentModal(false);
        fetchWalletBalance();
      }
    } catch (error) {
      alert('Payment failed', 'error');
      console.error('Payment error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="relative w-2/3 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="md:w-full pl-10 pr-4 py-2 mx-auto self-center rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="text-gray-600" />
            <button
              onClick={handleConnectClick}
              className={`py-1 px-2 rounded-lg text-sm font-semibold ${
                walletConnected ? 'bg-gray-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {walletConnected ? 'Wallet connected' : 'Connect Plug Wallet'}
            </button>
            {walletConnected && (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="py-1 px-2 bg-green-500 text-sm hover:bg-green-600 text-white rounded-lg"
              >
                Buy Tokens
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl mb-4">Enter Amount to Buy Tokens</h2>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter amount"
            />
            <div className="flex justify-end">
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="ml-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;









// import React from 'react';
// import { Bell, Search} from 'react-bootstrap-icons';

// function Header() {
//   return (
//     <header className="bg-white shadow-sm">
//           <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center">
//               <div className="relative w-2/3 max-w-md mx-auto">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="md:w-full pl-10 pr-4 py-2 mx-auto self-center rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               </div>
//               <div className="flex items-center space-x-4">
//                 <Bell className="text-gray-600" />
//               <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">Connect Wallet</button>
//               </div>
//             </div>
//           </div>
//         </header>
//   )
// }

// export default Header