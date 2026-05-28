import axios from "axios";

export const queryGtOfDevice = async (deviceNo: string) => {
  try {
    const response = await axios.post(`/vss/vehicle/queryGtOfDevice.action`, {
      deviceNo,
    });
    return response.data;
  } catch (error) {
    console.error("Error querying GT of device:", error);
    throw error;
  }
};
