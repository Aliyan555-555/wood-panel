import React from 'react';
import Sidebar from '../components/Sidebar';
import ManageCore from './ManageCore';
import ManageVeneer from './ManageVeneer';
// ... other imports ...

const Dashboard: React.FC = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    return (
        <div className="flex min-h-screen min-w-scree ">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <div className="flex-1 p-6 bg-gray-100">
                {currentPage === 1 && <ManageCore /> }
                {currentPage === 2 && <ManageVeneer />}
            </div>
        </div>
    );
};

export default Dashboard;
