import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, ThreeDotsVertical } from 'react-bootstrap-icons';
import Sidebar from './subcomponents/Sidebar';
import Table from './Dashboard/Table';
import Header from './subcomponents/Header';
import { Actor, HttpAgent} from '@dfinity/agent';
import { useAuth } from './AuthContext';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('Project A');
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const authClient = useAuth();
  
  useEffect(() => {
    if (!authClient) {
        console.log("AuthClient is not yet initialized.");
        return;
    }

    
    const identity = authClient.getIdentity();
    const canisterId = import.meta.env.VITE_CANISTER_ID;

    console.log("Hurray!:", identity.getPrincipal().toText());

    if (!canisterId) {
        throw new Error('Canister ID is not defined');
    }

    const getAuthenticatedActor = () => {
        try {
            const agent = new HttpAgent({ identity });
            return Actor.createActor(idlFactory, { agent, canisterId });
        } catch (error) {
            console.error("Failed to create actor:", error);
            throw error;
        }
    }

    console.log("AuthClient initialized:");

    }, [authClient]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleModal = () => setShowModal(!showModal);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const projects = ['Project A', 'Project B', 'Project C'];


  return (
    <div className="flex h-screen bg-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} lg:ml-64 overflow-x-hidden`}>
        <Header/>

        <main className="flex-1 bg-white ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
              <button
                  onClick={toggleDropdown}
                  className="text-2xl font-semibold text-gray-900 flex items-center space-x-2"
                >
                  <span>{selectedProject}</span>
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                </button>

                {/* Dropdown menu */}
                {showDropdown && (
                  <div className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {projects.map((project) => (
                        <li
                          key={project}
                          onClick={() => {
                            setSelectedProject(project);
                            setShowDropdown(false); // Close the dropdown after selecting a project
                          }}
                          className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                        >
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                  <ThreeDotsVertical className="h-5 w-5" />
                </button>
                {/* Modal for project actions */}
                {showModal && (
                  <div className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-md">
                    <ul>
                      <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">View Description</li>
                      <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Edit Project</li>
                      <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Delete</li>
                    </ul>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#4A90E2] hover:bg-[#3A7BC8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A90E2]"
              >
                <Plus className="mr-2 h-5 w-5" /> CREATE PROJECT
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;





// import { Actor, HttpAgent} from '@dfinity/agent';
// import { useAuth } from '../../AuthContext';

// const authClient = useAuth();

// useEffect(() => {
//   if (!authClient) {
//       console.log("AuthClient is not yet initialized.");
//       return;
//   }

  
//   const identity = authClient.getIdentity();
//   const canisterId = import.meta.env.VITE_CANISTER_ID;

//   console.log("Hurray!:", identity.getPrincipal().toText());

//   if (!canisterId) {
//       throw new Error('Canister ID is not defined');
//   }

//   const getAuthenticatedActor = () => {
//       try {
//           const agent = new HttpAgent({ identity });
//           return Actor.createActor(idlFactory, { agent, canisterId });
//       } catch (error) {
//           console.error("Failed to create actor:", error);
//           throw error;
//       }
//   }

//   console.log("AuthClient initialized:");

        // Fetch files from the backend when authClient is available
  //       const fetchFiles = async () => {
  //         const actor = getAuthenticatedActor();
  //         console.log("actor:", actor);
  //         try {
  //             const userId = authClient.getIdentity().getPrincipal().toText();
  //             // console.log(userId);
  //             const fetchedFiles = await ERecords_backend.getUserFiles(userId);
  //             // const fetchedFiles = await actor.getUserFiles(userId);
  //             setFiles(fetchedFiles);
  //             const fileMap = new Map(fetchedFiles.map(file => [file.id, file.fileData]));
  //             setFilesMap(fileMap);
  //         } catch (error) {
  //             console.error("Error fetching files:", error);
  //             // setMyalert('Error retrieving files');
  //         }
  //     };

  //     fetchFiles();
  // }, [authClient]);