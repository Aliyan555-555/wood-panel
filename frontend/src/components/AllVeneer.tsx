import { useDispatch, useSelector } from 'react-redux';
import { DeleteVeneer } from '../api';
import { RootState } from '../redux/store';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { useState } from 'react';
import { FaFolder } from "react-icons/fa";
import type { Veneer } from '../redux/schema/veneerSlice';

interface VeneerPropType {
    veneer: Veneer;
    index: string;
    handleDeleteVeneer: (value: string) => void;
    handleEditVeneer: (value: string) => void;
}
interface AccordionPropType {
    title: string;
    children: React.ReactElement
}
const AllVeneer = (
    {
        setCurrentPage,
        setSelectedVeneer,
    }: {
        setCurrentPage: (page: string) => void,
        setSelectedVeneer: (id: string) => void,
    }
) => {
    const veneer = useSelector((state: RootState) => state.veneer.veneers);
    const dispatch = useDispatch();
    const handleDeleteVeneer = async (id: string) => {
        await DeleteVeneer(id, dispatch);
    };

    const handleEditVeneer = (id: string) => {
        setSelectedVeneer(id);
        setCurrentPage("EditVeneer");
    };
    const spices: string[] = Array.from(new Set(veneer.map(v => v.specie).filter(Boolean)));

    return (
        <div className='w-full h-full flex flex-col !p-2'>
            <h1 className='text-gray-800 text-2xl font-semibold relative '>Veneer Materials
                <span className='absolute h-[3px] w-24 bg-red-500 bottom-[-5px] left-0 !rounded-[50px]'></span>
            </h1>

            <div className="w-full flex flex-col gap-3 !mt-8">
                {
                    spices.map((item) => (
                        <Accordion title={item} children={
                            <div className='!p-4 gap-3 flex flex-col'>
                                {veneer.filter(i => i.specie === item).map((veneer) => <Veneer veneer={veneer} index={veneer._id} handleDeleteVeneer={handleDeleteVeneer} handleEditVeneer={handleEditVeneer} />)}
                            </div>
                        } />

                    ))
                }
            </div>
        </div>
    );
};
const Accordion = ({ title, children }: AccordionPropType) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border border-gray-300 rounded-lg">
            <button
                className="w-full flex items-center  gap-4 text-left !px-5 !py-3 bg-gray-200 hover:bg-gray-300 font-semibold text-gray-700"
                onClick={toggleAccordion}
            >
                <FaFolder color='#E84675' fontSize={30} />  <p>{title}</p>
            </button>
            <div className={`${isOpen ? 'max-h-[1000px] duration-1000' : 'max-h-0 duration-500'} overflow-hidden transition-all ease-in-out`}>
                {children}
            </div>
        </div>
    );
};


const Veneer = ({ veneer, index, handleEditVeneer, handleDeleteVeneer }: VeneerPropType) => {
    return (
        <div key={index} className='w-full h-[100px] !p-1 relative  bg-white hover:bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-between px-4'>
            <img src={veneer.source} className='w-full rounded-lg h-full object-cover ' />
            <div className='absolute top-0 left-0 text-white flex items-center justify-center capitalize font-semibold rounded-lg bg-red-500/95 !px-6 h-full'>
                {veneer.specie}_{veneer.cut}_{veneer.match}_{veneer.grade}
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
    )
}

export default AllVeneer;
