import React from 'react';
import AllCore from '../components/AllCore';
import EditCoreComponent from '../components/EditCoreComponent';
import CreateCoreComponent from '../components/CreateCoreComponent';

const ManageCore = () => {
    const [currentPage, setCurrentPage] = React.useState('AllCore');
    const [selectedCore, setSelectedCore] = React.useState<string | null>(null);

    const pages: Record<string, JSX.Element> = {
        AllCore: <AllCore setSelectedCore={setSelectedCore} setCurrentPage={setCurrentPage} />,
        CreateCore: <CreateCoreComponent back={() => setCurrentPage('AllCore')} />,
        EditCore: <EditCoreComponent setSelectedCore={setSelectedCore} back={() => setCurrentPage('AllCore')}
            id={selectedCore} />,
    };

    return (
        <div className='w-full h-full !p-3 flex gap-3 flex-col bg-gray-100'>
            <div className='w-full rounded-xl flex justify-end bg-white shadow h-16 !p-3'>
                <button
                    onClick={() => setCurrentPage('CreateCore')}
                    className='!px-4 h-full flex items-center justify-center bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 font-semibold transition duration-300 ease-in-out'
                >
                    Create New Core
                </button>
            </div>
            <div className='w-full rounded-xl flex justify-end bg-white shadow-md flex-1 !p-2'>
                {pages[currentPage]}
            </div>
        </div>
    );
};

export default ManageCore;
