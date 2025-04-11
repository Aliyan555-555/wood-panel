import React, { useState, useEffect } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast } from 'react-toastify';
import { UpdateCore } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const EditCoreComponent = ({
    back,
    id,
    setSelectedCore,
}: {
    back: () => void;
    id: string | null;
    setSelectedCore: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const dispatch = useDispatch();
    const selectedCore = useSelector((root: RootState) =>
        root.core.cores.find((core) => core._id === id)
    );

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [coreName, setCoreName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Initialize state when the component mounts or `selectedCore` changes
    useEffect(() => {
        if (selectedCore) {
            setCoreName(selectedCore.name || '');
            setPreview(selectedCore.source || null);
        }
    }, [selectedCore]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validate input fields
        if (!coreName.trim()) {
            toast.error("Core name cannot be empty");
            return;
        }

        if (!file && !selectedCore?.source) {
            toast.error("Please upload a texture file");
            return;
        }

        const formData = new FormData();
        formData.append("name", coreName);
        formData.append("value", coreName); // Assuming "value" is required
        if (file) {
            formData.append("file", file);
        }

        try {
            setIsLoading(true);
            await UpdateCore(id, formData, dispatch);
            setCoreName('');
            setFile(null);
            setPreview(null);
            setSelectedCore(null);
            back();
        } catch (error) {
            toast.error("An error occurred while updating the core");
            console.error("UpdateCore error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col !p-2">
            <h1 className="text-gray-800 text-2xl font-semibold relative flex items-center">
                <button
                    className="hover:text-red-600 cursor-pointer"
                    onClick={back}
                >
                    <IoIosArrowRoundBack fontSize={40} />
                </button>
                Edit Core
                <span className="absolute h-[3px] w-24 bg-red-500 bottom-[-5px] left-[40px] !rounded-[50px]"></span>
            </h1>
            <form
                className="w-full flex flex-wrap gap-3 bg-gray-100 !p-4 rounded-xl !mt-6"
                onSubmit={handleSubmit}
            >
                <div className="flex-1">
                    <label
                        htmlFor="name"
                        className="text-gray-600 font-semibold"
                    >
                        Core Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={coreName}
                        onChange={(e) => setCoreName(e.target.value)}
                        className="w-full outline-none h-12 border border-gray-300 rounded-lg !px-2 !py-1"
                        placeholder="Enter Core Name"
                    />
                </div>
                <div className="flex-1">
                    <label
                        htmlFor="file"
                        className="text-gray-600 font-semibold"
                    >
                        Texture
                    </label>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        className="w-full h-12 border border-gray-300 rounded-lg !px-2 !py-1"
                        onChange={handleFileChange}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="!px-4 h-11 w-full font-semibold bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
                >
                    {isLoading ? 'Updating...' : 'Update Core'}
                </button>
            </form>
            <div className="w-full flex flex-col gap-3 !px-2 !mt-8">
                <h3 className="text-gray-800 font-semibold">Texture Preview</h3>
                <div className="w-full h-[30px] bg-gray-200 rounded-lg flex items-center justify-center">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Core Texture"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : (
                        <span className="text-gray-500">
                            No texture selected
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditCoreComponent;
