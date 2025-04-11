import { useDispatch, useSelector } from 'react-redux';
import { DeleteVeneer } from '../api';
import { RootState } from '../redux/store';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';

const AllVeneer = (
    {
        setCurrentPage,
        setSelectedVeneer,
    }:{
        setCurrentPage: (page: string) => void,
        setSelectedVeneer: (id: string) => void,
    }
) => {
    const veneer = useSelector((state: RootState) => state.veneer.veneers);
    const dispatch = useDispatch();
    const handleDeleteVeneer = async (id: string) => {
        await DeleteVeneer(id, dispatch);
    }

    const handleEditVeneer = (id: string) => {
        setSelectedVeneer(id);
        setCurrentPage("EditVeneer");
    }
    return (
        <div className='w-full h-full flex flex-col !p-2'>
            <h1 className='text-gray-800 text-2xl font-semibold relative '>Veneer Materials
                <span className='absolute h-[3px] w-24 bg-red-500 bottom-[-5px] left-0 !rounded-[50px]'></span>
            </h1>
            <div className='w-full h-full flex flex-col gap-3 !px-2 !mt-8'>
                {
                    veneer.map((veneer, index) => (
                        <div key={index} className='w-full h-[400px] !p-1 relative  bg-white hover:bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-between px-4'>
                            <img src={veneer.source} className='w-full rounded-lg h-full object-cover ' />
                            <div className='absolute top-0 left-0 text-white flex items-center justify-center capitalize font-semibold rounded-lg bg-red-500/95 !px-6 h-full'>
                                {veneer.specie}
                            </div>
                            <div className='absolute top-[-10px] flex gap-1 right-[-5px]'>
                                <button onClick={() => handleEditVeneer(veneer._id)} className='!p-[5px] rounded-full text-white bg-red-600
                                    hover:bg-red-700 transition duration-300 ease-in-out cursor-pointer'>
                                    <FiEdit2 fontSize={14} />
                                </button>
                                <button onClick={() => handleDeleteVeneer(veneer._id)} className='!p-[5px] rounded-full text-white bg-red-600
                                    hover:bg-red-700 transition duration-300 ease-in-out cursor-pointer'>
                                    <MdDeleteOutline fontSize={14} />
                                </button>
                            </div>
                        </div>
                    ))
                }

            </div>

        </div>

    )
}

export default AllVeneer;
