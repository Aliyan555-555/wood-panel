import React from 'react';
import { PiFrameCornersLight } from "react-icons/pi";
import { GiMaterialsScience } from "react-icons/gi";

export const links = [
  {
    id: 1,
    name: "Core Materials",
    icon: (<PiFrameCornersLight fontSize={30} />)
  },
  {
    id: 2,
    name: "Veneer Materials",
    icon: (<GiMaterialsScience fontSize={30} />)
  }
]
const Sidebar: React.FC<{ currentPage: number; setCurrentPage: (page: number) => void }> = ({ setCurrentPage, currentPage }) => {

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />

      <div className="min-h-screen flex !pl-3 !py-3 flex-row bg-gray-100">
        <div className="flex flex-col w-56 bg-white shadow-md rounded-xl overflow-hidden">
          <div className="flex items-center justify-center h-20 shadow">
            <img src='/images/logo.png' alt='Logo' className='object-contain w-[80%]  h-16' />
          </div>
          <ul className="flex flex-col py-6">

            {
              links.map((link, index) => (
                <li onClick={() => setCurrentPage(link.id)} key={index}>
                  <p className={`flex flex-row items-center h-14 transform hover:translate-x-2 ${currentPage === link.id && "text-gray-800"} ${currentPage === link.id && "translate-x-2"} transition-transform ease-in duration-200 px-4 text-gray-500 hover:text-gray-800`}>
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">{link.icon}</span>
                    <span className="text-sm font-medium">{link.name}</span>
                  </p>
                </li>
              ))
            }
            {/* <li>
              <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-log-out text-[25px]"></i></span>
                <span className="text-sm font-medium">Logout</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;