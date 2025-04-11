import axios from "axios";
import {
  addCore,
  removeCore,
  setCores,
  updateCore,
} from "../redux/schema/coreSlice";
import { AppDispatch } from "../redux/store";
import { toast } from "react-toastify";
import {
  addVeneer,
  removeVeneer,
  setVeneers,
  updateVeneer,
} from "../redux/schema/veneerSlice";

const API = axios.create({
  baseURL: "https://wood-panel-production.up.railway.app/api/v1/",
});

interface CoreResponse {
  status: boolean;
  core: any[]; // Replace `any` with the actual type of core if known
}

interface VeneerResponse {
  status: boolean;
  veneer: any[]; // Replace `any` with the actual type of veneer if known
}

const fetchInitialData = async (
  dispatch: AppDispatch,
  setLoading: (loading: boolean) => void
): Promise<void> => {
  try {
    const res1 = await API.get<CoreResponse>("/core");
    const res1Data = res1.data;
    if (res1Data.status) {
      dispatch(setCores(res1Data.core));
      console.log("🚀 ~ fetchInitialData ~ res1Data:", res1Data);
    }
    const res2 = await API.get<VeneerResponse>("/veneer");
    const res2Data = res2.data;
    if (res2Data.status) {
      dispatch(setVeneers(res2Data.veneer));
      console.log("🚀 ~ fetchInitialData ~ res2Data:", res2Data);
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};

const DeleteCore = async (id: string, dispatch: AppDispatch) => {
  try {
    const res = await API.delete(`/core/${id}`);
    if (res.data.status) {
      dispatch(removeCore(id));
    }
  } catch (error) {
    console.log(error);
  }
};

const CreateCore = async (formData: FormData, dispatch: AppDispatch) => {
  try {
    const res = await API.post("/core", formData);
    if (res.data.status) {
      dispatch(addCore(res.data.core));
      toast.success("Core Created Successfully");
    } else {
      toast.error("Failed to create core");
    }
  } catch (error) {
    toast.error("Something went wrong ");
  }
};
const CreateVeneer = async (formData: FormData, dispatch: AppDispatch) => {
  try {
    const res = await API.post("/veneer", formData);
    if (res.data.status) {
      dispatch(addVeneer(res.data.veneer));
      toast.success("Veneer Created Successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Something went wrong ");
  }
};

const UpdateCore = async (
  id: string | null,
  formData: FormData,
  dispatch: AppDispatch
) => {
  try {
    const res = await API.put(`/core/${id}`, formData);
    if (res.data.status) {
      dispatch(updateCore(res.data.core));
      toast.success("Core Updated Successfully");
    } else {
      toast.error("Failed to update core");
    }
  } catch (error) {
    toast.error("Something went wrong ");
  }
};
const DeleteVeneer = async (id: string, dispatch: AppDispatch) => {
  try {
    const res = await API.delete(`/veneer/${id}`);
    if (res.data.status) {
      dispatch(removeVeneer(id));
    }
  } catch (error) {
    console.log(error);
  }
};

const UpdateVeneer = async (
  id: string | null,
  formData: FormData,
  dispatch: AppDispatch
) => {
  try {
    const res = await API.put(`/veneer/${id}`, formData);
    if (res.data.status) {
      dispatch(updateVeneer(res.data.veneer));
      toast.success("Veneer Updated Successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error("Something went wrong ");
  }
};

export {
  API,
  CreateVeneer,
  fetchInitialData,
  DeleteCore,
  CreateCore,
  UpdateVeneer,
  UpdateCore,
  DeleteVeneer,
};
