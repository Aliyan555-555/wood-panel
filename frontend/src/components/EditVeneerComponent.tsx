import React, { useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast } from 'react-toastify';
import { UpdateVeneer } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface DataType {
  _id?: string;
  specie: string;
  cut: string;
  match: string;
  grade: string;
  value: string;
}

const EditVeneerComponent = ({ id, back }: { id: string | null; back: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const currentVeneerData = useSelector((root: RootState) =>
    root.veneer.veneers.find((item) => item._id === id)
  );
  const [preview, setPreview] = useState<string | null>(currentVeneerData?.source ?? null);
  const [data, setData] = useState<DataType>(
    currentVeneerData ?? {
      specie: "",
      cut: "",
      match: "",
      grade: "",
      value: "",
    }
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      updatedData.value = `${updatedData.specie.split(" ").join("-").toLowerCase()}_${updatedData.cut.split(" ").join("-").toLowerCase()}_${updatedData.match.split(" ").join("-").toLowerCase()}_${name === "grade"?value.toLowerCase():updatedData.grade.toLowerCase()}`;
      return updatedData;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!data.specie || !preview || !data.cut || !data.match || !data.grade) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof DataType] as string);
    });
    formData.append("file", file as string | Blob);

    try {
      setIsLoading(true);
      await UpdateVeneer(id, formData, dispatch);
      setData({
        specie: "",
        cut: "",
        match: "",
        grade: "",
        value: "",
      });
      setFile(null);
      setPreview(null);
    } catch (error) {
      toast.error("An error occurred while updating the veneer");
      console.error("UpdateVeneer error:", error);
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
          aria-label="Go back"
        >
          <IoIosArrowRoundBack fontSize={40} />
        </button>
        Edit Veneer
        <span className="absolute h-[3px] w-24 bg-red-500 bottom-[-5px] left-[40px] !rounded-[50px]"></span>
      </h1>
      <form
        className="w-full flex flex-wrap flex-col gap-3 bg-gray-100 !p-4 rounded-xl !mt-6"
        onSubmit={handleSubmit}
      >
        <div className="flex-1">
          <label htmlFor="specie" className="text-gray-600 font-semibold">
            Veneer Specie
          </label>
          <select
            id="specie"
            name="specie"
            value={data.specie}
            onChange={handleInputChange}
            className="w-full outline-none h-12 border border-gray-300 rounded-lg !px-2 !py-1"
          >
            <option value="" disabled>
              Select Veneer Specie
            </option>
            <option value="Maple">Maple</option>
            <option value="Birch">Birch</option>
            <option value="Oak">Oak</option>
            <option value="Cherry">Cherry</option>
            <option value="Cedar">Cedar</option>
            <option value="Redwood">Redwood</option>
            <option value="Walnut">Walnut</option>
            <option value="White Oak">White Oak</option>
            <option value="Pine">Pine</option>
            <option value="Fir">Fir</option>
            <option value="Hemlock">Hemlock</option>

          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="cut" className="text-gray-600 font-semibold">
            Cut
          </label>
          <select
            id="cut"
            name="cut"
            value={data.cut}
            onChange={handleInputChange}
            className="w-full outline-none h-12 border border-gray-300 rounded-lg !px-2 !py-1"
          >
            <option value="" disabled>
              Select Cut
            </option>
            <option value="Rotary">Rotary</option>
            <option value="Plain sliced">Plain sliced</option>
            <option value="Quarter cut">Quarter cut</option>
            <option value="Rift cut">Rift cut</option>
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="match" className="text-gray-600 font-semibold">
            Match
          </label>
          <select
            id="match"
            name="match"
            value={data.match}
            onChange={handleInputChange}
            className="w-full outline-none h-12 border border-gray-300 rounded-lg !px-2 !py-1"
          >
            <option value="" disabled>
              Select Match
            </option>
            <option value="Book match">Book match</option>
            <option value="Slip match">Slip match</option>
            <option value="Random match">Random match</option>
            <option value="Pleasing match">Pleasing match</option>
            <option value="Whole piece">Whole piece</option>
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="grade" className="text-gray-600 font-semibold">
            Grade
          </label>
          <select
            id="grade"
            name="grade"
            value={data.grade}
            onChange={handleInputChange}
            className="w-full outline-none h-12 border border-gray-300 rounded-lg !px-2 !py-1"
          >
            <option value="" disabled>
              Select Grade
            </option>
            <option value="AA">AA</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="file" className="text-gray-600 font-semibold">
            Texture File
          </label>
          <input
            id="file"
            name="file"
            type="file"
            onChange={handleFileChange}
            className="w-full outline-none h-12 border border-gray-300 rounded-lg !px-2 !py-1"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="!px-4 h-11 w-full font-semibold bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
        >
          {isLoading ? "Updating..." : "Update Veneer"}
        </button>
      </form>
      <div className="w-full flex flex-col gap-3 !px-2 !mt-8">
        <h3 className="text-gray-800 font-semibold">Texture Preview</h3>
        <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Core Texture"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-gray-500">No texture selected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditVeneerComponent;
