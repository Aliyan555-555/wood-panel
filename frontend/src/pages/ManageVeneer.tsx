import React from 'react';
import AllVeneer from '../components/AllVeneer';
import CreateVeneerComponent from '../components/CreateVeneerComponent';
import EditVeneerComponent from '../components/EditVeneerComponent';

const ManageVeneer = () => {
    const [currentPage, setCurrentPage] = React.useState('AllVeneer');
    const [selectedVeneer, setSelectedVeneer] = React.useState<string | null>(null);

    const pages: Record<string, JSX.Element> = {
        AllVeneer: <AllVeneer  setCurrentPage={setCurrentPage} setSelectedVeneer={setSelectedVeneer} />,
        CreateVeneer: <CreateVeneerComponent back={() => setCurrentPage("AllVeneer")} />,
        EditVeneer: <EditVeneerComponent back={() => setCurrentPage("AllVeneer")} id={selectedVeneer} />,
    };

    return (
        <div className='w-full h-full !p-3 flex gap-3 flex-col bg-gray-100'>
            <div className='w-full rounded-xl flex justify-end bg-white shadow h-16 !p-3'>
                <button
                    onClick={() => setCurrentPage('CreateVeneer')}
                    className='!px-4 h-full flex items-center justify-center bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 font-semibold transition duration-300 ease-in-out'
                >
                    Create New Veneer
                </button>
            </div>
            <div className='w-full rounded-xl flex justify-end bg-white shadow-md flex-1 !p-2'>
                {pages[currentPage]}
            </div>
        </div>
    );
}

export default ManageVeneer;
