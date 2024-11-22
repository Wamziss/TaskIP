import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // For generating QR code
import Sidebar from './subcomponents/Sidebar';
import Header from './subcomponents/Header';
import { Copy, QrCode, Pencil } from 'react-bootstrap-icons';
import { useAuth } from '../AuthContext';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [principalId, setPrincipalId] = useState('dgte-gthe');
  const [username, setUsername] = useState('myusername');
  const [showQrModal, setShowQrModal] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isWatchEnabled, setIsWatchEnabled] = useState(false);
  const authClient = useAuth();

  useEffect(() => {
    if (authClient) {
      try {
        const identity = authClient.getIdentity();
        const principalID = identity.getPrincipal().toText();
        setPrincipalId(principalID);
      } catch (error) {
        console.error("Error fetching principal ID:", error);
      }
    } else {
      console.log("Authclient not initialized");
    }
  }, [authClient]); 

  

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleQrModal = () => setShowQrModal(!showQrModal);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} lg:ml-64 overflow-x-hidden`}>
        <Header />

        <main className="flex-1 bg-white p-6">
          {/* Principal ID */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">My Principal ID</h2>
            <div className="flex items-center space-x-4 mt-2">
              <input
                type="text"
                value={principalId}
                readOnly
                className="border p-2 rounded w-72 bg-gray-50 text-gray-900"
              />
              <button onClick={() => copyToClipboard(principalId)} className="text-gray-500 hover:text-gray-700">
                <Copy className="h-5 w-5" />
              </button>
              {/* QR Code Icon */}
              <button onClick={toggleQrModal} className="text-gray-500 hover:text-gray-700">
                <QrCode className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Username */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Set Unique Username</h2>
            <small className="text-gray-500">This is just for connecting with others but optional. If concerned about anonymity, set a name that’s not close to your real identity.</small>
            <div className="flex items-center space-x-4 mt-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded w-72 bg-gray-50 text-gray-900"
              />
              <button className="text-gray-500 hover:text-gray-700">
                <Pencil className="h-5 w-5" />
              </button>
              <button onClick={() => copyToClipboard(username)} className="text-gray-500 hover:text-gray-700">
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <label className="text-lg font-semibold text-gray-900">Enable Push Notifications</label>
              <div className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isPushEnabled}
                  onChange={() => setIsPushEnabled(!isPushEnabled)}
                  className="sr-only"
                />
                <div className={`w-14 h-8 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${isPushEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}>
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isPushEnabled ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <label className="text-lg font-semibold text-gray-900">Enable Smart Watch Notifications</label>
              <div className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isWatchEnabled}
                  onChange={() => setIsWatchEnabled(!isWatchEnabled)}
                  className="sr-only"
                />
                <div className={`w-14 h-8 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${isWatchEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}>
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isWatchEnabled ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Modal */}
          {showQrModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Scan to get Principal ID</h3>
                <QRCodeCanvas value={principalId} className="w-40 h-40 mx-auto" />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={toggleQrModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;





// import React, { useState, useEffect } from 'react';
// import { QRCodeCanvas } from 'qrcode.react'; // For generating QR code
// import Sidebar from './subcomponents/Sidebar';
// import Header from './subcomponents/Header';
// import { Copy, QrCode, Pencil } from 'react-bootstrap-icons';

// const Settings = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [principalId, setPrincipalId] = useState('dgte-gthe');
//   const [username, setUsername] = useState('myusername');
//   const [showQrModal, setShowQrModal] = useState(false);
//   const [isPushEnabled, setIsPushEnabled] = useState(false);
//   const [isWatchEnabled, setIsWatchEnabled] = useState(false);
//   // const authClient = useAuth();

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
//             <h2 className="text-xl font-semibold">My Principal ID</h2>
//             <div className="flex items-center space-x-4 mt-2">
//               <input
//                 type="text"
//                 value={principalId}
//                 readOnly
//                 className="border p-2 rounded w-72"
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
//             <h2 className="text-xl font-semibold">Set Unique Username</h2>
//             <small className="text-gray-500">This is just for purposes of connecting with others but optional. If concerned about anonymity, set a name that’s not close to your real identity.</small>
//             <div className="flex items-center space-x-4 mt-2">
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="border p-2 rounded w-72"
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
//               <label className="text-lg font-semibold">Enable Push Notifications</label>
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
//               <label className="text-lg font-semibold">Enable Smart Watch Notifications</label>
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
//                 <h3 className="text-xl font-semibold mb-4">Scan to get Principal ID</h3>
//                 <QRCodeCanvas value={principalId} className="w-40 h-40 mx-auto" />
//                 <div className="mt-4 flex justify-end">
//                   <button
//                     onClick={toggleQrModal}
//                     className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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

