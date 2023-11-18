import axios from 'axios';
import toast from 'react-hot-toast';

// main url
const mainUrl = import.meta.env.VITE_BACKEND_URL;

// post method
export const axiosPOST = async (url, data, setLoad) => {
    setLoad(true);
    try {
        const response = await axios.post(`${mainUrl}${url}`, data);
        setLoad(false);
        return response.data;
    } catch (error) {
        setLoad(false);
        console.error(`Error in axiosPOST for ${url}:`, error);
        toast.error(`Error in axiosPOST for ${url}:`, error)
        throw error;
    }
}