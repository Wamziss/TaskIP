import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Sidebar from './subcomponents/Sidebar';
import Header from './subcomponents/Header';
import { Copy, QrCode, Pencil, Wallet, ExclamationCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [principalId, setPrincipalId] = useState('dgte-gthe');
  const [username, setUsername] = useState('myusername');
  const [showQrModal, setShowQrModal] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isWatchEnabled, setIsWatchEnabled] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const authClient = useAuth();

  useEffect(() => {
    checkWalletConnection();
    fetchPrincipalId();
  }, [authClient]);

  const checkWalletConnection = async () => {
    if (window.ic?.plug) {
      const connected = await window.ic.plug.isConnected();
      setIsWalletConnected(connected);
      if (connected) {
        fetchWalletBalance();
      }
    }
  };

  const fetchWalletBalance = async () => {
    try {
      const balance = await window.ic?.plug.requestBalance();
      setWalletBalance(balance?.[0]?.amount || 0);
    } catch (error) {
      showNotification('Failed to fetch wallet balance', 'error');
    }
  };

  const fetchPrincipalId = async () => {
    if (authClient) {
      try {
        const identity = authClient.getIdentity();
        const principalID = identity.getPrincipal().toText();
        setPrincipalId(principalID);
      } catch (error) {
        showNotification('Error fetching principal ID', 'error');
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ic?.plug) {
      showNotification('Plug wallet extension not found. Please install it first.', 'error');
      return;
    }

    try {
      const whitelist = ['ryjl3-tyaaa-aaaaa-aaaba-cai']; // Add your canister IDs
      const host = 'https://mainnet.dfinity.network'; // Or your preferred network
      
      const result = await window.ic.plug.requestConnect({
        whitelist,
        host,
      });

      if (result) {
        setIsWalletConnected(true);
        await fetchWalletBalance();
        showNotification('Wallet connected successfully!', 'success');
      }
    } catch (error) {
      showNotification('Failed to connect wallet', 'error');
    }
  };

  const handlePayment = async () => {
    if (!isWalletConnected) {
      showNotification('Please connect your wallet first', 'error');
      return;
    }

    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      showNotification('Please enter a valid amount', 'error');
      return;
    }

    try {
      const recipientPrincipalId = 'RECIPIENT_PRINCIPAL_ID'; // Replace with actual recipient
      const result = await window.ic?.plug.transfer({
        to: recipientPrincipalId,
        amount: Number(paymentAmount),
      });

      if (result) {
        showNotification('Payment successful!', 'success');
        setShowPaymentModal(false);
        fetchWalletBalance();
      }
    } catch (error) {
      showNotification('Payment failed', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Copied to clipboard!', 'success');
    } catch (error) {
      showNotification('Failed to copy', 'error');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} lg:ml-64`}>
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          {notification.show && (
            <Alert className={`mb-4 ${notification.type === 'error' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
              <AlertDescription className="flex items-center">
                {notification.type === 'error' ? (
                  <ExclamationCircle className="h-4 w-4 mr-2 text-red-500" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                )}
                {notification.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Principal ID</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={principalId}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-50 border rounded-md text-sm"
                    />
                    <button onClick={() => copyToClipboard(principalId)} className="p-2 hover:bg-gray-100 rounded-md">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button onClick={() => setShowQrModal(true)} className="p-2 hover:bg-gray-100 rounded-md">
                      <QrCode className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md text-sm"
                    />
                    <button className="p-2 hover:bg-gray-100 rounded-md">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wallet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">
                      {isWalletConnected ? 'Connected' : 'Not Connected'}
                    </p>
                    {isWalletConnected && (
                      <p className="text-sm text-gray-500">
                        Balance: {walletBalance} ICP
                      </p>
                    )}
                  </div>
                  <div className="space-x-2">
                    {!isWalletConnected ? (
                      <button
                        onClick={connectWallet}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Connect Wallet
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        Make Payment
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Push Notifications</span>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isPushEnabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    onClick={() => setIsPushEnabled(!isPushEnabled)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isPushEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Watch Notifications</span>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isWatchEnabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    onClick={() => setIsWatchEnabled(!isWatchEnabled)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isWatchEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Scan Principal ID</h3>
            <div className="flex justify-center">
              <QRCodeCanvas value={principalId} size={200} />
            </div>
            <button
              onClick={() => setShowQrModal(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Make Payment</h3>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Enter amount in ICP"
              className="w-full px-3 py-2 border rounded-md mb-4"
            />
            <div className="space-x-2">
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;


// import React, { useState, useEffect } from 'react';
// import { QRCodeCanvas } from 'qrcode.react'; // For generating QR code
// import Sidebar from './subcomponents/Sidebar';
// import Header from './subcomponents/Header';
// import { Copy, QrCode, Pencil } from 'react-bootstrap-icons';
// import { useAuth } from '../AuthContext';

// const Settings = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [principalId, setPrincipalId] = useState('dgte-gthe');
//   const [username, setUsername] = useState('myusername');
//   const [showQrModal, setShowQrModal] = useState(false);
//   const [isPushEnabled, setIsPushEnabled] = useState(false);
//   const [isWatchEnabled, setIsWatchEnabled] = useState(false);
//   const authClient = useAuth();

//   useEffect(() => {
//     if (authClient) {
//       try {
//         const identity = authClient.getIdentity();
//         const principalID = identity.getPrincipal().toText();
//         setPrincipalId(principalID);
//       } catch (error) {
//         console.error("Error fetching principal ID:", error);
//       }
//     } else {
//       console.log("Authclient not initialized");
//     }
//   }, [authClient]); 

  

//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const toggleQrModal = () => setShowQrModal(!showQrModal);

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     alert('Copied to clipboard');
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 overflow-x-hidden">
//       {/* Sidebar */}
//       <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

//       {/* Main Content */}
//       <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} lg:ml-64 overflow-x-hidden`}>
//         <Header />

//         <main className="flex-1 bg-white p-6">
//           {/* Principal ID */}
//           <div className="mb-4">
//             <h2 className="text-xl font-semibold text-gray-900">My Principal ID</h2>
//             <div className="flex items-center space-x-4 mt-2">
//               <input
//                 type="text"
//                 value={principalId}
//                 readOnly
//                 className="border p-2 rounded w-72 bg-gray-50 text-gray-900"
//               />
//               <button onClick={() => copyToClipboard(principalId)} className="text-gray-500 hover:text-gray-700">
//                 <Copy className="h-5 w-5" />
//               </button>
//               {/* QR Code Icon */}
//               <button onClick={toggleQrModal} className="text-gray-500 hover:text-gray-700">
//                 <QrCode className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           {/* Username */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">Set Unique Username</h2>
//             <small className="text-gray-500">This is just for connecting with others but optional. If concerned about anonymity, set a name that’s not close to your real identity.</small>
//             <div className="flex items-center space-x-4 mt-2">
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="border p-2 rounded w-72 bg-gray-50 text-gray-900"
//               />
//               <button className="text-gray-500 hover:text-gray-700">
//                 <Pencil className="h-5 w-5" />
//               </button>
//               <button onClick={() => copyToClipboard(username)} className="text-gray-500 hover:text-gray-700">
//                 <Copy className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           {/* Notifications */}
//           <div className="mb-4">
//             <div className="flex justify-between items-center">
//               <label className="text-lg font-semibold text-gray-900">Enable Push Notifications</label>
//               <div className="relative inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={isPushEnabled}
//                   onChange={() => setIsPushEnabled(!isPushEnabled)}
//                   className="sr-only"
//                 />
//                 <div className={`w-14 h-8 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${isPushEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}>
//                   <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isPushEnabled ? 'translate-x-6' : 'translate-x-1'}`}></div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-between items-center mt-4">
//               <label className="text-lg font-semibold text-gray-900">Enable Smart Watch Notifications</label>
//               <div className="relative inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={isWatchEnabled}
//                   onChange={() => setIsWatchEnabled(!isWatchEnabled)}
//                   className="sr-only"
//                 />
//                 <div className={`w-14 h-8 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${isWatchEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}>
//                   <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isWatchEnabled ? 'translate-x-6' : 'translate-x-1'}`}></div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* QR Code Modal */}
//           {showQrModal && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Scan to get Principal ID</h3>
//                 <QRCodeCanvas value={principalId} className="w-40 h-40 mx-auto" />
//                 <div className="mt-4 flex justify-end">
//                   <button
//                     onClick={toggleQrModal}
//                     className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Settings;

